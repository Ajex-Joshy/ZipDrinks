import { getAdminDashboardService } from "../../Services/Admin/dashboardService.js"


export const getAdminDashboard = async (req, res) => {
    const { filter } = req.query
    try {

        const dashboardData = await getAdminDashboardService(filter)

        if (!dashboardData) {
            return res.status(404).json({ success: false, message: "Dashboard data not found !" })
        }

        res.status(200).json({ success: true, message: "Dashboard data fetched successfully", dashboardData })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}