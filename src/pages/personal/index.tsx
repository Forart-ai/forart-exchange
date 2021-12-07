import React, { useState } from 'react'
// @ts-ignore
import styled from 'styled-components'
import { Avatar, Image, Tabs } from 'antd'
import { useWeb3React } from '@web3-react/core'
import { shortenAddress } from '../../utils'
import { SmileOutlined, DollarOutlined, EditOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons'
import { usePersonalNFTsQuery } from '../../hooks/queries/usePersonalNFTsQuery'
import { ChainType, ForartNftTransactionStatus } from '../../apis/nft'
import NFTListItem from '../../components/NFTListItem'


const { TabPane } = Tabs



const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 68px);

  display: flex;
  justify-content: center;
  align-items: center;
`

const PersonalCenterContainer = styled.div`
  width: 95%;
  height: 95%;
  
`

const BackgroundContainer = styled.div`
  width: 100%;
  height: 240px;
  position: relative;
  display: flex;
  justify-content: center;
  background-color: #232326;
`

const UserAvatar = styled.div`
  width: 130px;
  height: 130px;
//  border: 2px #02A6F5 solid;
  border-radius: 70px;
  position: absolute;
  top: 180px;
`

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;

  .username {
    font-size: 30px;
    color: #94DAFF;
    font-weight: bolder;
  }

  .address {
    font-size: 18px;
    color: #646b78;
    font-weight: bold;
  }
`

const TabsWrapper = styled.div`
  width: 100%;
`

const StyledTab = styled(Tabs)`
  user-select: none;
  margin-top: 20px;

  .ant-tabs-tab {
    font-size: 20px;
    color: #E5E8EB !important;
    font-weight: bolder;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #94DAFF !important;

  }

  .ant-tabs-nav-wrap {
    display: flex;
    justify-content: center;!important;
  }

  .ant-tabs-nav::before {
    //display: none; !important;
    border-bottom: 1px #65727b solid;

  }

  .ant-tabs-ink-bar {
    line-height: 20px;
    background-image: linear-gradient(to right, #00EBA4, #02A6F5);
    padding: 4px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
`

const NFTListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;

  .empty {
    padding: 0;
    height: 0;
    width: 210px;
  }
`

const UserNFTList: React.FC<any> = ({ list }) => {
  return (
    <NFTListContainer>
      {
        list?.map((nft: any, index: number) => (
          <NFTListItem data={nft} key={index} type="own" />
        ))
      }
      {
        new Array(5).fill({}).map((_, index) => (
          <div className="empty" key={index} />
        ))
      }
    </NFTListContainer>
  )
}

const TabsContainer: React.FC = () => {


  const [current, setCurrent] = useState<number>(1)

  const [searchKey, setSearchKey] = useState<any>()

  const [, setStatus] = useState<ForartNftTransactionStatus>()

  const [typeChain, setTypeChain] = useState<ChainType>('')

  const { data: personalNft, isLoading } = usePersonalNFTsQuery({ current, searchKey, typeChain })

  const onTabChange = (key: any) => {
    console.log(key)
  }

  console.log(personalNft)

  return (
    <TabsWrapper>
      <StyledTab defaultActiveKey="owned" onChange={onTabChange}  >
        <TabPane
          tab= {
            <span>
              <SmileOutlined />
              Owned
            </span>
          }
          key="owned"
        >
          {
            isLoading && <LoadingOutlined />
          }
          {
            !isLoading && <UserNFTList list={personalNft} />
          }
        </TabPane>

        <TabPane
          tab= {
            <span>
              <DollarOutlined />
              On sale
            </span>
          }
          key="onSale"
        />

        <TabPane
          tab= {
            <span>
              <EditOutlined />
              Created
            </span>
          }
          key="created"
        />
      </StyledTab>
    </TabsWrapper>
  )
}

const PersonalCenterPage: React.FC = () => {

  const { account } = useWeb3React()


  return (
    <Wrapper>
      <PersonalCenterContainer>
        <BackgroundContainer>
          <UserAvatar>
            <Avatar size={126} icon={<UserOutlined />} />
          </UserAvatar>
        </BackgroundContainer>
        <UserInfo>
          <div className="username">Hello World</div>
          <div className="address">{ shortenAddress(account?.toString())}</div>
        </UserInfo>

        <TabsContainer />

      </PersonalCenterContainer>
    </Wrapper>
  )
}


export default PersonalCenterPage
