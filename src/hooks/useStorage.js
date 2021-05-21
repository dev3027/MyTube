import { useState, useEffect } from 'react';
import { imgStore, db, timestamp } from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = imgStore.ref(file.name);
    const collectionRef = db.collection('images').doc('profile');
    storageRef.put(file).on(
      'state_changed',
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.set({ url, createdAt });
        setUrl(url);
      }
    );
  }, [file]);
  return { progress, url, error };
};

export default useStorage;
