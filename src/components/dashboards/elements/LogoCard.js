import React, { useState } from 'react';
import { FaTimesCircle, FaPlusCircle } from 'react-icons/fa';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import { imgStore, db } from '../../../firebase/config';
import useFirestore from '../../../hooks/useFirestore';

const LogoCard = () => {
  const { docs } = useFirestore('images');
  const [upload, setUpload] = useState(false);

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const hiddenFileInput = React.useRef(null);

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
    const types = ['image/svg', 'image/png', 'image/jpeg', 'image/jpg'];
    let selected = e.target.files[0];
    console.log(selected);

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
            {file == null ? (
              <>
                <AvatarImg
                  src='/images/Ellipse60.png'
                  alt='portfolio p n g at 200 pix by 200 pix'
                />
                <AddImgIcon
                  onClick={() => {
                    hiddenFileInput.current.click();
                  }}
                />
                <input
                  type='file'
                  id='bgFile'
                  ref={hiddenFileInput}
                  onChange={changeHandler}
                  aria-label='Background Image for channel page'
                  style={{display: 'none'}}
                />

                <InfoTag>
                  <span>Portfolio Image</span>
                  <span>200px X 200px</span>
                </InfoTag>
              </>
            ) : (
              <>
                <AvatarImg
                  src={URL.createObjectURL(file)}
                  alt='portfolio p n g at 200 pix by 200 pix'
                />
                <RemoveImgIcon
                  onClick={() => {
                    setFile(null);
                  }}
                />
                <InfoTag>
                    <span>Portfolio Image</span>
                  <span>200px X 200px</span>
                </InfoTag>
              </>
            )
          }
          </PortfolioUpper>
        </form>
      </PortfolioInfoDiv>
    </>
  );
};

export default LogoCard;

const PortfolioInfoDiv = styled.div`
  display: flex;
  position: relative;
  padding-top: 20px;
  margin-bottom: 5px;
`;

const AvatarImg = styled.img`
  position: relative;
  border-radius: 50%;
  width: 60px;
  height: 60px;
`;

const AddImgIcon = styled(FaPlusCircle)`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 60px;
  left: 50px;
  background-color: #fff;
  border-radius: 50%;
`;

const RemoveImgIcon = styled(FaTimesCircle)`
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

const PortfolioUpper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5px;
  padding-left: 5px;
  margin-bottom: 5px;
`;