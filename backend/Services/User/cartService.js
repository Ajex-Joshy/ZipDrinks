import cartModel from "../../models/cartModel.js"
import productModel from "../../models/productModel.js"
import wishlistModel from "../../models/wishlistModel.js"


export const addToCartService = async (req, res) => {

    const { productId, sku, userId } = req.body

    try {

        if (!userId) {
            return res.json({ success: false, message: "Not Authorized !" })
        }

        if (!productId || !sku) {
            return res.json({ success: false, message: "Something went wrong !" })
        }

        const product = await productModel.findOne({ _id: productId, isListed: true })

        if (!product) {
            return res.json({ success: false, message: "Product not found !" })
        }

        let variant = product.variants.find(variant => variant.sku === sku);

        if (!variant) {
            return res.json({ success: false, message: "Product variant does not exist !" })
        }

        if (variant.quantity <= 0) {
            return res.json({ success: false, message: "Product Stock out !" })
        }

        let cart = await cartModel.findOne({ userId });

        if (!cart) {

            cart = new cartModel({ userId, items: [{ productId, sku, quantity: 1, subTotal: variant.salePrice }], totalAmount: variant.salePrice })
            variant.quantity -= 1

        }
        else {
            const existItem = cart.items.find(item => item.sku == sku && item.productId == productId)

            if (existItem) {

                if (existItem.quantity >= 5) {
                    return res.json({ success: false, message: "Cannot add more than 5 for a single product !" })
                }

                existItem.quantity += 1
                existItem.subTotal = existItem.quantity * variant.salePrice
                variant.quantity -= 1
            }
            else {
                cart.items.push({ productId, sku, quantity: 1, subTotal: variant.salePrice })
                variant.quantity -= 1
            }

            cart.totalAmount = cart.items.reduce((sum, item) => sum + item.subTotal, 0)
        }

        await cart.save()
        await product.save()

        await wishlistModel.updateOne({ userId }, { $pull: { items: { productId } } })

        res.json({ success: true, message: "Added to cart successfully", cart })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getCartItemsService = async (req, res) => {
    const { userId } = req

    try {

        let cart = await cartModel.findOne({ userId }).populate("items.productId")

        if (!cart) {
            return res.json({ success: false, message: "Something went wrong !" })
        }

        res.json({ success: true, message: "Cart fetched successfully", cart })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export const decrementCartService = async (req, res) => {
    const { productId, sku, userId } = req.body

    try {

        const cart = await cartModel.findOne({ userId })

        const product = await productModel.findById(productId)

        if (!cart) {
            return res.json({ success: false, message: "Cart not found !" })
        }

        let item = cart?.items.find(item => item.productId == productId && item.sku == sku)

        let variant = product.variants.find(variant => variant.sku == sku)

        if (!item) {
            return res.json({ success: false, message: "Item not found !" })
        }

        item.quantity -= 1
        variant.quantity += 1

        if (item.quantity <= 0) {

            cart.items = cart.items.filter(item => !(item.productId.toString() == productId && item.sku == sku))
        }
        else {

            item.subTotal = item.quantity * variant.salePrice
        }

        cart.totalAmount = cart.items.reduce((sum, item) => sum + item.subTotal, 0)

        if (cart.items.length == 0) {
            cart.totalAmount = 0
        }

        await cart.save()
        await product.save()

        res.json({ success: true, message: cart.items.length == 0 ? "Cart is empty" : "Cart updated successfully", cart })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export const removeFromCartService = async (req, res) => {
    const { productId, sku, quantity, userId } = req.body;

    try {
        if (!userId) {
            return res.json({ success: false, message: "Not Authorized!" });
        }

        if (!productId || !sku || !quantity) {
            return res.json({ success: false, message: "Missing required fields!" });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.json({ success: false, message: "Product not found!" });
        }

        const variant = product.variants.find((v) => v.sku === sku);

        if (variant) {
            variant.quantity += quantity;
        }
        await product.save();

        const cart = await cartModel.findOneAndUpdate({ userId }, { $pull: { items: { productId, sku } } }, { new: true });

        if (!cart) {
            return res.json({ success: false, message: "Cart not found!" });
        }

        cart.totalAmount = cart.items.reduce((sum, item) => sum + item.subTotal, 0)

        await cart.save()


        res.json({ success: true, message: "Removed from cart!", cart });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const clearCartService = async (req, res) => {
    const userId = req.userId

    try {

        if (!userId) {
            return res.json({ success: false, message: "Not Authorized !" })
        }

        let cart = await cartModel.findOne({ userId })

        if (!cart) {
            return res.json({ success: false, message: "Cart not found !" })
        }

        await Promise.all(cart.items.map(async (item) => {
            const product = await productModel.findById(item.productId);
            if (!product) return;

            const variant = product.variants.find(v => v.sku === item.sku);
            if (variant) {
                variant.quantity += item.quantity;
                await product.save();
            }
        }));

        cart.items = []
        cart.totalAmount = 0
        await cart.save()

        res.json({ success: true, message: "Cart Cleared !" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}