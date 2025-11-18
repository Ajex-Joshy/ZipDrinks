import React from 'react'
import BannerForm from '../../../Components/Admin/BannerForm'
import AdminMain from '../../../Components/Admin/AdminMain'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../../../Helper/AxiosInstance'

const AdminBannerAdd = () => {

    const navigate = useNavigate()

    const handleAddBanner = async(data)=>{
        try {
            
            let res = await axiosInstance.post('/api/admin/banner/add-banner' , {...data})

            if(res.data.success){
                toast.success("Banner added successfully")
                navigate('/admin/banner')
            }
            else{
                toast.error(res.data.message)
            }
            
        } catch (error) {
            toast.error(error?.response?.data.message)
        }
    }

    return (
        <AdminMain>
            <div className='m-8'>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mt-2">Banner</h1>
                    <div className="flex items-center text-sm text-gray-600">
                        <Link to="/admin/dashboard" className="hover:text-gray-900 cursor-pointer">Dashboard</Link>
                        <span className="mx-2">/</span>
                        <Link to="/admin/banner" className="hover:text-gray-900 cursor-pointer">Banner</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-400">Add coupons</span>
                    </div>
                </div>
                <BannerForm bannerSubmit={handleAddBanner}/>
            </div>
        </AdminMain>
    )
}

export default AdminBannerAdd
