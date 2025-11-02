import React from 'react'
import { Package, CheckCircle, Truck, Clock } from 'lucide-react';


const OrderStatus = ({ order }) => {

    const statusFlow = ["pending", "processing", "out-for-delivery", "delivered"];
    const currentIndex = statusFlow.indexOf(order?.orderStatus);

    const orderStatus = [
        {
            icon: Package,
            title: "Order Placed",
            key: "pending",
            description: "Your order has been placed successfully.",
            date: order?.orderDate
                ? `${new Date(order.orderDate).toLocaleDateString()} - ${new Date(
                    order.orderDate
                ).toLocaleTimeString()}`
                : "",
        },
        {
            icon: Clock,
            title: "Processing",
            key: "processing",
            description: "Your order is being processed.",
            date: "",
        },
        {
            icon: Truck,
            title: "Out for Delivery",
            key: "out-for-delivery",
            description: "Your package is on its way.",
            date: "",
        },
        {
            icon: CheckCircle,
            title: "Delivered",
            key: "delivered",
            description: "Order successfully delivered.",
            date: order?.deliveryDate ? 
            `${new Date(order?.deliveryDate).toLocaleDateString()} - ${new Date(order?.deliveryDate).toLocaleTimeString()}` 
            : "",
        },
    ].map((step, index) => ({
        ...step,
        completed: index <= currentIndex,
        active: index === currentIndex,
    }));

    return (
        < div className="lg:col-span-1" >
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Status</h3>
                <div className="space-y-6">
                    {orderStatus.map((status, index) => (
                        <div key={index} className="relative">
                            {index !== orderStatus.length - 1 && (
                                <div className={`absolute left-5 top-12 w-0.5 h-full -ml-px ${status.completed ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                            )}
                            <div className="flex gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${status.active ? 'bg-blue-500 text-white' :
                                    status.completed ? 'bg-blue-100 text-blue-600' :
                                        'bg-gray-100 text-gray-400'
                                    }`}>
                                    <status.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 pb-8">
                                    <h4 className={`text-sm font-semibold mb-1 ${status.active || status.completed ? 'text-gray-900' : 'text-gray-400'
                                        }`}>
                                        {status.title}
                                    </h4>
                                    {status.description && (
                                        <p className="text-xs text-gray-500 mb-1">{status.description}</p>
                                    )}
                                    {status.date && (
                                        <p className="text-xs text-gray-400">{status.date}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default OrderStatus
