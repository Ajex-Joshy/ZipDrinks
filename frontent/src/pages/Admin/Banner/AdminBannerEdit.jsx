import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../../../Helper/AxiosInstance'
import AdminMain from '../../../Components/Admin/AdminMain'
import BannerForm from '../../../Components/Admin/BannerForm'

const AdminBannerEdit = () => {
    
    const { bannerId } = useParams()
    const navigate = useNavigate()

    const [banner , setBanner] = useState({})

    useEffect(()=>{
        async function getBanner(){
            try {

                const { data } = await axiosInstance.get(`/api/admin/banner/${bannerId}`)

                if(data.success){
                    setBanner(data.banner)
                }
                else{
                    toast.error(data.message)
                }
                
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }
        getBanner()
    },[])

    const editBannerSubmit = async(data)=>{
        try {
            
            const res = await axiosInstance.put(`/api/admin/banner/${bannerId}/edit` , {...data})

            if(res.data.success){
                toast.success("Updated successfully")
                navigate('/admin/banner')
            }
            else{
                toast.error(res.data.message)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <AdminMain>
        <div>
            <div className="mb-6 m-8">
                <h1 className="text-2xl font-semibold text-gray-900 mt-2">Banners</h1>
                <div className="flex items-center text-sm text-gray-600">
                    <span className="hover:text-gray-900 cursor-pointer">Dashboard</span>
                    <span className="mx-2">&gt;</span>
                    <span className="text-gray-400">Banner</span>
                    <span className="mx-2">&gt;</span>
                    <span className="text-gray-400">Edit Banner</span>
                </div>
                <BannerForm bannerSubmit={editBannerSubmit} banner={banner}/>
            </div>
        </div>
        </AdminMain>
    )
}

export default AdminBannerEdit
