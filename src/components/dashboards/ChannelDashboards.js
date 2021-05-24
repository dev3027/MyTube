import React from 'react';
import LogoCard from './elements/LogoCard';
import ProfileCard from './elements/ProfileCard';

import styled from 'styled-components';

function ChannelForm() {
  return (
    <Container>
      <Wrapper>
        <LeftSection>
          <LeftColumn>
            <h3>Images</h3>
            <LogoCard />
            <ProfileCard />
          </LeftColumn>
          <RightColumn></RightColumn>
        </LeftSection>
        <DisplayWrap></DisplayWrap>
      </Wrapper>
    </Container>
  );
}

export default ChannelForm;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  grid-template-columns: 70% 30%;
`;

const DisplayWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 370px;
  color: #333;
  padding: 10px;

  img {
    padding: 0 5px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr;
  width: 570px;
  color: #333;
`;

const LeftColumn = styled.div`
  text-align: left;
  background-color: #fff;
  padding: 10px;
`;

const RightColumn = styled.div`
  background-color: #fff;
  padding: 10px;
`;
