import React from 'react'
import styled from 'styled-components'
import { CloseButton, useModal } from '../../../contexts/modal'
const Wrapper = styled.div`
  width: 500px;
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

const DonationError:React.FC = () => {

  const { closeModal } = useModal()

  return (
    <Wrapper>
      <CloseButton onClick={closeModal} />

      <Title>Insufficient balance</Title>
    </Wrapper>
  )
}

export default DonationError
