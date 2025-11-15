
import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, Layers, Award, DollarSign, ShoppingCart, Users, Activity, Loader } from 'lucide-react';
import AdminMain from '../../Components/Admin/AdminMain';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axiosInstance from '../../Helper/AxiosInstance';
import { toast } from 'react-toastify';

const AdminDash = () => {

  const [query, setQuery] = useSearchParams()

  const [timeFilter, setTimeFilter] = useState(query.get('filter') || 'monthly');
  const [dashboardData, setDashboardData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setQuery({
      filter: timeFilter
    })
  }, [setQuery, timeFilter])

  useEffect(() => {
    async function getDashboard() {
      setLoading(true)
      try {
        const params = {
          filter: timeFilter
        }
        let { data } = await axiosInstance.get('/api/admin/dashboard', { params })

        if (data.success) {
          console.log(data.dashboardData)
          setDashboardData(data.dashboardData)
        }
        else {
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error?.response?.data.message)
      }
      finally {
        setLoading(false)
      }
    }
    getDashboard()
  }, [timeFilter])


  const getChartData = () => {
    if (!dashboardData.graph) return [];
    return dashboardData.graph
  };

  const statsCards = [
    { title: 'Total Revenue', value: dashboardData?.overview?.totalRevenue || 0, icon: DollarSign, color: 'bg-blue-500' },
    { title: 'Total Orders', value: dashboardData?.overview?.totalOrders || 0, icon: ShoppingCart, color: 'bg-green-500' },
    { title: 'Total Products', value: dashboardData?.overview?.totalProducts || 0, icon: Package, color: 'bg-purple-500' },
    { title: 'Total Users', value: dashboardData?.overview?.totalUsers || 0, icon: Users, color: 'bg-orange-500' }
  ];

  if (loading) {
    return (
      <AdminMain>
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin text-gray-600" size={40} />
        </div>
      </AdminMain>
    );
  }

  return (
    <AdminMain>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back !</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeFilter('daily')}
                className={`px-4 py-2 rounded-lg font-medium transition ${timeFilter === 'daily'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                Daily
              </button>
              <button
                onClick={() => setTimeFilter('weekly')}
                className={`px-4 py-2 rounded-lg font-medium transition ${timeFilter === 'weekly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeFilter('monthly')}
                className={`px-4 py-2 rounded-lg font-medium transition ${timeFilter === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimeFilter('yearly')}
                className={`px-4 py-2 rounded-lg font-medium transition ${timeFilter === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Activity size={20} className="text-blue-600" />
                Sales Overview
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Orders Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingCart size={20} className="text-green-600" />
                Orders Trend
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="orders" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Products and Top Customers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Package size={20} className="text-purple-600" />
                Top 10 Best Selling Products
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Rank</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Product Name</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Sales</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData?.topProducts?.map((p, index) => (
                      <tr key={p._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-600' :
                            index === 1 ? 'bg-gray-100 text-gray-600' :
                              index === 2 ? 'bg-orange-100 text-orange-600' :
                                'bg-blue-50 text-blue-600'
                            }`}>
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-medium text-gray-800">{p?.product?.name}</td>
                        <td className="py-4 px-4 text-gray-700">{p?.totalSale?.toLocaleString()}</td>
                        <td className="py-4 px-4 text-gray-700">₹{p?.totalRevenue?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Customers */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Users size={20} className="text-green-600" />
                Top 10 Customers
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Rank</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Customer Name</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Total Orders</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Total Spend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData?.topCustomers?.map((customer, index) => (
                      <tr key={customer._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-600' :
                            index === 1 ? 'bg-gray-100 text-gray-600' :
                              index === 2 ? 'bg-orange-100 text-orange-600' :
                                'bg-green-50 text-green-600'
                            }`}>
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-800">{customer?.user?.fullname}</p>
                            <p className="text-sm text-gray-500">{customer?.user?.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{customer?.totalOrders}</td>
                        <td className="py-4 px-4 text-gray-700">₹{customer?.totalSpend.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Top Categories and Brands */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Categories */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Layers size={20} className="text-pink-600" />
                Top Categories
              </h2>
              <div className="space-y-4">
                {dashboardData?.topCategories?.map((category, index) => (
                  <div key={category._id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-gray-800">#{index + 1}</span>
                        <span className="font-medium text-gray-800">{category?._id}</span>
                      </div>
                      <span className="text-gray-600 font-medium">₹{category?.totalRevenue?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ width: `${category?.totalSale <= 100 ? category?.totalSale : 100}%`, backgroundColor: "green" }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 font-medium w-12">{category?.totalSale}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Brands */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Award size={20} className="text-orange-600" />
                Top 10 Brands
              </h2>
              <div className="space-y-4">
                {dashboardData?.topBrands?.map((brand, index) => (
                  <div key={brand._id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${index < 3 ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gray-400'
                        }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{brand._id}</h3>
                        <p className="text-sm text-gray-600">{brand.totalSale.toLocaleString()} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">₹{brand.totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminMain>
  );
};

export default AdminDash;