import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  BarChart3,
  Settings, 
  FileText,
  Menu,
  X
} from 'lucide-react';
import { FormData } from '../types/DevEntry';
import DeveloperDashboard from './DeveloperDashboard';
import FormManagement from './FormManagement';
import { loadDevSettings, saveDevSettings, DevSettings } from '../utils/devStorage';

interface DeveloperMenuProps {
  onLoadToMainForm: (formData: FormData, hiddenFields: string[], isUrgent: boolean) => void;
  onBackToApp: () => void;
  currentFormData: FormData;
}

type ViewMode = 'dashboard' | 'form' | 'settings';

const defaultSettings: DevSettings = { skipSplashScreen: false, skipLoadingScreen: false, showDebugInfo: false, autoFillEnabled: false };

const DeveloperMenu: React.FC<DeveloperMenuProps> = ({ 
  onLoadToMainForm, 
  onBackToApp, 
  currentFormData 
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [settings, setSettings] = useState<DevSettings>(loadDevSettings() || defaultSettings);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSaveSettings = (newSettings: DevSettings) => {
    setSettings(newSettings);
    saveDevSettings(newSettings);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, description: 'Overview & Statistics' },
    { id: 'form', label: 'Form Management', icon: FileText, description: 'Manage Form Fields & Structure' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Application Settings' }
  ];

  const renderSettingsView = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Configure application behavior and preferences</p>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Application Behavior</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Skip Splash Screen</h4>
              <p className="text-sm text-gray-600">Skip the animated splash screen on app load</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.skipSplashScreen}
                onChange={(e) => handleSaveSettings({...settings, skipSplashScreen: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Skip Loading Screen</h4>
              <p className="text-sm text-gray-600">Skip the loading screen after landing page</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.skipLoadingScreen}
                onChange={(e) => handleSaveSettings({...settings, skipLoadingScreen: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Show Debug Info</h4>
              <p className="text-sm text-gray-600">Display additional debug information</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showDebugInfo}
                onChange={(e) => handleSaveSettings({...settings, showDebugInfo: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Enable Auto-fill</h4>
              <p className="text-sm text-gray-600">Automatically fill form fields when available</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoFillEnabled}
                onChange={(e) => handleSaveSettings({...settings, autoFillEnabled: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (viewMode) {
      case 'dashboard':
        return <DeveloperDashboard />;
      case 'form':
        return <FormManagement />;
      case 'settings':
        return renderSettingsView();
      default:
        return <DeveloperDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Settings size={16} className="text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-gray-900">Developer Mode</h1>
                  <p className="text-xs text-gray-500">SWAPRO Portal</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = viewMode === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setViewMode(item.id as ViewMode)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-500'} />
                  {sidebarOpen && (
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onBackToApp}
            className={`w-full flex items-center gap-3 px-3 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all duration-200 ${
              !sidebarOpen ? 'justify-center' : ''
            }`}
          >
            <ArrowLeft size={20} />
            {sidebarOpen && <span className="font-medium">Back to App</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/swapro copy.png" alt="SWAPRO Logo" className="h-8" />
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {menuItems.find(item => item.id === viewMode)?.label}
                </h2>
                <p className="text-sm text-gray-500">
                  {menuItems.find(item => item.id === viewMode)?.description}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DeveloperMenu;
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