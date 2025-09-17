import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  EyeOff, 
  Zap, 
  Building2, 
  Target, 
  MapPin,
  Settings,
  Users,
  Briefcase,
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react';
import { FormConfig, FormField, ClientConfig, LocationConfig } from '../types/FormConfig';
import { loadFormConfig, saveFormConfig, exportFormConfig, importFormConfig } from '../utils/formConfigStorage';
import FormInput from './FormInput';
import BooleanInput from './BooleanInput';

type ManagementView = 'fields' | 'clients' | 'locations' | 'positions';

const FormManagement: React.FC = () => {
  const [config, setConfig] = useState<FormConfig>(loadFormConfig());
  const [currentView, setCurrentView] = useState<ManagementView>('fields');
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [editingClient, setEditingClient] = useState<ClientConfig | null>(null);
  const [editingLocation, setEditingLocation] = useState<LocationConfig | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStep, setFilterStep] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSaveConfig = (newConfig: FormConfig) => {
    setConfig(newConfig);
    saveFormConfig(newConfig);
  };

  const handleExportConfig = () => {
    const configJson = exportFormConfig();
    const blob = new Blob([configJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'swapro-form-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (importFormConfig(content)) {
          setConfig(loadFormConfig());
          alert('Configuration imported successfully!');
        } else {
          alert('Failed to import configuration. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Field Management
  const handleAddField = () => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      name: '',
      label: '',
      type: 'text',
      required: false,
      step: 0,
      order: 0,
      gridCols: 1
    };
    setEditingField(newField);
    setShowModal(true);
  };

  const handleEditField = (field: FormField) => {
    setEditingField({ ...field });
    setShowModal(true);
  };

  const handleSaveField = () => {
    if (!editingField) return;

    const newConfig = { ...config };
    const stepIndex = newConfig.steps.findIndex(step => step.id === newConfig.steps[editingField.step]?.id);
    
    if (stepIndex !== -1) {
      const existingFieldIndex = newConfig.steps[stepIndex].fields.findIndex(f => f.id === editingField.id);
      
      if (existingFieldIndex !== -1) {
        newConfig.steps[stepIndex].fields[existingFieldIndex] = editingField;
      } else {
        newConfig.steps[stepIndex].fields.push(editingField);
      }
      
      // Sort fields by order
      newConfig.steps[stepIndex].fields.sort((a, b) => a.order - b.order);
    }

    handleSaveConfig(newConfig);
    setEditingField(null);
    setShowModal(false);
  };

  const handleDeleteField = (fieldId: string) => {
    if (confirm('Are you sure you want to delete this field?')) {
      const newConfig = { ...config };
      newConfig.steps.forEach(step => {
        step.fields = step.fields.filter(field => field.id !== fieldId);
      });
      handleSaveConfig(newConfig);
    }
  };

  // Client Management
  const handleAddClient = () => {
    const newClient: ClientConfig = {
      id: `client_${Date.now()}`,
      name: '',
      positions: [],
      isActive: true
    };
    setEditingClient(newClient);
    setShowModal(true);
  };

  const handleEditClient = (client: ClientConfig) => {
    setEditingClient({ ...client });
    setShowModal(true);
  };

  const handleSaveClient = () => {
    if (!editingClient) return;

    const newConfig = { ...config };
    const existingIndex = newConfig.clients.findIndex(c => c.id === editingClient.id);
    
    if (existingIndex !== -1) {
      newConfig.clients[existingIndex] = editingClient;
    } else {
      newConfig.clients.push(editingClient);
    }

    handleSaveConfig(newConfig);
    setEditingClient(null);
    setShowModal(false);
  };

  const handleDeleteClient = (clientId: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      const newConfig = { ...config };
      newConfig.clients = newConfig.clients.filter(c => c.id !== clientId);
      handleSaveConfig(newConfig);
    }
  };

  // Get all fields for display
  const allFields = config.steps.flatMap(step => 
    step.fields.map(field => ({ ...field, stepTitle: step.title }))
  );

  const filteredFields = allFields.filter(field => {
    const matchesSearch = field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         field.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStep = filterStep === null || field.step === filterStep;
    return matchesSearch && matchesStep;
  });

  const renderFieldsView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Form Fields Management</h3>
          <p className="text-gray-600">Manage form fields, their properties, and behavior</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAddField}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            <Plus size={16} />
            Add Field
          </button>
          <button
            onClick={handleExportConfig}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
          >
            <Download size={16} />
            Export
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors cursor-pointer">
            <Upload size={16} />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImportConfig}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
        <select
          value={filterStep ?? ''}
          onChange={(e) => setFilterStep(e.target.value ? parseInt(e.target.value) : null)}
          className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400"
        >
          <option value="">All Steps</option>
          {config.steps.map((step, index) => (
            <option key={step.id} value={index}>{step.title}</option>
          ))}
        </select>
      </div>

      {/* Fields Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Step</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Properties</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFields.map((field) => (
                <tr key={field.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{field.label}</div>
                      <div className="text-sm text-gray-500">{field.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {field.stepTitle}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {field.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-1">
                      {field.required && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Required
                        </span>
                      )}
                      {field.isUrgent && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          <Zap size={12} className="mr-1" />
                          Urgent
                        </span>
                      )}
                      {field.isHidden && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <EyeOff size={12} className="mr-1" />
                          Hidden
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditField(field)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteField(field.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderClientsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Clients Management</h3>
          <p className="text-gray-600">Manage clients and their available positions</p>
        </div>
        <button
          onClick={handleAddClient}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
        >
          <Plus size={16} />
          Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {config.clients.map((client) => (
          <div key={client.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900">{client.name}</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClient(client)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteClient(client.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${client.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-sm text-gray-600">{client.isActive ? 'Active' : 'Inactive'}</span>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Positions:</strong> {client.positions.length}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {editingField ? (editingField.id.startsWith('field_') ? 'Add Field' : 'Edit Field') : 
                 editingClient ? (editingClient.id.startsWith('client_') ? 'Add Client' : 'Edit Client') : 
                 'Edit Item'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingField(null);
                  setEditingClient(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {editingField && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Field Name"
                    name="name"
                    value={editingField.name}
                    onChange={(value) => setEditingField({...editingField, name: value})}
                    required
                  />
                  <FormInput
                    label="Label"
                    name="label"
                    value={editingField.label}
                    onChange={(value) => setEditingField({...editingField, label: value})}
                    required
                  />
                  <FormInput
                    label="Type"
                    name="type"
                    type="select"
                    value={editingField.type}
                    onChange={(value) => setEditingField({...editingField, type: value as any})}
                    options={['text', 'select', 'textarea', 'date', 'tel', 'number', 'email', 'boolean']}
                    required
                  />
                  <FormInput
                    label="Step"
                    name="step"
                    type="select"
                    value={editingField.step.toString()}
                    onChange={(value) => setEditingField({...editingField, step: parseInt(value)})}
                    options={config.steps.map((_, index) => index.toString())}
                    required
                  />
                  <FormInput
                    label="Order"
                    name="order"
                    type="number"
                    value={editingField.order.toString()}
                    onChange={(value) => setEditingField({...editingField, order: parseInt(value) || 0})}
                  />
                  <FormInput
                    label="Grid Columns"
                    name="gridCols"
                    type="select"
                    value={editingField.gridCols?.toString() || '1'}
                    onChange={(value) => setEditingField({...editingField, gridCols: parseInt(value) as 1 | 2})}
                    options={['1', '2']}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <BooleanInput
                    label="Required"
                    name="required"
                    value={editingField.required}
                    onChange={(value) => setEditingField({...editingField, required: value})}
                  />
                  {/* Only show Urgent toggle for specific fields */}
                  {['client', 'posisiDilamar', 'penempatan', 'detailPenempatan'].includes(editingField.name) && (
                    <BooleanInput
                      label="Urgent"
                      name="isUrgent"
                      value={editingField.isUrgent || false}
                      onChange={(value) => setEditingField({...editingField, isUrgent: value})}
                    />
                  )}
                  <BooleanInput
                    label="Hidden"
                    name="isHidden"
                    value={editingField.isHidden || false}
                    onChange={(value) => setEditingField({...editingField, isHidden: value})}
                  />
                </div>

                {editingField.type === 'select' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Options (one per line)</label>
                    <textarea
                      value={editingField.options?.join('\n') || ''}
                      onChange={(e) => setEditingField({
                        ...editingField, 
                        options: e.target.value.split('\n').filter(opt => opt.trim())
                      })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            )}

            {editingClient && (
              <div className="space-y-4">
                <FormInput
                  label="Client Name"
                  name="name"
                  value={editingClient.name}
                  onChange={(value) => setEditingClient({...editingClient, name: value})}
                  required
                />
                <BooleanInput
                  label="Active"
                  name="isActive"
                  value={editingClient.isActive}
                  onChange={(value) => setEditingClient({...editingClient, isActive: value})}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Positions (one per line)</label>
                  <textarea
                    value={editingClient.positions.join('\n')}
                    onChange={(e) => setEditingClient({
                      ...editingClient, 
                      positions: e.target.value.split('\n').filter(pos => pos.trim())
                    })}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingField(null);
                  setEditingClient(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingField ? handleSaveField : editingClient ? handleSaveClient : undefined}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setCurrentView('fields')}
          className={`px-4 py-2 font-medium transition-colors ${
            currentView === 'fields'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Settings size={16} className="inline mr-2" />
          Fields
        </button>
        <button
          onClick={() => setCurrentView('clients')}
          className={`px-4 py-2 font-medium transition-colors ${
            currentView === 'clients'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Building2 size={16} className="inline mr-2" />
          Clients
        </button>
        <button
          onClick={() => setCurrentView('locations')}
          className={`px-4 py-2 font-medium transition-colors ${
            currentView === 'locations'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MapPin size={16} className="inline mr-2" />
          Locations
        </button>
        <button
          onClick={() => setCurrentView('positions')}
          className={`px-4 py-2 font-medium transition-colors ${
            currentView === 'positions'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Briefcase size={16} className="inline mr-2" />
          Positions
        </button>
      </div>

      {/* Content */}
      {currentView === 'fields' && renderFieldsView()}
      {currentView === 'clients' && renderClientsView()}
      {currentView === 'locations' && <div className="text-center py-12 text-gray-500">Locations management coming soon...</div>}
      {currentView === 'positions' && <div className="text-center py-12 text-gray-500">Positions management coming soon...</div>}

      {/* Modal */}
      {renderModal()}
    </div>
  );
};

export default FormManagement;