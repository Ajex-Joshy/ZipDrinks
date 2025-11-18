import orderModel from "../../models/orderModel.js"
import productModel from "../../models/productModel.js"
import userModel from "../../models/userModel.js"


export const getAdminDashboardService = async (filter) => {
    try {

        let orders = await orderModel.aggregate([{ $group: { _id: null, totalOrders: { $sum: 1 }, totalRevenue: { $sum: "$totalAmount" } } },
        { $project: { totalOrders: 1, totalRevenue: 1, _id: 0 } }
        ])

        let products = await productModel.aggregate([{ $group: { _id: null, totalProducts: { $sum: 1 } } }, { $project: { totalProducts: 1, _id: 0 } }])

        let users = await userModel.aggregate([{ $group: { _id: null, totalUsers: { $sum: 1 } } }, { $project: { totalUsers: 1, _id: 0 } }])

        let topProducts = await orderModel.aggregate([{ $unwind: "$items" },
        { $group: { _id: "$items.productId", totalSale: { $sum: "$items.quantity" }, totalRevenue: { $sum: "$items.subTotal" } } },
        { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
        { $unwind: "$product" },
        { $sort: { totalSale: -1 } },
        { $limit: 10 }
        ])

        let topCustomers = await orderModel.aggregate([{ $group: { _id: "$userId", totalOrders: { $sum: 1 }, totalSpend: { $sum: "$totalAmount" } } },
        { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
        { $unwind: "$user" },
        { $sort: { totalOrders: -1 } },
        { $limit: 10 }
        ])

        let topCategories = await orderModel.aggregate([{ $unwind: "$items" },
        { $group: { _id: "$items.category", totalSale: { $sum: "$items.quantity" }, totalRevenue: { $sum: "$items.subTotal" } } },
        { $sort: { totalSale: -1 } },
        { $limit: 10 }
        ])


        let topBrands = await orderModel.aggregate([{ $unwind: "$items" },
        { $lookup: { from: "products", localField: "items.productId", foreignField: "_id", as: "product" } },
        { $unwind: "$product" },
        { $group: { _id: "$product.brand", totalSale: { $sum: "$items.quantity" }, totalRevenue: { $sum: "$items.subTotal" } } },
        { $sort: { totalSale: -1 } },
        { $limit: 10 }
        ])

        let matchStage = {};
        let groupStage = {};
        let formatter = null;

        const now = new Date();

        // ---------- DAILY (last 7 days) ----------
        if (filter === "daily") {
            const last7 = new Date();
            last7.setDate(now.getDate() - 6);
            last7.setHours(0, 0, 0, 0);

            const end = new Date();
            end.setHours(23, 59, 59, 999);

            matchStage = { createdAt: { $gte: last7, $lte: end } };

            groupStage = {
                _id: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    day: { $dayOfWeek: "$createdAt" }
                }
            };

            formatter = (item) => {
                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                return days[item._id.day - 1];
            };
        }

        // ---------- WEEKLY (last 4 weeks) ----------
        else if (filter === "weekly") {
            const last28 = new Date();
            last28.setDate(now.getDate() - 28);

            matchStage = { createdAt: { $gte: last28, $lte: now } };
            groupStage = {
                _id: { week: { $isoWeek: "$createdAt" } }
            };

            formatter = (item, index) => `Week ${index + 1}`;
        }

        // ---------- MONTHLY (last 12 months) ----------
        else if (filter === "monthly") {
            const lastYear = new Date();
            lastYear.setFullYear(now.getFullYear() - 1);

            matchStage = { createdAt: { $gte: lastYear, $lte: now } };

            groupStage = {
                _id: {
                    month: { $month: "$createdAt" }
                }
            };

            formatter = (item) => {
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                return months[item._id.month - 1];
            };
        }

        // ---------- YEARLY (last 5 years) ----------
        else if (filter === "yearly") {
            const last5 = new Date();
            last5.setFullYear(now.getFullYear() - 5);

            matchStage = { createdAt: { $gte: last5, $lte: now } };

            groupStage = {
                _id: { year: { $year: "$createdAt" } }
            };

            formatter = (item) => `${item._id.year}`;
        }

        // Fetch actual data from MongoDB
        let graph = await orderModel.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: groupStage._id,
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: "$totalAmount" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // ----------- BUILD FULL TIME SERIES -----------
        let fullGraph = [];

        // DAILY (last 7 days)
        if (filter === "daily") {
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const today = new Date();

            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(today.getDate() - i);

                fullGraph.push({
                    key: d.toISOString().split("T")[0],
                    name: days[d.getDay()],
                    orders: 0,
                    revenue: 0
                });
            }

            graph.forEach(item => {
                fullGraph = fullGraph.map(day =>
                    day.key === item._id.date
                        ? { ...day, orders: item.totalOrders, revenue: item.totalRevenue }
                        : day
                );
            });
        }

        // WEEKLY (last 4 weeks)
        else if (filter === "weekly") {
            fullGraph = Array.from({ length: 4 }).map((_, i) => ({
                name: `Week ${i + 1}`,
                orders: 0,
                revenue: 0
            }));

            graph.forEach((item, index) => {
                if (fullGraph[index]) {
                    fullGraph[index].orders = item.totalOrders;
                    fullGraph[index].revenue = item.totalRevenue;
                }
            });
        }

        // MONTHLY (12 months)
        else if (filter === "monthly") {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            fullGraph = months.map((m, i) => ({
                name: m,
                month: i + 1,
                orders: 0,
                revenue: 0
            }));

            graph.forEach(item => {
                fullGraph[item._id.month - 1].orders = item.totalOrders;
                fullGraph[item._id.month - 1].revenue = item.totalRevenue;
            });
        }

        // YEARLY (5 years)
        else if (filter === "yearly") {
            const currentYear = now.getFullYear();
            fullGraph = Array.from({ length: 5 }).map((_, i) => ({
                name: `${currentYear - 4 + i}`,
                year: currentYear - 4 + i,
                orders: 0,
                revenue: 0
            }));

            graph.forEach(item => {
                const idx = fullGraph.findIndex(f => f.year == item._id.year);
                if (idx !== -1) {
                    fullGraph[idx].orders = item.totalOrders;
                    fullGraph[idx].revenue = item.totalRevenue;
                }
            });
        }

        // FINAL OUTPUT
        graph = fullGraph;


        const dashboard = {
            overview: {
                totalOrders: orders[0]?.totalOrders || 0,
                totalRevenue: orders[0]?.totalRevenue || 0,
                totalProducts: products[0]?.totalProducts || 0,
                totalUsers: users[0]?.totalUsers || 0,
            },
            topProducts,
            topCustomers,
            topCategories,
            topBrands,
            graph
        };


        return dashboard

    } catch (error) {
        return false
    }
}