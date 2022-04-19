import React from 'react'
import styled from 'styled-components'
import { CloseButton, useModal } from '../../../../../contexts/modal'
const Wrapper = styled.div`
  width: 400px;
  height: 150px;
  padding:15px 20px;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, rgb(27, 3, 42), rgb(27, 3, 42)), linear-gradient(90deg, #ff4090, #3c69c2);
`

const Title = styled.div`
  height: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inter-extraBold;
  color: #f2f2f2;
`

const DonationError:React.FC<{err?: string}> = ({ err }) => {

  const { closeModal } = useModal()

  return (
    <Wrapper>
      <CloseButton onClick={closeModal} />

      <Title>{err}</Title>
    </Wrapper>
  )
}

const DonationSuccess:React.FC = () => {

  const { closeModal } = useModal()

  return (
    <Wrapper>
      <CloseButton onClick={closeModal} />

      <Title>Transition success</Title>
    </Wrapper>
  )
}

export { DonationError , DonationSuccess }
