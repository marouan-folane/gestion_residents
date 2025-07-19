import React, { useState, useEffect } from 'react';
import { Users, Euro, Receipt, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import axiosC from '../axios-client';
import { motion } from 'framer-motion';
import { useStateContext } from '../contexts/ContextProvider';

const Dashboard = () => {
  const [syndicatData, setSyndicatData] = useState(null);
  const navigate=useNavigate();
      const {token}=useStateContext();

  useEffect(() => {
    const fetchImmeubles = async () => {
      try {
        const response = await axiosC.get('/immeubles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const immeubles = response.data;

        if (!immeubles || immeubles.length === 0) {
          navigate('/immeubleform');
          setSyndicatData(immeubles[0]);         }
      } catch (error) {
        console.error('Erreur lors du chargement des immeubles :', error);
        navigate('/immeubleform');
      }
    };

    fetchImmeubles();
  }, [navigate, token]);

  const stats = [
    { name: 'Locataires', value: '24', icon: Users, color: 'bg-blue-500', change: '+2' },
    { name: 'Paiements ce mois', value: '18,450€', icon: Euro, color: 'bg-green-500', change: '+5.2%' },
    { name: 'Charges totales', value: '3,200€', icon: Receipt, color: 'bg-orange-500', change: '-2.1%' },
    { name: 'Plaintes', value: '3', icon: AlertTriangle, color: 'bg-red-500', change: '-1' },
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

  const paymentsData = [
    { month: 'Jan', montant: 16800 },
    { month: 'Fév', montant: 17200 },
    { month: 'Mar', montant: 18100 },
    { month: 'Avr', montant: 17800 },
    { month: 'Mai', montant: 18450 },
    { month: 'Jun', montant: 19200 },
  ];

  const chargesData = [
    { month: 'Jan', montant: 2800 },
    { month: 'Fév', montant: 3100 },
    { month: 'Mar', montant: 2900 },
    { month: 'Avr', montant: 3300 },
    { month: 'Mai', montant: 3200 },
    { month: 'Jun', montant: 2950 },
  ];

  const recentPayments = [
    { id: 1, locataire: 'Marie Dubois', appartement: 'Apt 12', montant: '850€', date: '2024-01-15', statut: 'Payé' },
    { id: 2, locataire: 'Jean Martin', appartement: 'Apt 8', montant: '920€', date: '2024-01-14', statut: 'Payé' },
    { id: 3, locataire: 'Sophie Laurent', appartement: 'Apt 5', montant: '780€', date: '2024-01-13', statut: 'En attente' },
  ];

  const recentCharges = [
    { id: 1, type: 'Électricité', montant: '450€', date: '2024-01-10', fournisseur: 'EDF' },
    { id: 2, type: 'Eau', montant: '320€', date: '2024-01-08', fournisseur: 'Veolia' },
    { id: 3, type: 'Ménage', montant: '180€', date: '2024-01-05', fournisseur: 'CleanPro' },
  ];

  const interventions = [
    { id: 1, type: 'Plomberie', appartement: 'Apt 15', date: '2024-01-12', statut: 'Terminé' },
    { id: 2, type: 'Ascenseur', appartement: 'Hall', date: '2024-01-10', statut: 'En cours' },
    { id: 3, type: 'Chauffage', appartement: 'Apt 3', date: '2024-01-08', statut: 'Planifié' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Bienvenue, {syndicatData?.nom || 'Syndicat'} - {syndicatData?.immeuble || 'Votre immeuble'}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2 sm:mt-0">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <button className='bg-green-700 text-white py-3 px-6 rounded rounded-circle'>
            <Link to={"/paiments"}> Your  paiment</Link>
        </button>
        <button className='bg-red-700 text-white py-3 px-6 rounded rounded-circle'>
            <Link to={"/Locataires"}> Locataires</Link>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">{stat.change}</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Paiements par mois</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={paymentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}€`, 'Montant']} />
              <Line type="monotone" dataKey="montant" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Charges par mois</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chargesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}€`, 'Montant']} />
              <Bar dataKey="montant" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Payments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Paiements récents</h3>
          <div className="space-y-3">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{payment.locataire}</p>
                  <p className="text-sm text-gray-600">{payment.appartement}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{payment.montant}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    payment.statut === 'Payé' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payment.statut}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Charges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Charges récentes</h3>
          <div className="space-y-3">
            {recentCharges.map((charge) => (
              <div key={charge.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{charge.type}</p>
                  <p className="text-sm text-gray-600">{charge.fournisseur}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{charge.montant}</p>
                  <p className="text-sm text-gray-600">{charge.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Interventions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interventions récentes</h3>
          <div className="space-y-3">
            {interventions.map((intervention) => (
              <div key={intervention.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{intervention.type}</p>
                  <p className="text-sm text-gray-600">{intervention.appartement}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    intervention.statut === 'Terminé' ? 'bg-green-100 text-green-800' :
                    intervention.statut === 'En cours' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {intervention.statut}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{intervention.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
