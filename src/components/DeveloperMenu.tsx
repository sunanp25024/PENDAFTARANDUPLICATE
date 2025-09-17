import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Edit3, 
  Trash2, 
  Play, 
  Save, 
  Settings, 
  Database,
  Zap,
  Star,
  Eye,
  EyeOff,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  User
} from 'lucide-react';
import { DevEntry, DevSettings, FormData } from '../types/DevEntry';
import { 
  loadDevEntries, 
  saveDevEntries, 
  createDevEntry, 
  updateDevEntry, 
  deleteDevEntry,
  loadDevSettings,
  saveDevSettings,
  generateSampleEntries,
  sampleDataTemplates
} from '../utils/devStorage';
import FormInput from './FormInput';
import BooleanInput from './BooleanInput';

interface DeveloperMenuProps {
  onLoadToMainForm: (formData: FormData, hiddenFields: string[], isUrgent: boolean) => void;
  onBackToApp: () => void;
  currentFormData: FormData;
}

type ViewMode = 'list' | 'edit' | 'settings';

const DeveloperMenu: React.FC<DeveloperMenuProps> = ({ 
  onLoadToMainForm, 
  onBackToApp, 
  currentFormData 
}) => {
  const [entries, setEntries] = useState<DevEntry[]>([]);
  const [settings, setSettings] = useState<DevSettings>(loadDevSettings());
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingEntry, setEditingEntry] = useState<DevEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setEntries(loadDevEntries());
  }, []);

  const handleSaveEntries = (newEntries: DevEntry[]) => {
    setEntries(newEntries);
    saveDevEntries(newEntries);
  };

  const handleSaveSettings = (newSettings: DevSettings) => {
    setSettings(newSettings);
    saveDevSettings(newSettings);
  };

  const handleCreateEntry = () => {
    const newEntry = createDevEntry(
      `New Entry ${entries.length + 1}`,
      currentFormData
    );
    const newEntries = [...entries, newEntry];
    handleSaveEntries(newEntries);
    setEditingEntry(newEntry);
    setViewMode('edit');
  };

  const handleEditEntry = (entry: DevEntry) => {
    setEditingEntry(entry);
    setViewMode('edit');
  };

  const handleSaveEntry = (updatedEntry: DevEntry) => {
    const newEntries = updateDevEntry(entries, updatedEntry.id, updatedEntry);
    handleSaveEntries(newEntries);
    setViewMode('list');
    setEditingEntry(null);
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      const newEntries = deleteDevEntry(entries, id);
      handleSaveEntries(newEntries);
    }
  };

  const handleLoadEntry = (entry: DevEntry) => {
    onLoadToMainForm(entry.formData, entry.metadata.hiddenFields, entry.metadata.isUrgent);
  };

  const handleGenerateSamples = () => {
    const sampleEntries = generateSampleEntries();
    const newEntries = [...entries, ...sampleEntries];
    handleSaveEntries(newEntries);
  };

  const filteredEntries = entries.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.formData.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.formData.posisiDilamar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderListView = () => (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCreateEntry}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            <Plus size={16} />
            New Entry
          </button>
          <button
            onClick={handleGenerateSamples}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all"
          >
            <Database size={16} />
            Generate Samples
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{entries.length}</div>
              <div className="text-sm text-gray-600">Total Entries</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Zap size={20} className="text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {entries.filter(e => e.metadata.isUrgent).length}
              </div>
              <div className="text-sm text-gray-600">Urgent</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star size={20} className="text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {entries.filter(e => e.metadata.isRecommended).length}
              </div>
              <div className="text-sm text-gray-600">Recommended</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <EyeOff size={20} className="text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {entries.filter(e => e.metadata.hiddenFields.length > 0).length}
              </div>
              <div className="text-sm text-gray-600">With Hidden Fields</div>
            </div>
          </div>
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <Database size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Entries Found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'No entries match your search.' : 'Create your first entry to get started.'}
            </p>
            {!searchTerm && (
              <button
                onClick={handleCreateEntry}
                className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Create First Entry
              </button>
            )}
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{entry.name}</h3>
                    <div className="flex gap-1">
                      {entry.metadata.isUrgent && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1">
                          <Zap size={12} />
                          Urgent
                        </span>
                      )}
                      {entry.metadata.isRecommended && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full flex items-center gap-1">
                          <Star size={12} />
                          Recommended
                        </span>
                      )}
                      {entry.metadata.hiddenFields.length > 0 && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full flex items-center gap-1">
                          <EyeOff size={12} />
                          {entry.metadata.hiddenFields.length} Hidden
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div><strong>Name:</strong> {entry.formData.namaLengkap || 'Not set'}</div>
                    <div><strong>Position:</strong> {entry.formData.posisiDilamar || 'Not set'}</div>
                    <div><strong>Placement:</strong> {entry.formData.penempatan || 'Not set'}</div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        Created: {new Date(entry.metadata.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <RefreshCw size={12} />
                        Modified: {new Date(entry.metadata.lastModified).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditEntry(entry)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Edit Entry"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleLoadEntry(entry)}
                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                    title="Load to Main Form"
                  >
                    <Play size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    title="Delete Entry"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderEditView = () => {
    if (!editingEntry) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Edit Entry</h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setViewMode('list');
                setEditingEntry(null);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSaveEntry(editingEntry)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              <Save size={16} />
              Save Entry
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Entry Metadata */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Entry Settings</h3>
            <div className="space-y-4">
              <FormInput
                label="Entry Name"
                name="entryName"
                value={editingEntry.name}
                onChange={(value) => setEditingEntry({...editingEntry, name: value})}
                required
                icon={User}
              />
              
              <BooleanInput
                label="Mark as Urgent"
                name="isUrgent"
                value={editingEntry.metadata.isUrgent}
                onChange={(value) => setEditingEntry({
                  ...editingEntry,
                  metadata: {...editingEntry.metadata, isUrgent: value}
                })}
                icon={Zap}
              />
              
              <BooleanInput
                label="Mark as Recommended"
                name="isRecommended"
                value={editingEntry.metadata.isRecommended}
                onChange={(value) => setEditingEntry({
                  ...editingEntry,
                  metadata: {...editingEntry.metadata, isRecommended: value}
                })}
                icon={Star}
              />
            </div>
          </div>

          {/* Form Data Editor */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Form Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {/* Key fields for editing */}
              <FormInput
                label="Nama Lengkap"
                name="namaLengkap"
                value={editingEntry.formData.namaLengkap}
                onChange={(value) => setEditingEntry({
                  ...editingEntry,
                  formData: {...editingEntry.formData, namaLengkap: value}
                })}
                icon={User}
              />
              
              <FormInput
                label="NIK"
                name="nik"
                value={editingEntry.formData.nik}
                onChange={(value) => setEditingEntry({
                  ...editingEntry,
                  formData: {...editingEntry.formData, nik: value}
                })}
                maxLength={16}
                icon={User}
              />
              
              <FormInput
                label="Posisi Dilamar"
                name="posisiDilamar"
                type="select"
                value={editingEntry.formData.posisiDilamar}
                onChange={(value) => setEditingEntry({
                  ...editingEntry,
                  formData: {...editingEntry.formData, posisiDilamar: value}
                })}
                options={[
                  'Sales Officer - CMO',
                  'Collection Remedial Officer',
                  'Relationship Officer (RO)',
                  'CUSTOMER SERVICE STAFF',
                  'DATA ADMIN STAFF'
                ]}
              />
              
              <FormInput
                label="No HP"
                name="noHp"
                type="tel"
                value={editingEntry.formData.noHp}
                onChange={(value) => setEditingEntry({
                  ...editingEntry,
                  formData: {...editingEntry.formData, noHp: value}
                })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettingsView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Developer Settings</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Application Behavior</h3>
        <div className="space-y-4">
          <BooleanInput
            label="Skip Splash Screen"
            name="skipSplashScreen"
            value={settings.skipSplashScreen}
            onChange={(value) => handleSaveSettings({...settings, skipSplashScreen: value})}
            icon={RefreshCw}
          />
          
          <BooleanInput
            label="Skip Loading Screen"
            name="skipLoadingScreen"
            value={settings.skipLoadingScreen}
            onChange={(value) => handleSaveSettings({...settings, skipLoadingScreen: value})}
            icon={RefreshCw}
          />
          
          <BooleanInput
            label="Show Debug Info"
            name="showDebugInfo"
            value={settings.showDebugInfo}
            onChange={(value) => handleSaveSettings({...settings, showDebugInfo: value})}
            icon={AlertTriangle}
          />
          
          <BooleanInput
            label="Enable Auto-fill"
            name="autoFillEnabled"
            value={settings.autoFillEnabled}
            onChange={(value) => handleSaveSettings({...settings, autoFillEnabled: value})}
            icon={CheckCircle}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToApp}
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <ArrowLeft size={16} />
                Back to App
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">🛠️ Developer Mode</h1>
                <p className="text-gray-600">Manage form entries and application settings</p>
              </div>
            </div>
            <img src="/swapro copy.png" alt="SWAPRO Logo" className="h-12" />
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Database size={16} className="inline mr-2" />
              Entries
            </button>
            <button
              onClick={() => setViewMode('settings')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                viewMode === 'settings'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Settings size={16} className="inline mr-2" />
              Settings
            </button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'list' && renderListView()}
        {viewMode === 'edit' && renderEditView()}
        {viewMode === 'settings' && renderSettingsView()}
      </div>
    </div>
  );
};

export default DeveloperMenu;