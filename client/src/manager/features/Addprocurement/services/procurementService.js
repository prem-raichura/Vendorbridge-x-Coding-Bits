import axios from 'axios';

const API_URL = 'http://localhost:8000/api/procurement';

export const addProcurementOfficer = async (officerData) => {
  try {
    const token = localStorage.getItem('token') || localStorage.getItem('vendorbridge_token');
    const response = await axios.post(`${API_URL}/add`, officerData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};
