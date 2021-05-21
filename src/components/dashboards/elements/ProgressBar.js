import React, { useEffect } from 'react';
import styled from 'styled-components';
import useStorage from '../../../hooks/useStorage';

function ProgressBar({ file, setFile }) {
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return <LoadingBar style={{ width: progress + '%' }}></LoadingBar>;
}

export default ProgressBar;

const LoadingBar = styled.div`
  height: 2px;
  background-color: purple;
`;
