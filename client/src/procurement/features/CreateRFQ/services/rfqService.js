import api from '../../../../shared/api/axiosInstance';

// Create a new RFQ
export const createRfq = async (rfqData) => {
  try {
    const response = await api.post('/procurement/rfq/add', rfqData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create RFQ');
  }
};

// Get all RFQs for the logged-in procurement officer
export const getRfqs = async () => {
  try {
    const response = await api.get('/procurement/rfq/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch RFQs');
  }
};

// Get a single RFQ by ID
export const getRfqById = async (rfqId) => {
  try {
    const response = await api.get(`/procurement/rfq/${rfqId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch RFQ');
  }
};
