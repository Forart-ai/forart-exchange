import React from 'react'
import styled from '@emotion/styled'
import banner from '../../assets/images/home/banner-new.png'
import solana from '../../assets/images/home/solana.svg'
import eth from '../../assets/images/home/eth.png'
import celo from '../../assets/images/home/celo.png'
import { useHistory } from 'react-router-dom'


const HomePage = styled.div`
  width: 100%;
  padding-bottom: 50px;
  font-family: 'campton';
`

const BannerContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: url(${banner}) no-repeat center;
  height: 300px;
  background-size: 100%;
  
 
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
    user-select: none;
    
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
  width: 400px;
  height: 170px;
  margin-top: 30px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 10px;
  border: 2px #00EBA4 solid;
  //background: #282c34;
 background: linear-gradient(300deg, #67ebba, #67eaba .34%, #69c2ce 15.61%, #6ba1de 31.22%, #6c87ea 47.25%, #6d75f3 63.72%, #6e6af8 80.92%, #6e66fa);
  //background: linear-gradient(to right, #00EBA4 ,#02A6F5);
  transition: all 0.4s ease-in-out 0.4s;

  :hover {
    background-color: #434957;
    color: #000;
    /* 加个发光效果和下面的倒影 */
    /* 模糊度加到了50px */
    box-shadow: 0 0 30px #02A6F5;
    /* below 是下倒影 1px是倒影的元素相隔的距离 最后是个渐变的颜色 */
    //-webkit-box-reflect: below 1px linear-gradient(transparent, rgba(0, 0, 0, 0.3));
    /* 设置一下以上属性的延迟时间 */
    transition-delay: 0.1s;
  }

  //&:before {
  //  content: '';
  //  width: 100%;
  //  height: 100%;
  //  position: absolute;
  //  //background: linear-gradient(90deg,#02A6F5,#00EBA4,#000000);
  //  //background: linear-gradient(90deg,#4D3AE9,#8BD2ED);
  //  opacity: 1;
  //  left: 0;
  //  top: 0;
  //}
`

const PoolsTitle = styled.div`
  width: 100%;
  padding: 10px 15px;
  font-size: 30px;
  color: white;
  font-weight: bold;
  text-shadow: 2px 3px 5px #282c34;
`

const PoolsText = styled.div`
  bottom: 10px;
  left: 20px;
  font-weight: bolder;
  font-size: 22px;
  color: #00EBA4;
`

const PoolsIcon = styled.div`

  width: inherit;
  height:inherit;
  position: absolute;


  img {
    position: relative;
    top: 50px;
    left: 250px;
    width: 100px;
  }
`

type pools = {
  title: string
  text?: string
  background: any
  path?: string
}

const gamingPools:pools[] = [
  {
    title: 'NFT+Defi+AI',
    text: '',
    background: 'linear-gradient(90deg,#4D3AE9,#8BD2ED)',
    path: ''
  },
  {
    title: 'AI-Driven NFT Breeding',
    background: 'linear-gradient(90deg,#E45341,#F5B1A6)',
    path: ''
  },
  {
    title: 'AI-Driven Generating NFTs by Topic seed',
    background: 'linear-gradient(90deg,#E64C29,#F4BA76)',
    path: '/AI-Gen'
  },
  {
    title: 'AI-Driven Tool Kit to mint NFTs',
    text: '',
    background: 'linear-gradient(90deg,#66A7B8,#A1CAE6)',
    path: ''
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
      <BannerContent />
      <Built>
        <span>Built on</span>
        <div className="celo"><img src={celo} />Celo</div>
        <img src={solana} style={{ width:'145px' }} />
        <div className="eth"><img src={eth} />Ethereum</div>
      </Built>
      <Content>
        <Title>
          Gaming Pools
        </Title>
        <GamingPools>
          {/*{*/}
          {/*  gamingPools.map((item, index) => (*/}
          {/*    <PoolsItem*/}
          {/*      key={index}*/}
          {/*      style={{ background: item.background }}*/}
          {/*      onClick={() => toPath(item?.path)}*/}
          {/*    >*/}
          {/*      <PoolsTitle>*/}
          {/*        {item.title}*/}
          {/*      </PoolsTitle>*/}
          {/*      <PoolsText>*/}
          {/*        {item.text}*/}
          {/*      </PoolsText>*/}
          {/*    </PoolsItem>*/}
          {/*  ))*/}
          {/*}*/}

          <PoolsItem >
            <PoolsTitle>NFT+Defi+AI</PoolsTitle>
            <PoolsTitle>Coming Soon!</PoolsTitle>
          </PoolsItem>

          <PoolsItem>
            <PoolsTitle>AI-Driven NFT Breeding</PoolsTitle>
          </PoolsItem>

          <PoolsItem>
            <PoolsTitle>AI-Driven Generating NFTs by Topic seed</PoolsTitle>
          </PoolsItem>

          <PoolsItem>
            <PoolsTitle>AI-Driven Tool Kit to mint NFTs</PoolsTitle>
            <PoolsTitle>Coming Soon!</PoolsTitle>
          </PoolsItem>


        </GamingPools>
      </Content>
    </HomePage>
  )
}

export default Home
