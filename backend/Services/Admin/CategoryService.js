import categoryModel from "../../models/categoryModel.js";
import productModel from "../../models/productModel.js";

export const categoryAddService = async (req, res) => {
  const { name, description, offer, maxRedeem, image } = req.body;

  try {
    if (!name.trim() || !description.trim() || !image.trim()) {
      return res.status(400).json({ success: false, message: "Missing Details !" });
    }

    let existCategory = await categoryModel.findOne({ name: { $regex: name, $options: "i" } });

    if (existCategory) {
      return res.status(409).json({ success: false, message: "Category already exist !" });
    }

    let category = new categoryModel({ name, description, offer, maxRedeem, image });
    await category.save();

    return res.status(201).json({ success: true, message: "Category added successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getCategoriesService = async (req, res) => {
  const { search = "", sort = "", page = 1, limit } = req.query;

  try {
    const query = {};

    if (search) {
      query.name = { $regex: `^${search}`, $options: "i" };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await categoryModel.countDocuments(query);
    const limitValue = parseInt(limit) || 5;

    let categories;

    if (sort == "firstAdded") {
      categories = await categoryModel.find(query).sort({ createdAt: 1 }).skip(skip).limit(limitValue);
    } else {
      categories = await categoryModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitValue);
    }

    if (!categories) {
      return res.status(404).json({ success: false, message: "Something went wrong !" });
    }

    return res.status(200).json({
      success: true,
      message: "Categories fetched Successfully",
      categories,
      total,
      totalPages: Math.ceil(total / limitValue),
      currentPage: Number(page),
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const categoryListUnlistService = async (req, res) => {
  const { categoryId } = req.params;

  try {
    let category = await categoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found !" });
    }

    if (category.isListed) {
      category.isListed = false;
      await productModel.updateMany({ category: category.name }, { $set: { isListed: false } });
    } else {
      category.isListed = true;
      await productModel.updateMany({ category: category.name }, { $set: { isListed: true } });
    }

    await category.save();

    return res.status(200).json({ success: true, message: "Updated Successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const singleCategoryService = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await categoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found !" });
    }

    return res.status(200).json({ success: true, message: "Category fetched successfully", category });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const updateCategoryService = async (req, res) => {
  const { name, description, offer, maxRedeem, image } = req.body;
  const { categoryId } = req.params;

  if (!name.trim() || !description.trim() || !image) {
    return res.status(400).json({ success: false, message: "Missing Details !" });
  }

  try {
    let category = await categoryModel.findByIdAndUpdate(
      categoryId,
      { $set: { name, description, offer, maxRedeem, image } },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found !" });
    }

    let products = await productModel.find({ category: category.name })

    for (let product of products) {

      const calculateDiscount = (price, offer) => {
        if (!offer) return 0;
        if (offer) {
          const percentage = parseFloat(offer);
          return price * (percentage / 100);
        }
      };

      let appliedOffer = '';

      const updatedVariants = product.variants.map((v, index) => {
        let productDiscount = calculateDiscount(v.price, product.offer);
        let categoryDiscount = calculateDiscount(v.price, category.offer);

        if (product.maxRedeem > 0 && productDiscount > product.maxRedeem) {
          productDiscount = product.maxRedeem;
        }

        if (category?.maxRedeem > 0 && categoryDiscount > category.maxRedeem) {
          categoryDiscount = category.maxRedeem;
        }

        const maxDiscount = Math.max(productDiscount, categoryDiscount);
        let salePrice = v.price - maxDiscount;
        if (index == 0) {
          if (product.offer && productDiscount > categoryDiscount) {
            appliedOffer = product.maxRedeem ? `${product.offer}% offer upto ${product.maxRedeem}` : `${product.offer}% offer`
          }
          else if (category.offer && categoryDiscount > productDiscount) {
            appliedOffer = category?.maxRedeem ? `${category.offer}% offer upto ${category?.maxRedeem}` : `${category.offer}% offer`
          }
        }
        if (salePrice < 0) salePrice = 0;

        return {
          size: v.size,
          quantity: v.quantity,
          price: v.price,
          sku: v.sku,
          salePrice: Math.round(salePrice)
        };
      });

      let updatedProduct = await productModel.findByIdAndUpdate(product._id,
        {
          $set: { variants: updatedVariants, appliedOffer },
        },
        { new: true }
      );

    }

    return res.status(200).json({ success: true, message: "Updated Successfully", category });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
