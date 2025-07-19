import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Receipt, Plus, Edit, Trash2, Search, Filter, Calendar, Euro, TrendingUp, TrendingDown } from 'lucide-react';

const Charges = () => {
  const [charges, setCharges] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCharge, setEditingCharge] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('tous');
  const [filterMonth, setFilterMonth] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    montant: '',
    dateFacture: '',
    fournisseur: '',
    statut: 'en_attente',
    notes: ''
  });

  useEffect(() => {
    const mockCharges = [
      {
        id: 1,
        type: 'Électricité',
        description: 'Facture électricité parties communes',
        montant: 450,
        dateFacture: '2024-01-15',
        fournisseur: 'EDF',
        statut: 'payé',
        notes: 'Facture mensuelle',
        dateCreation: '2024-01-15'
      },
      {
        id: 2,
        type: 'Eau',
        description: 'Consommation eau immeuble',
        montant: 320,
        dateFacture: '2024-01-10',
        fournisseur: 'Veolia',
        statut: 'payé',
        notes: 'Relevé trimestriel',
        dateCreation: '2024-01-10'
      },
      {
        id: 3,
        type: 'Ménage',
        description: 'Nettoyage parties communes',
        montant: 180,
        dateFacture: '2024-01-08',
        fournisseur: 'CleanPro',
        statut: 'payé',
        notes: 'Service hebdomadaire',
        dateCreation: '2024-01-08'
      },
      {
        id: 4,
        type: 'Ascenseur',
        description: 'Maintenance ascenseur',
        montant: 250,
        dateFacture: '2024-01-05',
        fournisseur: 'Otis',
        statut: 'en_attente',
        notes: 'Contrat annuel',
        dateCreation: '2024-01-05'
      },
      {
        id: 5,
        type: 'Chauffage',
        description: 'Entretien chaudière',
        montant: 380,
        dateFacture: '2023-12-20',
        fournisseur: 'Thermique Plus',
        statut: 'payé',
        notes: 'Révision annuelle',
        dateCreation: '2023-12-20'
      },
      {
        id: 6,
        type: 'Assurance',
        description: 'Assurance immeuble',
        montant: 1200,
        dateFacture: '2023-12-01',
        fournisseur: 'AXA',
        statut: 'payé',
        notes: 'Prime annuelle',
        dateCreation: '2023-12-01'
      }
    ];
    setCharges(mockCharges);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCharge) {
      setCharges(charges.map(charge =>
        charge.id === editingCharge.id
          ? { ...charge, ...formData, montant: parseFloat(formData.montant) }
          : charge
      ));
      setShowEditModal(false);
      setEditingCharge(null);
    } else {
      const newCharge = {
        id: Date.now(),
        ...formData,
        montant: parseFloat(formData.montant),
        dateCreation: new Date().toISOString().split('T')[0]
      };
      setCharges([newCharge, ...charges]);
      setShowAddModal(false);
    }
    setFormData({
      type: '',
      description: '',
      montant: '',
      dateFacture: '',
      fournisseur: '',
      statut: 'en_attente',
      notes: ''
    });
  };

  const handleEdit = (charge) => {
    setEditingCharge(charge);
    setFormData({
      type: charge.type,
      description: charge.description,
      montant: charge.montant.toString(),
      dateFacture: charge.dateFacture,
      fournisseur: charge.fournisseur,
      statut: charge.statut,
      notes: charge.notes
    });
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette charge ?')) {
      setCharges(charges.filter(charge => charge.id !== id));
    }
  };

  const filteredCharges = charges.filter(charge => {
    const searchMatch = charge.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       charge.fournisseur.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       charge.description.toLowerCase().includes(searchTerm.toLowerCase());

    const typeMatch = filterType === 'tous' || charge.type === filterType;

    const monthMatch = !filterMonth ||
                      charge.dateFacture.substring(0, 7) === filterMonth;

    return searchMatch && typeMatch && monthMatch;
  });

  const totalCharges = filteredCharges.reduce((sum, c) => sum + c.montant, 0);
  const chargesPayees = filteredCharges.filter(c => c.statut === 'payé').length;
  const chargesEnAttente = filteredCharges.filter(c => c.statut === 'en_attente').length;

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

  const typeOptions = [
    'Électricité', 'Eau', 'Gaz', 'Ménage', 'Ascenseur', 'Chauffage',
    'Assurance', 'Jardinage', 'Sécurité', 'Réparations', 'Autre'
  ];

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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Charges</h1>
          <p className="text-gray-600 mt-1">{filteredCharges.length} charges trouvées</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Charge</span>
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
              <p className="text-sm font-medium text-gray-600">Total Charges</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalCharges.toLocaleString()}€</p>
            </div>
            <div className="bg-orange-500 p-3 rounded-lg">
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
              <p className="text-sm font-medium text-gray-600">Charges Payées</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{chargesPayees}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
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
              <p className="text-2xl font-bold text-gray-900 mt-1">{chargesEnAttente}</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-white" />
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
              placeholder="Rechercher par type, fournisseur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="tous">Tous les types</option>
              {typeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
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

      {/* Liste des charges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Historique des Charges</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fournisseur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCharges.map((charge) => (
                <tr key={charge.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-orange-100 p-2 rounded-full mr-3">
                        <Receipt className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {charge.type}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {charge.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {charge.fournisseur}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {charge.montant}€
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(charge.dateFacture).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(charge.statut)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(charge)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(charge.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal Ajouter/Modifier */}
      <Modal
        show={showAddModal || showEditModal}
        onClose={() => {
          setShowAddModal(false);
          setShowEditModal(false);
          setEditingCharge(null);
          setFormData({
            type: '',
            description: '',
            montant: '',
            dateFacture: '',
            fournisseur: '',
            statut: 'en_attente',
            notes: ''
          });
        }}
        title={editingCharge ? 'Modifier Charge' : 'Nouvelle Charge'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Sélectionner un type</option>
                {typeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fournisseur</label>
              <input
                type="text"
                value={formData.fournisseur}
                onChange={(e) => setFormData({ ...formData, fournisseur: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date facture</label>
              <input
                type="date"
                value={formData.dateFacture}
                onChange={(e) => setFormData({ ...formData, dateFacture: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select
              value={formData.statut}
              onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en_attente">En attente</option>
              <option value="payé">Payé</option>
              <option value="en_retard">En retard</option>
            </select>
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
                setShowEditModal(false);
                setEditingCharge(null);
                setFormData({
                  type: '',
                  description: '',
                  montant: '',
                  dateFacture: '',
                  fournisseur: '',
                  statut: 'en_attente',
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
              {editingCharge ? 'Modifier' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Charges;
