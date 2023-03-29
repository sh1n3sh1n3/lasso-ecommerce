import { useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

import { toast } from 'react-toastify';

const useFetchDocument = (collectionName, id) => {
  const [document, setDocument] = useState(null);

  const getDocument = async () => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setDocument(obj);
    } else {
      toast.error('Falha ao receber informações do banco de dados.');
    }
  };

  useEffect(() => {
    getDocument();
  }, []);

  return { document };
};

export default useFetchDocument;
