import React from 'react'
import { Box, styled } from '@mui/material'
import Logo from '../../assets/logo.png'
import TwitterIcon from '../../assets/images/socialIcons/twitter.png'
import TelegramIcon from '../../assets/images/socialIcons/telegram.png'
import DiscordIcon from '../../assets/images/socialIcons/discord.png'
import EmailIcon from '../../assets/images/socialIcons/email.png'

export  const EXTERNAL_LINKS: Array<{ icon: string, link: string }> = [
  { icon: TwitterIcon, link: 'https://twitter.com/forart_ai' },
  { icon: TelegramIcon, link: 'https://t.me/forart_ai' },
  { icon: DiscordIcon, link: 'https://discord.gg/RDaUkaW39S' },
  // { icon: WebsiteIcon, link:'https://forart.co/' }
]

const Footer = styled('div')`
  height: 210px;
  position: relative;
  bottom: 60px;
  display: flex;
  justify-content: center;
  margin: 20px 0;
`

const FooterContainer = styled('div')`
  height: 100%;
  background-color: #5000B4;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 50px;
  width: 80%;
  maxWidth: 1870px;
  
  .copyright {
    margin-top: 20px;
    color: #999999;
  }
`

const Info = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px #8246F5 solid;
`

const LeftArea = styled('div')`
    display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100px;
  width: 50%;
  
  img {
    width: 140px;
    margin-bottom: 10px;
  }
  
  span {
    color: #50DCB4;
    font-size: 16px;
    font-family: KronaOne-Regular;
  }
`

const RightArea = styled('div')`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  
`

const SCExternalLink = styled('a')`
    margin: 0 10px;
`

const AppFooter:React.FC = () => {

  const EXTERNAL_LINKS: Array<{ icon: string, link: string }> = [
    { icon: TwitterIcon, link: 'https://twitter.com/forart_ai' },
    { icon: TelegramIcon, link: 'https://t.me/forart_ai' },
    { icon: DiscordIcon, link: 'https://discord.gg/RDaUkaW39S' },
    { icon: EmailIcon, link: 'mailto:contact@forart.ai' },
  ]

  return (

    <Footer >
      <FooterContainer>
        <Info >
          <LeftArea >
            <img src={Logo} />
            <span>The First AI-powered Social NFT</span>
          </LeftArea>
          <RightArea >
            {
              EXTERNAL_LINKS.map(({ icon,link }) => (

                <SCExternalLink key={icon} href={link} target="_blank" rel="noreferrer">
                  <img src={icon} alt={link} />
                </SCExternalLink>
              ))
            }
          </RightArea>
        </Info>
        <div className={'copyright'}>©2022 Forart.ai - All right reserved</div>
      </FooterContainer>
    </Footer>
  )
}

export default AppFooter
