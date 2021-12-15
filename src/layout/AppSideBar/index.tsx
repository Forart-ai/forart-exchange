import React from 'react'
// @ts-ignore
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { Affix, Menu } from 'antd'
import routes, { Route } from '../../routes'
import TwitterIcon from '../../assets/images/contactLink/twitter.png'
import TelegramIcon from '../../assets/images/contactLink/telegram.png'
import WebsiteIcon from '../../assets/images/contactLink/website.png'
import DiscordIcon from '../../assets/images/contactLink/discord.png'

const AppSideBarContent = styled.div`
  height: 100%;
  min-height: 100vh;
  padding-left: 10px;
  background: #04111D;
  position: relative;
  border-right: 1px solid #262531;
  z-index: 99;
  top: 60px;

  .ant-menu-root.ant-menu-vertical,
  .ant-menu-root.ant-menu-vertical-left,
  .ant-menu-root.ant-menu-vertical-right,
  .ant-menu-root.ant-menu-inline {
    background: #04111D !important;
    box-shadow: none;
  }
`

const CustomizedMenu = styled(Menu)`
  height: 80vh;
  position: relative;
  
  .ant-menu-item {
    display: flex;
    align-items: center;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;

    svg {
      width: 10px;

      line {
        shape-rendering: crispEdges;
      }
    }
  }


  .ant-menu-item-selected {
    background-color: #1F252B !important;

    a {
      color: white !important;
    }

    &:after {
      border-right: none !important;
    }
  }

  .ant-menu-item-active:not(.ant-menu-item-selected) {
    background-color: #161A1F !important;
  }
  
  .ant-menu-title-content {
    display: flex;
    align-items: center;
    img {
      width: 18px;
      margin-right: 25px;
    }
  }
  
`

const StyledMenuItem = styled(Menu.Item)`


`

const LinkContainer = styled.div`
  position: fixed;
  width: 69px;
  height: 150px;
  bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-items: center;
`


const SCExternalLink = styled.a`
  display: flex;
  align-items: center;
  width: 40px;

  .link-name {
    margin-left: 20px;
    z-index: 1;
  }
  img {
    width: 25px;
  }
  `

export  const EXTERNAL_LINKS: Array<{ icon: string, link: string }> = [
  { icon: TwitterIcon, link: 'https://twitter.com/forart_ai' },
  { icon: TelegramIcon, link: 'https://t.me/forart_co' },
  { icon: DiscordIcon, link: 'https://discord.gg/RDaUkaW39S' },
  { icon: WebsiteIcon, link:'https://forart.co/' }
]

const AppSideBar:React.FC = () => {
  const { pathname } = useLocation()

  const selectedKey: string = (() => {
    return routes.filter(route => route.path === pathname || route.match?.test(pathname))[0]?.path
  })()




  return (
    <AppSideBarContent>
      <CustomizedMenu
        selectedKeys={[selectedKey]}
        mode="inline"
        theme="dark"
      >
        {
          routes.filter(route => !route.hidden).map((route: Route) => {
            const fillColor = (route.path === pathname || route.match?.test(pathname)) ? 'white' : '#fff'

            return (
              <StyledMenuItem key={route.path} disabled={route.disable} >
                <img src={route.icon} className="menu-icon" width={20} />
                <Link to={route.path}>
                  {route.title}
                </Link>
              </StyledMenuItem>
            )
          })
        }
      </CustomizedMenu>

      <LinkContainer >
        {
          EXTERNAL_LINKS.map(({ icon,link }) => (

            <SCExternalLink key={link} href={link} target="_blank" rel="noreferrer">
              <img src={icon} alt={link} />
            </SCExternalLink>
          ))
        }
      </LinkContainer>
    </AppSideBarContent>
  )
}

export default AppSideBar
