export const getToken = () => localStorage.getItem('jwt-token');
export const getIsAdmin = () => localStorage.getItem('isAdmin');
// TODO: Add docs for these functions

/**
 * Save the token and isAdmin in local storage.
 */
export const saveToken = (token, isAdmin) => {
  if (!token || (undefined === isAdmin)) throw new Error('Token and isAdmin Required');

  localStorage.setItem('jwt-token', token);
  localStorage.setItem('isAdmin', isAdmin);
};

/** Removes the token and isAdmin from local storage */
export const removeToken = () => {
  localStorage.removeItem('jwt-token');
  localStorage.removeItem('isAdmin');
};

/**
 * Returns token
 */
export const getTokenInfo = () => {
  try {
    const token = getToken();
    if (token) {
      const payload = window.atob(token.split('.')[1]);
      return JSON.parse(payload);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Returns an object containing the token info and a boolean
 * that is true if the user is an admin, false otherwise.
 * { tokenInfo: *token* , isAdmin *true/false* }
 * Returns false if the user is not authenticated.
 */
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

/**
 * Sets authorziation header with the current users token.
 */
export const setAuthHeader = () => ({
  headers: { authorization: `Bearer ${getToken()}` },
});
