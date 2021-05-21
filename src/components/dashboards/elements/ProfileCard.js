import React, { useState } from 'react';
import { FaPencilAlt, FaRegTimesCircle, FaPlusCircle } from 'react-icons/fa';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import { imgStore, db } from '../../../firebase/config';
import useFirestore from '../../../hooks/useFirestore';

const ProfileCard = () => {
  const { docs } = useFirestore('images');
  const [upload, setUpload] = useState(false);
  const [showDiv, setShowDiv] = useState(false);

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const deleteFile = (e) => {
    e.preventDefault();

    const imgRef = imgStore.refFromURL(docs[0].url);
    imgRef.delete();

    db.collection('images')
      .doc('profile')
      .delete()
      .then(() => {
        console.log('Profile doc is deleted');
      })
      .catch((error) => {
        console.error('error on delete doc', error);
      });
  };

  const changeHandler = (e) => {
    const types = ['image/svg', 'image/png', 'image.jpeg', 'image/jpg'];

    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select a approved file type.');
    }
  };

  return (
    <>
      <PortfolioInfoDiv>
        <form>
          <PortfolioUpper>
            {!docs.length ? (
              <>
                <DefaultImg
                  src='/images/Ellipse60.png'
                  alt='portfolio p n g at 200 pix by 200 pix'
                />
                {!showDiv && !upload && (
                  <EditIcon
                    onClick={() => {
                      setUpload(true);
                      setShowDiv(true);
                    }}
                  />
                )}
              </>
            ) : (
              <>
                <UploadImg
                  src={docs[0].url}
                  alt='portfolio p n g at 200 pix by 200 pix'
                />
                <DelBtn onClick={deleteFile} />
              </>
            )}

            <InfoTag>
              <span>Portfolio Image</span>
              <span>200px X 200px</span>
            </InfoTag>
          </PortfolioUpper>
          <PortfolioLower>
            <InputInfo>
              {upload && (
                <>
                  <UploadBgOutput>
                    {docs.length >= 1 ? (
                      <h4>Upload Complete</h4>
                    ) : (
                      <input
                        type='file'
                        id='bgFile'
                        onChange={changeHandler}
                        aria-label='Background Image for channel page'
                      />
                    )}
                    {error && <div className='error'>{error}</div>}
                    {file && <div>{file.name}</div>}
                    {file && <ProgressBar file={file} setFile={setFile} />}
                  </UploadBgOutput>
                </>
              )}
            </InputInfo>
          </PortfolioLower>
        </form>
      </PortfolioInfoDiv>
    </>
  );
};

export default ProfileCard;

const PortfolioInfoDiv = styled.div`
  display: flex;
  position: relative;
  padding-top: 20px;
  margin-bottom: 5px;
`;

const DefaultImg = styled.img`
  position: relative;
  border-radius: 50%;
  width: 60px;
  height: 60px;
`;

const UploadImg = styled(DefaultImg)``;

const EditIcon = styled(FaPlusCircle)`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 60px;
  left: 50px;
  background-color: #fff;
  border-radius: 50%;
`;

const InfoTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
  margin-left: 10px;
`;

const InputInfo = styled.div`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 13px;

  span {
    font-size: 13px;
  }
`;

const PortfolioUpper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5px;
  padding-left: 5px;
  margin-bottom: 5px;
`;

const PortfolioLower = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-around;
  width: 100%;
  height: 50%;
  padding: 5px 0;
`;

const UploadBgOutput = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0 3px;
  align-items: center;
`;

const DelBtn = styled(FaRegTimesCircle)`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 60px;
  left: 50px;
  background-color: peachpuff;
  border-radius: 50%;
`;
