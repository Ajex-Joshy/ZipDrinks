import { cancelOrderitemService, cancelOrderService, downloadOrderInvoiceService, getSingleOrderService, getUserOrderService, placeOrderService, returnOrderItemService, returnOrderService } from "../../Services/User/orderService.js"


export const placeOrder = async(req , res)=>{
    await placeOrderService(req , res)
}

export const getUserOrder = async(req , res)=>{
    await getUserOrderService(req , res)
}

export const getSingleOrder = async(req , res)=>{
    await getSingleOrderService(req , res)
}


export const cancelOrder = async(req , res)=>{
    await cancelOrderService(req , res)
}

export const cancelOrderitem = async(req , res)=>{
    await cancelOrderitemService(req , res)
}

export const returnOrder = async(req , res)=>{
    await returnOrderService(req , res)
}

export const returnOrderItem = async(req , res)=>{
    await returnOrderItemService(req , res)
}

export const downloadOrderInvoice = async(req , res)=>{
    await downloadOrderInvoiceService(req , res)
}