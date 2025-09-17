import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Building2, 
  MapPin, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  User,
  Briefcase
} from 'lucide-react';
import { loadFormStatistics, FormStatistics } from '../utils/formConfigStorage';

const DeveloperDashboard: React.FC = () => {
  const [statistics, setStatistics] = useState<FormStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = () => {
      try {
        const stats = loadFormStatistics();
        setStatistics(stats);
      } catch (error) {
        console.error('Error loading statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
    
    // Refresh statistics every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="text-center py-12">
        <Activity size={48} className="text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Statistics Available</h3>
        <p className="text-gray-500">Statistics will appear after form submissions.</p>
      </div>
    );
  }

  const topPositions = Object.entries(statistics.submissionsByPosition)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const topClients = Object.entries(statistics.submissionsByClient)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const topLocations = Object.entries(statistics.submissionsByLocation)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Overview statistik pendaftaran aplikasi</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={16} />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Submissions</p>
              <p className="text-3xl font-bold text-gray-900">{statistics.totalSubmissions}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Male Applicants</p>
              <p className="text-3xl font-bold text-gray-900">{statistics.submissionsByGender.male}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <User size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Female Applicants</p>
              <p className="text-3xl font-bold text-gray-900">{statistics.submissionsByGender.female}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <User size={24} className="text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Positions</p>
              <p className="text-3xl font-bold text-gray-900">{Object.keys(statistics.submissionsByPosition).length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Briefcase size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Positions */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Top Positions</h3>
          </div>
          <div className="space-y-3">
            {topPositions.length > 0 ? (
              topPositions.map(([position, count], index) => (
                <div key={position} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-700 truncate max-w-48">{position}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{count}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No position data available</p>
            )}
          </div>
        </div>

        {/* Top Clients */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={20} className="text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Top Clients</h3>
          </div>
          <div className="space-y-3">
            {topClients.length > 0 ? (
              topClients.map(([client, count], index) => (
                <div key={client} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-500' : 'bg-green-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{client}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{count}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No client data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Locations */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">Top Locations</h3>
          </div>
          <div className="space-y-3">
            {topLocations.length > 0 ? (
              topLocations.map(([location, count], index) => (
                <div key={location} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-500' : 'bg-purple-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{location}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{count}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No location data available</p>
            )}
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <PieChart size={20} className="text-indigo-600" />
            <h3 className="text-lg font-bold text-gray-900">Gender Distribution</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Male</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">{statistics.submissionsByGender.male}</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({statistics.totalSubmissions > 0 ? Math.round((statistics.submissionsByGender.male / statistics.totalSubmissions) * 100) : 0}%)
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Female</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">{statistics.submissionsByGender.female}</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({statistics.totalSubmissions > 0 ? Math.round((statistics.submissionsByGender.female / statistics.totalSubmissions) * 100) : 0}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={20} className="text-red-600" />
            <h3 className="text-lg font-bold text-gray-900">Recent Submissions</h3>
          </div>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {statistics.recentSubmissions.length > 0 ? (
              statistics.recentSubmissions.map((submission, index) => (
                <div key={index} className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{submission.name}</p>
                    <p className="text-xs text-gray-600 truncate">{submission.position}</p>
                    <p className="text-xs text-gray-500">{new Date(submission.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4 text-sm">No recent submissions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;