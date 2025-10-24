
import { changePasswordService, deleteAddressService, editAddressService, editUserDataService, getOneAddressService, getUserAddressService, getUserDataService, resendEditEmailOtpService, userAddressAddService, verifyEditEmialOtpService } from "../../Services/User/userDataService.js";

export const getUserData = async (req, res) => {
    await getUserDataService(req, res);
}

export const editUserData = async (req , res)=>{
    await editUserDataService(req ,res)
}

export const verifyEditEmialOtp = async (req , res)=>{
    await verifyEditEmialOtpService(req ,res)
}

export const resendEditEmailOtp = async (req ,res)=>{
    await resendEditEmailOtpService(req , res)
}

export const changePassword = async(req , res)=>{
    await changePasswordService(req , res)
}

export const getUserAddress = async(req , res)=>{
    await getUserAddressService(req ,res)
}

export const userAddressAdd = async(req , res)=>{
    await userAddressAddService(req , res)
}

export const getOneAddress = async(req , res)=>{
    await getOneAddressService(req , res)
}

export const editAddress = async(req , res)=>{
    await editAddressService(req , res)
}

export const deleteAddress = async(req , res)=>{
    await deleteAddressService(req , res)
}