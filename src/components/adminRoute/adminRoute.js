import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slices/authSlice';

const UseAdminRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === process.env.REACT_APP_ADMIN_EMAIL) return children;
  else return null;
};

export default UseAdminRoute;
