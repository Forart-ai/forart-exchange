import React from 'react'
import DefaultPageWrapper from '../../../components/default-page-wrapper'
import { styled } from '@mui/material'
import Avatar from '../../../assets/images/artistDetail/hyteen.jpg'

const IdentityContainer = styled('div')`
  margin: 60px 0;
  height: fit-content;
  border-radius: 30px;
  width: 100%;
  padding: 30px;
  background-color: #28005A;
`

const LeftContainer = styled('div')`
  height: 100%;
  width: 40%;
`

const ImageContainer = styled('div')`
  border-radius: 10px;
  max-height: 600px;
  max-width: 550px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  
  img {
    border-radius: 10px;
  }
  .info {
    padding: 5px 10px;
    color: #ffffff;
  }
`

const HistoryContainer = styled('div')`
  width: 100%;
  max-height: 600px;
  border: 1px red solid;
`

const Identity:React.FC = () => {
  return (
    <DefaultPageWrapper>
      <IdentityContainer>
        <LeftContainer>
          <ImageContainer >
            {/*<div className={'info'}>qq</div>*/}
            <img src={Avatar} />
          </ImageContainer>
          <HistoryContainer />
        </LeftContainer>
      </IdentityContainer>
    </DefaultPageWrapper>
  )
}

export default Identity
