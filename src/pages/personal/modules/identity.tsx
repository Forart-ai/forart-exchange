import React from 'react'
import DefaultPageWrapper from '../../../components/default-page-wrapper'
import { styled } from '@mui/material'
import Avatar from '../../../assets/images/artistDetail/hyteen.jpg'
import CustomizedAccordions from '../../../contexts/theme/components/Accordition'
import IdentityPrice from '../components/identity-price'
import IdentityGrade from '../components/identity-grade'

const Wrapper = styled('div')`
  max-width: 1440px;
  width: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 90%;
  }
  
`
const IdentityContainer = styled('div')`
  margin: 60px 0;
  height: fit-content;
  border-radius: 30px;
  width: 100%;
  padding: 50px 70px;
  background-color: #28005A;
  display: flex;
  justify-content: space-between ;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    padding: 20px;
  }
`

const RainbowText = styled('div')`
  text-align: left;
  span {
    font-size: 54px;
    background-image: -webkit-linear-gradient( right, ${({ theme }) => theme.palette.secondary.light}, ${({ theme }) => theme.palette.secondary.main}, ${({ theme }) => theme.palette.primary.light});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: KronaOne-Regular;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    span {
      font-size: 36px;
    }
  }
`

const LeftContainer = styled('div')`
  height: 100%;
  width: 40%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`

const RightContainer = styled('div')`
  height: 100%;
  width: 55%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`

const ImageContainer = styled('div')`
  border-radius: 10px;
  max-height: 600px;
  max-width: 550px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
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
`

const MainTitle = styled('div')`
  font-family: KronaOne-Regular;
  font-weight: 400;
  font-size: 58px;
  color: #ffffff;
  text-align: left;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: 10px;
    font-size: 30px;
  }
`

const AccordionContainer = styled('div')`
  
`

const Identity:React.FC = () => {
  return (
    <Wrapper>
      <IdentityContainer>

        <LeftContainer>
          <ImageContainer >
            {/*<div className={'info'}>qq</div>*/}
            <img src={Avatar} />
          </ImageContainer>
          <HistoryContainer />
        </LeftContainer>

        <RightContainer>
          <MainTitle > #1122 Identity</MainTitle>
          <RainbowText > <span>HypeTeen</span> </RainbowText>

          <AccordionContainer>
            <CustomizedAccordions expanded={true} title={'Price'}>
              <IdentityPrice />
            </CustomizedAccordions>

            <div style={{ height:'20px' }} />

            <CustomizedAccordions expanded={true} title={'Grade'}>
              <IdentityGrade />
            </CustomizedAccordions>

          </AccordionContainer>
        </RightContainer>

      </IdentityContainer>
    </Wrapper>
  )
}

export default Identity
