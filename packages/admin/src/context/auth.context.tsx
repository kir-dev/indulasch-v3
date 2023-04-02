import axios from 'axios';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { LoadingPlaceholder } from '../components/LoadingPlaceholder';
import { ApiPaths, UIPaths } from '../config/paths.config';
import { User } from '../types/types';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | undefined;
  token: string | undefined;
  login: (token: string) => void;
  logout: () => void;
  fetchUser: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: undefined,
  token: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  login: (token: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fetchUser: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const accessToken = searchParams.get('access_token');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      axios
        .get<User>(ApiPaths.ME)
        .then((res) => {
          if (res.data) {
            setIsAuthenticated(true);
            setToken(token);
            setUser(res.data);
            navigate('/');
          }
        })
        .catch(logout)
        .finally(() => {
          setLoading(false);
        });
    } else if (accessToken) {
      login(accessToken);
    } else {
      setIsAuthenticated(false);
      setToken(undefined);
      setLoading(false);
      logout();
    }
  }, []);

  const login = async (accessToken: string) => {
    setLoading(true);
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      localStorage.setItem('token', accessToken);
      setIsAuthenticated(true);
      setToken(token);
      await fetchUser();
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.error(error);
      logout();
    }
  };

  const logout = () => {
    axios.defaults.headers.common.Authorization = null;
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setToken(undefined);
    setUser(undefined);
    navigate(UIPaths.LOGIN);
  };

  const fetchUser = async () => {
    const { data: user } = await axios.get<User>('/users/me');
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        logout,
        fetchUser,
      }}
    >
      {loading ? <LoadingPlaceholder /> : children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
