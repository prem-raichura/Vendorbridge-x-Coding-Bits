import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Registers a new vendor by making a POST request to the admin endpoint.
 * @param {Object} vendorData - The vendor registration data from the form.
 * @returns {Promise<Object>} The response data from the server.
 */
export const registerVendor = async (vendorData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/vendor`, vendorData);
    return response.data;
  } catch (error) {
    // Return a structured error message based on the server response
    throw new Error(error.response?.data?.message || error.message || 'An error occurred during registration');
  }
};
