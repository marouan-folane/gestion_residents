import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus, Search, Filter, Calendar, Euro, Check, Clock, X } from 'lucide-react';

const Paiements = () => {
  const [paiements, setPaiements] = useState([]);
  const [locataires, setLocataires] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous');
  const [filterMonth, setFilterMonth] = useState('');
  const [formData, setFormData] = useState({
    locataireId: '',
    montant: '',
    datePaiement: '',
    typePaiement: 'loyer',
    statut: 'payé',
    notes: ''
  });

  useEffect(() => {
    const mockLocataires = [
      { id: 1, nom: 'Dubois', prenom: 'Marie', appartement: '101' },
      { id: 2, nom: 'Martin', prenom: 'Jean', appartement: '201' },
      { id: 3, nom: 'Laurent', prenom: 'Sophie', appartement: '202' },
      { id: 4, nom: 'Durand', prenom: 'Pierre', appartement: '302' }
    ];
    setLocataires(mockLocataires);

    const mockPaiements = [
      {
        id: 1,
        locataireId: 1,
        montant: 850,
        datePaiement: '2024-01-15',
        typePaiement: 'loyer',
        statut: 'payé',
        notes: 'Paiement janvier 2024',
        dateCreation: '2024-01-15'
      },
      {
        id: 2,
        locataireId: 2,
        montant: 950,
        datePaiement: '2024-01-14',
        typePaiement: 'loyer',
        statut: 'payé',
        notes: 'Paiement janvier 2024',
        dateCreation: '2024-01-14'
      },
      {
        id: 3,
        locataireId: 3,
        montant: 800,
        datePaiement: '2024-01-13',
        typePaiement: 'loyer',
        statut: 'en_attente',
        notes: 'Paiement janvier 2024',
        dateCreation: '2024-01-13'
      },
      {
        id: 4,
        locataireId: 4,
        montant: 720,
        datePaiement: '2024-01-10',
        typePaiement: 'charges',
        statut: 'payé',
        notes: 'Charges trimestrielles',
        dateCreation: '2024-01-10'
      },
      {
        id: 5,
        locataireId: 1,
        montant: 850,
        datePaiement: '2023-12-15',
        typePaiement: 'loyer',
        statut: 'payé',
        notes: 'Paiement décembre 2023',
        dateCreation: '2023-12-15'
      }
    ];
    setPaiements(mockPaiements);
  }, []);

  const getLocataireInfo = (locataireId) => {
    const locataire = locataires.find(loc => loc.id === locataireId);
    return locataire ? `${locataire.prenom} ${locataire.nom}` : 'Inconnu';
  };

  const getAppartement = (locataireId) => {
    const locataire = locataires.find(loc => loc.id === locataireId);
    return locataire ? locataire.appartement : 'N/A';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPaiement = {
      id: Date.now(),
      ...formData,
      locataireId: parseInt(formData.locataireId),
      montant: parseFloat(formData.montant),
      dateCreation: new Date().toISOString().split('T')[0]
    };
    setPaiements([newPaiement, ...paiements]);
    setShowAddModal(false);
    setFormData({
      locataireId: '',
      montant: '',
      datePaiement: '',
      typePaiement: 'loyer',
      statut: 'payé',
      notes: ''
    });
  };

  const filteredPaiements = paiements.filter(paiement => {
    const locataireInfo = getLocataireInfo(paiement.locataireId).toLowerCase();
    const appartement = getAppartement(paiement.locataireId).toLowerCase();
    const searchMatch = locataireInfo.includes(searchTerm.toLowerCase()) ||
                       appartement.includes(searchTerm.toLowerCase());

    const statusMatch = filterStatus === 'tous' || paiement.statut === filterStatus;

    const monthMatch = !filterMonth ||
                      paiement.datePaiement.substring(0, 7) === filterMonth;

    return searchMatch && statusMatch && monthMatch;
  });

  const totalPaiements = filteredPaiements.reduce((sum, p) => sum + p.montant, 0);
  const paiementsPayes = filteredPaiements.filter(p => p.statut === 'payé').length;
  const paiementsEnAttente = filteredPaiements.filter(p => p.statut === 'en_attente').length;

  const getStatusIcon = (statut) => {
    switch (statut) {
      case 'payé': return <Check className="w-4 h-4 text-green-600" />;
      case 'en_attente': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'en_retard': return <X className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusBadge = (statut) => {
    const styles = {
      'payé': 'bg-green-100 text-green-800',
      'en_attente': 'bg-yellow-100 text-yellow-800',
      'en_retard': 'bg-red-100 text-red-800'
    };

    const labels = {
      'payé': 'Payé',
      'en_attente': 'En attente',
      'en_retard': 'En retard'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[statut]}`}>
        {labels[statut]}
      </span>
    );
  };

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ×
            </button>
          </div>
          {children}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Paiements</h1>
          <p className="text-gray-600 mt-1">{filteredPaiements.length} paiements trouvés</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Paiement</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Paiements</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalPaiements.toLocaleString()}€</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Euro className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paiements Payés</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{paiementsPayes}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <Check className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Attente</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{paiementsEnAttente}</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher par locataire ou appartement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="tous">Tous les statuts</option>
              <option value="payé">Payé</option>
              <option value="en_attente">En attente</option>
              <option value="en_retard">En retard</option>
            </select>
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Liste des paiements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Historique des Paiements</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Locataire</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appartement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPaiements.map((paiement) => (
                <tr key={paiement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {getLocataireInfo(paiement.locataireId)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Apt {getAppartement(paiement.locataireId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="capitalize">{paiement.typePaiement}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {paiement.montant}€
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(paiement.datePaiement).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(paiement.statut)}
                      {getStatusBadge(paiement.statut)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {paiement.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal Ajouter Paiement */}
      <Modal
        show={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData({
            locataireId: '',
            montant: '',
            datePaiement: '',
            typePaiement: 'loyer',
            statut: 'payé',
            notes: ''
          });
        }}
        title="Nouveau Paiement"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Locataire</label>
            <select
              value={formData.locataireId}
              onChange={(e) => setFormData({ ...formData, locataireId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionner un locataire</option>
              {locataires.map((locataire) => (
                <option key={locataire.id} value={locataire.id}>
                  {locataire.prenom} {locataire.nom} - Apt {locataire.appartement}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={formData.typePaiement}
                onChange={(e) => setFormData({ ...formData, typePaiement: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="loyer">Loyer</option>
                <option value="charges">Charges</option>
                <option value="depot_garantie">Dépôt de garantie</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Montant (€)</label>
              <input
                type="number"
                step="0.01"
                value={formData.montant}
                onChange={(e) => setFormData({ ...formData, montant: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de paiement</label>
              <input
                type="date"
                value={formData.datePaiement}
                onChange={(e) => setFormData({ ...formData, datePaiement: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select
                value={formData.statut}
                onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="payé">Payé</option>
                <option value="en_attente">En attente</option>
                <option value="en_retard">En retard</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Notes optionnelles..."
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(false);
                setFormData({
                  locataireId: '',
                  montant: '',
                  datePaiement: '',
                  typePaiement: 'loyer',
                  statut: 'payé',
                  notes: ''
                });
              }}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Paiements;
