import React from 'react'
import styled from '@emotion/styled'
import banner from '../../assets/images/home/banner.png'
import solana from '../../assets/images/home/solana.svg'
import polygon from '../../assets/images/home/polygon.svg'
import eth from '../../assets/images/home/eth.png'
import celo from '../../assets/images/home/celo.png'
import { useHistory } from 'react-router-dom'


const HomePage = styled.div`
  width: 100%;
`

const BannerContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: #2A41C3;
  
  img {
    height: 300px;
  }
`

const Built = styled.div`
  color: white;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  
  span {
    color: #47E19D;
  }
  
  img {
    margin-left: 50px;
  }

  img:nth-of-type(1) {
    height: 30px;
  }
  
  img:nth-of-type(2) {
    height: 20px;
  }
  .celo {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bolder;

    img {
      margin-right: 10px;
    }
  }
  .eth {
    display: flex;
    align-items: center;
    font-size: 25px;
    font-weight: bolder;
    
    img {
      margin-right: 10px;
    }
  }
`

const Content = styled.div`
  width: 1200px;
  margin-left: calc((100% - 1200px) / 2);
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Title = styled.div`
  font-weight: 550;
  font-size: 46px;
  background-image: -webkit-linear-gradient(left, #00EBA4, #02A6F5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 20px;
`

const GamingPools = styled.div`
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;  
`

const PoolsItem = styled.div`
  width: 500px;
  height: 300px;
  position: relative;
  text-align: center;
  margin-top: 30px;
  cursor: pointer;
  border-radius: 10px;
  
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    //background: linear-gradient(90deg,#02A6F5,#00EBA4,#000000);
    //background: linear-gradient(90deg,#4D3AE9,#8BD2ED);
    opacity: 1;
    left: 0;
    top: 0;
  }
`

const PoolsTitle = styled.div`
  margin-top: 100px;
  font-size: 50px;
  color: white;
  position: relative;
`


type pools = {
  title: string
  background: any
  path?: string
}

const gamingPools:pools[] = [
  {
    title: 'NFT+Defi+AI',
    background: 'linear-gradient(90deg,#4D3AE9,#8BD2ED)'
  },
  {
    title: 'AI-Driven NFT Breeding',
    background: 'linear-gradient(90deg,#E45341,#F5B1A6)'
  },
  {
    title: 'AI-Driven Generating NFTs by Topic seed',
    background: 'linear-gradient(90deg,#E64C29,#F4BA76)',
    path: '/AI-Gen'
  },
  {
    title: 'AI-Driven Tool Kit to mint NFTs',
    background: 'linear-gradient(90deg,#66A7B8,#A1CAE6)'
  }
]

const Home:React.FC = () => {


  const history = useHistory()

  const word = 'Coming soon ...'

  const toPath = (pathName: string | undefined) => {
    history.push(`${pathName}`)
  }

  return (
    <HomePage>
      <BannerContent>
        <img src={banner} />
      </BannerContent>
      <Built>
        <span>Built on</span>
        <div className="celo"><img src={celo} />Celo</div>
        <img src={polygon} />
        <img src={solana} />
        <div className="eth"><img src={eth} />Ethereum</div>
      </Built>
      <Content>
        <Title>
          Gaming Pools
        </Title>
        <GamingPools>
          {
            gamingPools.map((item, index) => (
              <PoolsItem
                key={index}
                style={{ background: item.background }}
                onClick={() => toPath(item?.path)}
              >
                <PoolsTitle>
                  {item.title}
                </PoolsTitle>
              </PoolsItem>
            ))
          }
        </GamingPools>
      </Content>
    </HomePage>
  )
}

export default Home