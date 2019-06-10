export const getToken = () => localStorage.getItem('jwt-token');
export const getIsAdmin = () => localStorage.getItem('isAdmin');
// TODO: Add docs for these functions

export const saveToken = (token, isAdmin) => {
  if (!token || !isAdmin) throw new Error('Token and isAdmin Required');

  localStorage.setItem('jwt-token', token);
  localStorage.setItem('isAdmin', isAdmin);
};

export const removeToken = () => {
  localStorage.removeItem('jwt-token');
  localStorage.removeItem('isAdmin');
};

export const getTokenInfo = () => {
  try {
    const token = getToken();
    if (token) {
      const payload = window.atob(token.split('.')[1]);
      return JSON.parse(payload);
    }
  } catch (error) {
    console.error(error);
  }
};

export const isAuthed = () => {
  const tokenInfo = getTokenInfo();
  const isAdmin = getIsAdmin();
  if (tokenInfo && tokenInfo.exp > Math.round(new Date() / 1000)) {
    return {
      tokenInfo,
      isAdmin,
    };
  }
  return false;
};

export const setAuthHeader = () => ({
  headers: { authorization: `Bearer ${getToken()}` },
});
