import React from 'react'
import styled from 'styled-components'
import { CloseButton, useModal } from '../contexts/modal'
import WarningIcon from '../assets/images/modalImages/warning.svg'

const Wrapper = styled.div`
  width: 700px;
  padding:15px 20px;
  border-radius: 10px;
  position: relative;
  border: 4px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, rgb(27, 3, 42), rgb(27, 3, 42)), linear-gradient(90deg, #ff4090, #3c69c2);
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-family: inter-extraBold;
  color: #f2f2f2;
  margin-bottom: 40px;
`

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const TopArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  color: #c2c2c2;
  font-size: .8em;
  img {
    padding: 20px;
  }
`

const DonateDialog: React.FC = () => {
  const { closeModal } = useModal()

  return (
    <Wrapper>
      <CloseButton onClick={closeModal} />
      <Title>Donate for this artist</Title>
      <MainContainer>
        <TopArea>
          <img src={WarningIcon} />
          <div >Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab aliquam at debitis esse expedita explicabo minus rem sit voluptatum.</div>
        </TopArea>
      </MainContainer>
    </Wrapper>
  )
}

export default DonateDialog

