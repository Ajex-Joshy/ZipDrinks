import {
  registerUser,
  loginUser,
  logoutUser,
  resendVerifyOtpService,
  resendResetPasswordOtpService,
  verifyEmailService,
  sendResetPasswordOtpService,
  verifyResetPasswordOtpService,
  resetPasswordService,
  isAuthService,
  verifyTempService,
  googleSignInService
} from "../../Services/User/authServices.js";

export const register = async (req, res) => {
    await registerUser(req, res);
}

export const login = async (req, res) => {
    await loginUser(req, res);
}

export const logout = async (req, res) => {
    await logoutUser(req, res);
}

export const resendVerifyOtp = async (req, res) => {
    await resendVerifyOtpService(req, res);
}

export const resendResetPasswordOtp = async (req, res) => {
    await resendResetPasswordOtpService(req, res);
}

export const verifyEmail = async (req, res) => {
    await verifyEmailService(req, res);
}

export const sendResetPasswordOtp = async (req, res) => {
    await sendResetPasswordOtpService(req, res);
}

export const verifyResetPasswordOtp = async (req, res) => {
    await verifyResetPasswordOtpService(req, res);
}

export const resetPassword = async (req, res) => {
    await resetPasswordService(req, res);
}

export const isAuth = async (req, res) => {
    await isAuthService(req, res);
}

export const verifyTemp = async (req, res) => {
    await verifyTempService(req, res);
}

export const googleSignIn = async (req, res) => {
    await googleSignInService(req, res);
}
