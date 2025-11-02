import categoryModel from "../../models/categoryModel.js";
import productModel from "../../models/productModel.js";

export const addProductsServic = async (req, res) => {
    try {
        const {
            name, category, offer, maxRedeem, description, images,
            brand, ingredients, serve, store, life, variants, coverImage
        } = req.body;

        if (
            !name?.trim() || !category?.trim() || !description?.trim() ||
            !brand?.trim() || !ingredients?.trim() || !serve?.trim() ||
            !store?.trim() || !life?.trim() || !coverImage?.trim() ||
            !variants?.length || !images?.length
        ) {
            return res.status(400).json({ success: false, message: "Invalid Entries!" });
        }

        const existProduct = await productModel.findOne({ name });

        if (existProduct) {
            return res.status(409).json({ success: false, message: "Product already exists!" });
        }

        const categoryData = await categoryModel.findOne({ name: category });
        const categoryOffer = categoryData?.offer || null;

        const getDiscountAmount = (price, offerValue) => {
            if (!offerValue) return 0;
            if (offerValue.includes("%")) {
                const percent = parseFloat(offerValue.replace("%", "").trim());
                return (price * percent) / 100;
            } else {
                return parseFloat(offerValue.trim());
            }
        };

        let maxRedeemApplied = false;

        const updatedVariants = variants.map((v) => {
            let productDiscount = getDiscountAmount(v.price, offer);
            let categoryDiscount = getDiscountAmount(v.price, categoryOffer);

            if (maxRedeem && productDiscount > maxRedeem) {
                productDiscount = maxRedeem;
                maxRedeemApplied = true;
            }

            if (categoryData?.maxRedeem && categoryDiscount > categoryData.maxRedeem) {
                categoryDiscount = categoryData.maxRedeem;
                maxRedeemApplied = true;
            }

            const maxDiscount = Math.max(productDiscount, categoryDiscount);
            let salePrice = v.price - maxDiscount;
            if (salePrice < 0) salePrice = 0;

            return {
                ...v,
                sku: `${name.replace(/\s+/g, "")}-${v.size.replace(/\s+/g, "")}`.toUpperCase(),
                salePrice: Math.round(salePrice),
            };
        });

        let appliedOffer;
        if (maxRedeemApplied) {
            const highestMax = Math.max(maxRedeem || 0, categoryData.maxRedeem || 0);
            appliedOffer = `₹${highestMax} Flat`;
        } else {
            const firstVariant = updatedVariants[0];
            const productDisc = getDiscountAmount(firstVariant.price, offer);
            const categoryDisc = getDiscountAmount(firstVariant.price, categoryOffer);
            appliedOffer = productDisc >= categoryDisc
                ? (!offer?.includes("%") ? `₹${offer} Flat` : offer)
                : (!categoryOffer?.includes("%") ? `₹${categoryOffer} Flat` : categoryOffer);
        }

        const product = new productModel({
            name, description, category, offer, maxRedeem, images, variants: updatedVariants,
            brand, ingredients, store, serve, life, coverImage, appliedOffer
        });

        await product.save();

        res.status(201).json({ success: true, message: "Product added successfully", product });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProductsService = async (req, res) => {
    const { search = '', filter = '', sort = '', page = 1, limit } = req.query;
    const limitPerPage = Number(limit);

    try {
        const query = {};

        if (search.trim()) {
            query.name = { $regex: `^${search}`, $options: "i" };
        }

        if (filter == "listed") {
            query.isListed = true;
        } else if (filter == "unlisted") {
            query.isListed = false;
        } else if (filter && filter !== "all") {
            query.category = filter;
        }

        let sortQuery = { createdAt: -1 };
        if (sort == "lastAdded") sortQuery = { createdAt: -1 };
        else if (sort == "firstAdded") sortQuery = { createdAt: 1 };

        const skip = (parseInt(page) - 1) * limitPerPage;
        const total = await productModel.countDocuments(query);

        let products = await productModel.find(query).sort(sortQuery).skip(skip).limit(limitPerPage);

        if (!products) {
            return res.status(404).json({ success: false, message: "Something went wrong !" });
        }

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products,
            total,
            totalPages: Math.ceil(total / limitPerPage),
            currentPage: parseInt(page)
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const productListUnlistService = async (req, res) => {
    const { productId } = req.params;

    try {
        let product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "User not Found !" });
        }

        product.isListed = !product.isListed;
        await product.save();

        res.status(200).json({ success: true, message: "Updated Successfully", product });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const singleProductService = async (req, res) => {
    const { productId } = req.params;

    try {
        let product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Something wrong !" });
        }

        res.status(200).json({ success: true, message: "Product fetched successfully", product });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProductService = async (req, res) => {
    try {
        const { productId } = req.params;
        const {
            name, category, offer, maxRedeem, description, images,
            brand, ingredients, serve, store, life, variants, coverImage,
        } = req.body;

        if (
            !name?.trim() || !category?.trim() || !description?.trim() || !brand?.trim() ||
            !ingredients?.trim() || !serve?.trim() || !store?.trim() || !life?.trim() ||
            !coverImage?.trim() || !variants?.length || !images?.length
        ) {
            return res.status(400).json({ success: false, message: "Invalid Entries!" });
        }

        const categoryData = await categoryModel.findOne({ name: category });
        if (!categoryData) {
            return res.status(400).json({ success: false, message: "Invalid category selected!" });
        }

        const categoryOffer = categoryData?.offer || null;

        const calculateDiscount = (price, offer) => {
            if (!offer) return 0;
            if (offer.includes("%")) {
                const percentage = parseFloat(offer.replace("%", "").trim());
                return price * (percentage / 100);
            } else {
                return parseFloat(offer.trim());
            }
        };

        let maxRedeemApplied = false;

        const updatedVariants = variants.map((v) => {
            let productDiscount = calculateDiscount(v.price, offer);
            let categoryDiscount = calculateDiscount(v.price, categoryOffer);

            if (maxRedeem && productDiscount > maxRedeem) {
                productDiscount = maxRedeem;
                maxRedeemApplied = true;
            }

            if (categoryData?.maxRedeem && categoryDiscount > categoryData.maxRedeem) {
                categoryDiscount = categoryData.maxRedeem;
                maxRedeemApplied = true;
            }

            const maxDiscount = Math.max(productDiscount, categoryDiscount);
            let salePrice = v.price - maxDiscount;
            if (salePrice < 0) salePrice = 0;

            return {
                ...v,
                sku: `${name.replace(/\s+/g, "")}-${v.size.replace(/\s+/g, "")}`.toUpperCase(),
                salePrice: Math.round(salePrice),
            };
        });

        let appliedOffer;
        if (maxRedeemApplied) {
            const highestMax = Math.max(maxRedeem || 0, categoryData.maxRedeem || 0);
            appliedOffer = `₹${highestMax} Flat`;
        } else {
            const firstVariant = updatedVariants[0];
            const productDisc = calculateDiscount(firstVariant.price, offer);
            const categoryDisc = calculateDiscount(firstVariant.price, categoryOffer);
            appliedOffer = productDisc >= categoryDisc
                ? (!offer.includes("%") ? `₹${offer} Flat` : offer)
                : (!categoryOffer.includes("%") ? `₹${categoryOffer} Flat` : categoryOffer);
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            productId,
            {
                $set: {
                    name, category, description, offer, maxRedeem, appliedOffer,
                    images, brand, ingredients, serve, store, life, variants: updatedVariants, coverImage
                },
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
