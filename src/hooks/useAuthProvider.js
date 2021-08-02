import { useState } from 'react';
import { useLocalStorage } from 'react-use';

export const getToken = () => localStorage.getItem('TOKEN');
export default function useAuthProvider() {
  const tokenkey = '@airbnb-Token';
  const [tokenPersistido, setTokenPersistido, removeTokenPersistido] = useLocalStorage('TOKEN', tokenkey);
  const [token, setToken] = useState(tokenPersistido);

  const logar = () => {
    setToken(token);
    setTokenPersistido(token);
  };

  const deslogar = () => {
    setToken(tokenkey);
    removeTokenPersistido();
  };

  return {
    token,
    logar,
    deslogar,
  };
}
