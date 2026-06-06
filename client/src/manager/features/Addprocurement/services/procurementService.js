import api from '../../../../shared/api/axiosInstance';

// Create a new procurement officer
export const addProcurementOfficer = async (officerData) => {
  try {
    const response = await api.post('/procurement/add', officerData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

// Get all procurement officers (for the roster list)
export const getProcurementOfficers = async () => {
  try {
    const response = await api.get('/admin/manager/procurement-officers');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch officers');
  }
};
