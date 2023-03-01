import { useEffect, useState } from 'react';

import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

import { toast } from 'react-toastify';

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCollection = () => {
    setLoading(true);
    try {
      const dataRef = collection(db, collectionName);
      const q = query(dataRef, orderBy('uploadTime', 'desc'));
      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(allData);
        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      toast.error('Não foi possível exibir os dados.');
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return { data, loading };
};

export default useFetchCollection;
