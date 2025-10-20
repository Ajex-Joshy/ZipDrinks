
import { getUserDataService } from "../../Services/User/userDataService.js";

export const getUserData = async (req, res) => {
    await getUserDataService(req, res);
}
