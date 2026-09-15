export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.115:3001';

async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición a la API');
  }

  return data;
}


export const apiService = {

  async registerUser(userData: any) {
    return fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async loginUser(credentials: any) {
    return fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },


  async getUsers() {
    return fetchApi('/users', {
      method: 'GET',
    });
  },

  async registerTenant(tenantData: any) {
    return fetchApi('/restaurante/register', {
      method: 'POST',
      body: JSON.stringify(tenantData),
    });
  }
};
