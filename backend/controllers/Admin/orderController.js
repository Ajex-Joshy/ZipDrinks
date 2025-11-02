import { approveOrderItemReturnService, approveOrderReturnService, changeOrderStatusService, getOrdersService, getSingleOrderService } from "../../Services/Admin/orderService.js"


export const getOrders = async(req , res)=>{
    await getOrdersService(req , res)
}

export const getSingleOrder = async(req , res)=>{
    await getSingleOrderService(req , res)   
}

export const changeOrderStatus = async(req , res)=>{
    await changeOrderStatusService(req , res)
}

export const approveOrderReturn = async(req , res)=>{
    await approveOrderReturnService(req , res)
}

export const approveOrderItemReturn = async(req , res)=>{
    await approveOrderItemReturnService(req , res)   
}