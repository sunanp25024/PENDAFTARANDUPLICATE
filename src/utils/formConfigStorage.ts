import { FormConfig, defaultFormConfig, FormStatistics } from '../types/FormConfig';

const FORM_CONFIG_KEY = 'swapro_form_config';
const FORM_STATISTICS_KEY = 'swapro_form_statistics';

export const loadFormConfig = (): FormConfig => {
  try {
    const stored = localStorage.getItem(FORM_CONFIG_KEY);
    if (stored) {
      const config = JSON.parse(stored);
      // Merge with default config to ensure all properties exist
      return {
        ...defaultFormConfig,
        ...config,
        steps: config.steps || defaultFormConfig.steps,
        clients: config.clients || defaultFormConfig.clients,
        locations: config.locations || defaultFormConfig.locations,
        positionPlacements: config.positionPlacements || defaultFormConfig.positionPlacements
      };
    }
    return defaultFormConfig;
  } catch (error) {
    console.error('Error loading form config:', error);
    return defaultFormConfig;
  }
};

export const saveFormConfig = (config: FormConfig): void => {
  try {
    localStorage.setItem(FORM_CONFIG_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving form config:', error);
  }
};

export const resetFormConfig = (): void => {
  try {
    localStorage.removeItem(FORM_CONFIG_KEY);
  } catch (error) {
    console.error('Error resetting form config:', error);
  }
};

export const exportFormConfig = (): string => {
  const config = loadFormConfig();
  return JSON.stringify(config, null, 2);
};

export const importFormConfig = (configJson: string): boolean => {
  try {
    const config = JSON.parse(configJson);
    saveFormConfig(config);
    return true;
  } catch (error) {
    console.error('Error importing form config:', error);
    return false;
  }
};

// Statistics functions (mock data for now)
export const loadFormStatistics = (): FormStatistics => {
  try {
    const stored = localStorage.getItem(FORM_STATISTICS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Return mock statistics
    return {
      totalSubmissions: 0,
      submissionsByPosition: {},
      submissionsByGender: { male: 0, female: 0 },
      submissionsByClient: {},
      submissionsByLocation: {},
      recentSubmissions: []
    };
  } catch (error) {
    console.error('Error loading form statistics:', error);
    return {
      totalSubmissions: 0,
      submissionsByPosition: {},
      submissionsByGender: { male: 0, female: 0 },
      submissionsByClient: {},
      submissionsByLocation: {},
      recentSubmissions: []
    };
  }
};

export const updateFormStatistics = (formData: any): void => {
  try {
    const stats = loadFormStatistics();
    
    // Update statistics based on form data
    stats.totalSubmissions += 1;
    
    // Update by position
    if (formData.posisiDilamar) {
      stats.submissionsByPosition[formData.posisiDilamar] = 
        (stats.submissionsByPosition[formData.posisiDilamar] || 0) + 1;
    }
    
    // Update by gender
    if (formData.jenisKelamin === 'Laki-laki') {
      stats.submissionsByGender.male += 1;
    } else if (formData.jenisKelamin === 'Perempuan') {
      stats.submissionsByGender.female += 1;
    }
    
    // Update by client
    if (formData.client) {
      stats.submissionsByClient[formData.client] = 
        (stats.submissionsByClient[formData.client] || 0) + 1;
    }
    
    // Update by location
    if (formData.penempatan) {
      stats.submissionsByLocation[formData.penempatan] = 
        (stats.submissionsByLocation[formData.penempatan] || 0) + 1;
    }
    
    // Add to recent submissions
    stats.recentSubmissions.unshift({
      name: formData.namaLengkap || 'Unknown',
      position: formData.posisiDilamar || 'Unknown',
      client: formData.client || 'Unknown',
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 10 recent submissions
    stats.recentSubmissions = stats.recentSubmissions.slice(0, 10);
    
    localStorage.setItem(FORM_STATISTICS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Error updating form statistics:', error);
  }
};