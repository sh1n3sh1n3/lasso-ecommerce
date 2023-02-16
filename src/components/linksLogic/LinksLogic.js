import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/slices/authSlice';

export const DisplayOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const DisplayOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return children;
  }
  return null;
};
