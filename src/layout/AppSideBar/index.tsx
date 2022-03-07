import React from 'react'
// @ts-ignore
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { Affix, Menu, Tooltip } from 'antd'
import routes, { Route } from '../../routes'
import TwitterIcon from '../../assets/images/contactLink/twitter.png'
import TelegramIcon from '../../assets/images/contactLink/telegram.png'
import DiscordIcon from '../../assets/images/contactLink/discord.png'

const CustomizedMenu = styled(Menu)`
  height: 30vh;
  position: relative;

  .ant-menu-item {
    display: flex;
    align-items: center;
    padding: 0;
    justify-content: center;

    svg {
      width: 20px;

      line {
        shape-rendering: crispEdges;
      }
    }
  }


  .ant-menu-item-selected {
    //background-color: #1F252B !important;

    a {
      color: white !important;
    }

    &:after {
      border-right: none !important;
    }
  }

  .ant-menu-item-active:not(.ant-menu-item-selected) {
    background-color: transparent !important;
    border-radius: 0 !important;

  }
  
  .ant-menu-title-content {
    display: none;
  }
  

 
  
`

const LinkContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 10px;
`

const SCExternalLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  margin-bottom: 10px;

  .link-name {
    margin-left: 20px;
    z-index: 1;
  }
  img {
    width: 25px;
  }
  `

const SidebarWrapper = styled.div`
  position: absolute;
  height: calc(100vh - 60px);
  top: 60px;
  left: 12px;

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: transparent !important;
  }
  
  

  .ant-menu-root.ant-menu-inline {
    background: none;
    border: none;
  }

  .side-border {
    padding: 15px 13px;
    background: rgb(17,17,17);
    border-radius: 1em;
  }
`

export  const EXTERNAL_LINKS: Array<{ icon: string, link: string }> = [
  { icon: TwitterIcon, link: 'https://twitter.com/forart_ai' },
  { icon: TelegramIcon, link: 'https://t.me/forart_co' },
  { icon: DiscordIcon, link: 'https://discord.gg/RDaUkaW39S' },
  // { icon: WebsiteIcon, link:'https://forart.co/' }
]

const AppSideBar:React.FC = () => {
  const { pathname } = useLocation()

  const selectedKey: string = (() => {
    return routes.filter(route => route.path === pathname || route.match?.test(pathname))[0]?.path
  })()

  const MenuComp = () => {
    return (
      <Affix offsetTop={0}>
        <div className="side-border">
          {
            routes.filter(route => !route.hidden).map((route: Route) => {
              const fillColor = (route.path === pathname ) ? 'white' : 'red'

              return (
                <Link to={route.path} key={route.path}>
                  <Tooltip placement={'right'} title={route.title} >
                    <Menu.Item
                      icon={<route.icon fill={fillColor} />}
                      disabled={route.disable}
                    />
                  </Tooltip>

                </Link>
              )
            })
          }

        </div>
      </Affix>
    )
  }

  return (
    <SidebarWrapper>
      <CustomizedMenu
        selectedKeys={[selectedKey]}
        mode="inline"
      >
        <MenuComp />
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
    </SidebarWrapper>

  // <AppSideBarContent>
  //   <CustomizedMenu
  //     selectedKeys={[selectedKey]}
  //     mode="inline"
  //     theme="dark"
  //   >
  //     {
  //       routes.filter(route => !route.hidden).map((route: Route) => {
  //         const fillColor = (route.path === pathname || route.match?.test(pathname)) ? 'white' : '#fff'
  //
  //         return (
  //           <StyledMenuItem key={route.path} disabled={route.disable} >
  //             <img src={route.icon} className="menu-icon" width={20} />
  //             <Link to={route.path} > {route.title} </Link>
  //           </StyledMenuItem>
  //         )
  //       })
  //     }
  //
  //
  //
  //   </CustomizedMenu>
  //
  //   <Affix >
  //     <LinkContainer >
  //
  //       {
  //         EXTERNAL_LINKS.map(({ icon,link }) => (
  //
  //           <SCExternalLink key={link} href={link} target="_blank" rel="noreferrer">
  //             <img src={icon} alt={link} />
  //           </SCExternalLink>
  //         ))
  //       }
  //
  //     </LinkContainer>
  //   </Affix>
  //
  // </AppSideBarContent>
  )
}

export default AppSideBar
