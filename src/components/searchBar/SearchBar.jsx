import { BiSearch } from 'react-icons/bi';

import styles from './SearchBar.module.scss';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className={styles['search-bar']}>
      <BiSearch className={styles.icon} size={18} />
      <input type='text' placeholder='Buscar' value={value} onChange={onChange} />
    </div>
  );
};

export default SearchBar;
