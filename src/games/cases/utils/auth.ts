export const getTokenFromLocalStorage = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') || '';
  }
  return '';
};
