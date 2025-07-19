import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Edit, Trash2, Mail, Phone, User, Home } from 'lucide-react';

const Locataires = () => {
  const [locataires, setLocataires] = useState([]);
  const [appartements, setAppartements] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLocataire, setEditingLocataire] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    appartementId: '',
    dateEntree: ''
  });

  useEffect(() => {
    const mockAppartements = [
      { id: 1, numero: '101', etage: 1 },
      { id: 2, numero: '102', etage: 1 },
      { id: 3, numero: '201', etage: 2 },
      { id: 4, numero: '202', etage: 2 },
      { id: 5, numero: '301', etage: 3 },
      { id: 6, numero: '302', etage: 3 }
    ];
    setAppartements(mockAppartements);

    const mockLocataires = [
      {
        id: 1,
        nom: 'Dubois',
        prenom: 'Marie',
        email: 'marie.dubois@email.com',
        telephone: '06 12 34 56 78',
        appartementId: 1,
        dateEntree: '2023-01-15',
        statut: 'Actif'
      },
      {
        id: 2,
        nom: 'Martin',
        prenom: 'Jean',
        email: 'jean.martin@email.com',
        telephone: '06 98 76 54 32',
        appartementId: 3,
        dateEntree: '2022-06-01',
        statut: 'Actif'
      },
      {
        id: 3,
        nom: 'Laurent',
        prenom: 'Sophie',
        email: 'sophie.laurent@email.com',
        telephone: '06 11 22 33 44',
        appartementId: 4,
        dateEntree: '2023-03-10',
        statut: 'Actif'
      },
      {
        id: 4,
        nom: 'Durand',
        prenom: 'Pierre',
        email: 'pierre.durand@email.com',
        telephone: '06 55 66 77 88',
        appartementId: 6,
        dateEntree: '2023-09-01',
        statut: 'Actif'
      }
    ];
    setLocataires(mockLocataires);
  }, []);

  const getAppartementNumero = (appartementId) => {
    const appartement = appartements.find(apt => apt.id === appartementId);
    return appartement ? appartement.numero : 'N/A';
  };

  const getAvailableAppartements = () => {
    const occupiedAppartements = locataires.map(loc => loc.appartementId);
    return appartements.filter(apt =>
      !occupiedAppartements.includes(apt.id) ||
      (editingLocataire && apt.id === editingLocataire.appartementId)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingLocataire) {
      setLocataires(locataires.map(loc =>
        loc.id === editingLocataire.id
          ? { ...loc, ...formData, appartementId: parseInt(formData.appartementId) }
          : loc
      ));
      setShowEditModal(false);
      setEditingLocataire(null);
    } else {
      const newLocataire = {
        id: Date.now(),
        ...formData,
        appartementId: parseInt(formData.appartementId),
        statut: 'Actif'
      };
      setLocataires([...locataires, newLocataire]);
      setShowAddModal(false);
    }
    setFormData({ nom: '', prenom: '', email: '', telephone: '', appartementId: '', dateEntree: '' });
  };

  const handleEdit = (locataire) => {
    setEditingLocataire(locataire);
    setFormData({
      nom: locataire.nom,
      prenom: locataire.prenom,
      email: locataire.email,
      telephone: locataire.telephone,
      appartementId: locataire.appartementId.toString(),
      dateEntree: locataire.dateEntree
    });
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce locataire ?')) {
      setLocataires(locataires.filter(loc => loc.id !== id));
    }
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Locataires</h1>
          <p className="text-gray-600 mt-1">{locataires.length} locataires actifs</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter Locataire</span>
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
              <p className="text-sm font-medium text-gray-600">Total Locataires</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{locataires.length}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-gray-600">Appartements Occupés</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{locataires.length}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <Home className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-gray-600">Appartements Libres</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{appartements.length - locataires.length}</p>
            </div>
            <div className="bg-orange-500 p-3 rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Liste des locataires */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Liste des Locataires</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Locataire</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appartement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'entrée</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locataires.map((locataire) => (
                <tr key={locataire.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {locataire.prenom} {locataire.nom}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Mail className="w-3 h-3 text-gray-400 mr-1" />
                        {locataire.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-3 h-3 text-gray-400 mr-1" />
                        {locataire.telephone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Apt {getAppartementNumero(locataire.appartementId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(locataire.dateEntree).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {locataire.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(locataire)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(locataire.id)}
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
          setEditingLocataire(null);
          setFormData({ nom: '', prenom: '', email: '', telephone: '', appartementId: '', dateEntree: '' });
        }}
        title={editingLocataire ? 'Modifier Locataire' : 'Ajouter Locataire'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input
                type="text"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              type="tel"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appartement</label>
            <select
              value={formData.appartementId}
              onChange={(e) => setFormData({ ...formData, appartementId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionner un appartement</option>
              {getAvailableAppartements().map((appartement) => (
                <option key={appartement.id} value={appartement.id}>
                  Appartement {appartement.numero} - Étage {appartement.etage}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date d'entrée</label>
            <input
              type="date"
              value={formData.dateEntree}
              onChange={(e) => setFormData({ ...formData, dateEntree: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setEditingLocataire(null);
                setFormData({ nom: '', prenom: '', email: '', telephone: '', appartementId: '', dateEntree: '' });
              }}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingLocataire ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Locataires;
