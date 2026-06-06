import api from '../../../../shared/api/axiosInstance';

// Get all RFQs assigned to the vendor
export const getAssignedRfqs = async () => {
  try {
    const response = await api.get('/vendor/quotation/assigned-rfqs');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch assigned RFQs');
  }
};

// Get a single RFQ by ID (for vendor view)
export const getRfqById = async (rfqId) => {
  try {
    const response = await api.get(`/vendor/quotation/rfq/${rfqId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch RFQ details');
  }
};

// Submit a quotation for an RFQ
export const submitQuotation = async (rfqId, quotationData) => {
  try {
    const response = await api.post(`/vendor/quotation/rfq/${rfqId}/quote`, quotationData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to submit quotation');
  }
};
