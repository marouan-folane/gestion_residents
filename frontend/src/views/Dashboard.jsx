import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import LoadingSpinner from '../components/LoadingSpinner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import {
  Menu,
  X,
  Home,
  Building,
  Users,
  CreditCard,
  FileText,
  Settings,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Activity,
  Zap,
  Target
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [immeuble, setImmeuble] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    apartments: [],
    owners: [],
    finances: [],
    payments: [],
    maintenance: [],
    notifications: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [immeubleResponse, userResponse] = await Promise.all([
          axiosClient.get("/immeubles"),
          axiosClient.get("/user"),
        ]);

        if (immeubleResponse.data.length === 0) {
          navigate('/immeubleform');
          return;
        }

        setImmeuble(immeubleResponse.data[0]);
        setUser(userResponse.data);

        // Fetch additional dashboard data
        await fetchDashboardData();

      } catch (err) {
        console.error('Error fetching data:', err);
        if (err.response?.status === 401) {
          navigate('/auth/login');
        } else {
          setError('Erreur lors du chargement des données');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch all dashboard related data
      const [
        apartmentsRes,
        ownersRes,
        financesRes,
        paymentsRes,
        maintenanceRes,
        notificationsRes
      ] = await Promise.all([
        axiosClient.get("/apartments").catch(() => ({ data: [] })),
        axiosClient.get("/owners").catch(() => ({ data: [] })),
        axiosClient.get("/finances").catch(() => ({ data: [] })),
        axiosClient.get("/payments").catch(() => ({ data: [] })),
        axiosClient.get("/maintenance").catch(() => ({ data: [] })),
        axiosClient.get("/notifications").catch(() => ({ data: [] }))
      ]);

      setDashboardData({
        apartments: apartmentsRes.data,
        owners: ownersRes.data,
        finances: financesRes.data,
        payments: paymentsRes.data,
        maintenance: maintenanceRes.data,
        notifications: notificationsRes.data
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await axiosClient.post('/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('ACCESS_TOKEN');
      window.location.href = "/auth/login";
    }
  };

  if (loading) {
    return <LoadingSpinner message="Chargement du tableau de bord..." />;
  }


  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Sidebar menu items
  const menuItems = [
    { icon: Home, label: 'Tableau de bord', active: true, color: 'bg-blue-500' },
    { icon: Building, label: 'Appartements', count: dashboardData.apartments.length, color: 'bg-purple-500' },
    { icon: Users, label: 'Propriétaires', count: dashboardData.owners.length, color: 'bg-green-500' },
    { icon: CreditCard, label: 'Finances', count: dashboardData.payments.length, color: 'bg-yellow-500' },
    { icon: FileText, label: 'Documents', color: 'bg-indigo-500' },
    { icon: Settings, label: 'Paramètres', color: 'bg-gray-500' },
  ];

  // Calculate statistics
  const totalApartments = dashboardData.apartments.length;
  const totalOwners = dashboardData.owners.length;
  const totalRevenue = dashboardData.finances.reduce((sum, item) => sum + (item.amount || 0), 0);
  const pendingPayments = dashboardData.payments.filter(p => p.status === 'pending').length;
  const monthlyGrowth = 12.5;

  // Enhanced chart data preparation with real API data
  const revenueData = dashboardData.finances.length > 0
    ? dashboardData.finances.slice(0, 12).map((item, index) => ({
        month: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'][index] || `M${index + 1}`,
        revenue: item.amount || 0,
        expenses: item.expenses || 0,
        profit: (item.amount || 0) - (item.expenses || 0)
      }))
    : [];

  const paymentStatusData = [
    { name: 'Payé', value: dashboardData.payments.filter(p => p.status === 'paid').length, color: '#10B981' },
    { name: 'En attente', value: dashboardData.payments.filter(p => p.status === 'pending').length, color: '#F59E0B' },
    { name: 'En retard', value: dashboardData.payments.filter(p => p.status === 'overdue').length, color: '#EF4444' }
  ];

  const maintenanceData = dashboardData.maintenance.length > 0
    ? dashboardData.maintenance.slice(0, 6).map((item, index) => ({
        month: `M${index + 1}`,
        requests: item.requests || 0,
        completed: item.completed || 0
      }))
    : [];

  const performanceData = maintenanceData.length > 0
    ? maintenanceData.map((item, index) => ({
        name: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][index] || `J${index + 1}`,
        value: Math.round((item.completed / Math.max(item.requests, 1)) * 100),
        target: 90
      }))
    : [
        { name: 'Lun', value: 0, target: 90 },
        { name: 'Mar', value: 0, target: 90 },
        { name: 'Mer', value: 0, target: 90 },
        { name: 'Jeu', value: 0, target: 90 },
        { name: 'Ven', value: 0, target: 90 },
        { name: 'Sam', value: 0, target: 90 },
        { name: 'Dim', value: 0, target: 90 }
      ];

  return (
    <div className=" bg-gray-50 flex relative">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white backdrop-blur-xl bg-opacity-95 shadow-2xl transition-transform duration-300 ease-out`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Syndic Pro</h1>
              <p className="text-xs text-gray-500">Gestion moderne</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`group flex items-center px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                item.active
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
              }`}
            >
              <div className={`p-2 rounded-lg ${item.active ? 'bg-white bg-opacity-20' : 'bg-gray-100 group-hover:bg-gray-200'} transition-colors`}>
                <item.icon size={18} className={item.active ? 'text-white' : 'text-gray-600'} />
              </div>
              <span className="ml-3 font-medium">{item.label}</span>
              {item.count && (
                <span className={`ml-auto px-2 py-1 text-xs rounded-full ${
                  item.active ? 'bg-white bg-opacity-20 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {item.count}
                </span>
              )}
              {!item.active && <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-gray-600" />}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Header */}
        <header className="bg-white backdrop-blur-xl bg-opacity-95 shadow-sm border-b border-gray-100 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <Menu size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Tableau de bord</h2>
                {immeuble && (
                  <p className="text-sm text-gray-500">{immeuble.name}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} />
                {dashboardData.notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {Math.min(dashboardData.notifications.length, 9)}
                  </span>
                )}
              </button>

              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Administrateur</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{user?.name?.charAt(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content - NO PADDING */}
        <main className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Appartements',
                value: totalApartments,
                icon: Building,
                color: 'from-blue-500 to-blue-600',
                bgColor: 'bg-blue-50',
                change: '+2.5%',
                positive: true
              },
              {
                title: 'Propriétaires',
                value: totalOwners,
                icon: Users,
                color: 'from-green-500 to-green-600',
                bgColor: 'bg-green-50',
                change: '+1.2%',
                positive: true
              },
              {
                title: 'Revenus',
                value: `${(totalRevenue / 1000).toFixed(0)}k€`,
                icon: DollarSign,
                color: 'from-yellow-500 to-yellow-600',
                bgColor: 'bg-yellow-50',
                change: `+${monthlyGrowth}%`,
                positive: true
              },
              {
                title: 'En attente',
                value: pendingPayments,
                icon: AlertCircle,
                color: 'from-red-500 to-red-600',
                bgColor: 'bg-red-50',
                change: '-5.3%',
                positive: false
              }
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                  activeCard === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActiveCard(activeCard === index ? null : index)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="font-medium">{stat.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Revenus et Dépenses</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Revenus</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Dépenses</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                  <Area type="monotone" dataKey="expenses" stroke="#EF4444" fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Payment Status Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Statut des Paiements</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {paymentStatusData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Hebdomadaire</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Activité Récente</h3>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {dashboardData.notifications.slice(0, 8).map((notification, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      {notification.type === 'success' ? (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="text-green-600" size={16} />
                        </div>
                      ) : notification.type === 'warning' ? (
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <AlertCircle className="text-yellow-600" size={16} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Activity className="text-blue-600" size={16} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
