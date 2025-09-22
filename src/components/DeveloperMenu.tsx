import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  BarChart3, 
  Settings, 
  FileText, 
  Users, 
  MapPin, 
  Briefcase,
  Menu,
  X,
  Database,
  TrendingUp,
  UserCheck,
  Building2,
  Calendar,
  Download,
  Upload,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Zap,
  Star,
  Save,
  RotateCcw
} from 'lucide-react';
import { FormData } from '../types/DevEntry';
import { DeveloperDashboard } from './DeveloperDashboard';
import { FormManagement } from './FormManagement';

interface DeveloperMenuProps {
  onLoadToMainForm: (data: FormData) => void;
  onBackToApp: () => void;
  currentFormData: FormData;
}

type ActiveTab = 'dashboard' | 'form-management' | 'settings';

export function DeveloperMenu({ onLoadToMainForm, onBackToApp, currentFormData }: DeveloperMenuProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settings, setSettings] = useState({
    skipSplashScreen: false,
    skipLoadingScreen: false,
    showDebugInfo: false,
    enableAutoFill: false
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('dev-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const saveSettings = (newSettings: typeof settings) => {
    setSettings(newSettings);
    localStorage.setItem('dev-settings', JSON.stringify(newSettings));
  };

  const menuItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: BarChart3 },
    { id: 'form-management' as ActiveTab, label: 'Form Management', icon: FileText },
    { id: 'settings' as ActiveTab, label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DeveloperDashboard />;
      case 'form-management':
        return <FormManagement onLoadToMainForm={onLoadToMainForm} currentFormData={currentFormData} />;
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Skip Splash Screen</label>
                    <p className="text-xs text-gray-500">Bypass the initial splash screen</p>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, skipSplashScreen: !settings.skipSplashScreen })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.skipSplashScreen ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.skipSplashScreen ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Skip Loading Screen</label>
                    <p className="text-xs text-gray-500">Bypass the loading screen after landing page</p>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, skipLoadingScreen: !settings.skipLoadingScreen })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.skipLoadingScreen ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.skipLoadingScreen ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Show Debug Info</label>
                    <p className="text-xs text-gray-500">Display additional debugging information</p>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, showDebugInfo: !settings.showDebugInfo })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.showDebugInfo ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.showDebugInfo ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable Auto-fill</label>
                    <p className="text-xs text-gray-500">Automatically fill form fields when available</p>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, enableAutoFill: !settings.enableAutoFill })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.enableAutoFill ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.enableAutoFill ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Developer Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset All Data
                </button>
                <button className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Export Config
                </button>
                <button className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Config
                </button>
                <button className="flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                  <Database className="w-4 h-4 mr-2" />
                  Test Mode
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <DeveloperDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'} flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Developer Mode</h1>
                  <p className="text-xs text-gray-500">Manage form entries and settings</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="ml-3 font-medium">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Back to App */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onBackToApp}
            className="w-full flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="ml-3 font-medium">Back to App</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}