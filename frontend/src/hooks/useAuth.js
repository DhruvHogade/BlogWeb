import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
};

export default useAuth;
