import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginFail, loginStart, loginSuccess } from '../../Store/user/UserSlice';
import { useDispatch } from 'react-redux';
import Otp from '../../Components/Otp';
import axiosInstance from '../../Helper/AxiosInstance';

const VerifyEditEmail = () => {

    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const email = localStorage.getItem("new-email")
    const dispatch = useDispatch()


    async function verifyOtp(otp) {
        try {
            dispatch(loginStart())
            let fullOtp = otp.join("")

            const { data } = await axiosInstance.post(backendUrl + '/api/user/edit/verify', { otp: fullOtp });

            if (data.success) {
                dispatch(loginSuccess(data.userData))
                localStorage.removeItem('new-email')
                toast.success("Edited Successfully")
                navigate("/profile")
            } else {
                toast.error(data.message)
                dispatch(loginFail())
            }

        } catch (error) {
            dispatch(loginFail())
            toast.error(error.response.data.message)
        }
    }

    async function resendOtp() {
        try {
            let { data } = await axiosInstance.post(backendUrl + '/api/user/edit/resend-otp', {}, { headers: { 'Content-Type': 'application/json' } });
            if (data.success) {
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div>
            <Otp verifyOtp={verifyOtp} resendOtp={resendOtp} email={email} />
        </div>
    )
}

export default VerifyEditEmail
