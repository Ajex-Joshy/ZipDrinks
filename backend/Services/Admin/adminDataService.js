import userModel from "../../models/userModel.js";

export const getAdminDataService = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true, userData: {
                fullname: user.fullname, email: user.email, isAdmin: user.isAdmin,
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}