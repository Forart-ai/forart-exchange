import React from 'react'
import styled from '@emotion/styled'
import banner from '../../assets/images/home/banner-new.png'
import solana from '../../assets/images/home/solana.svg'
import eth from '../../assets/images/home/eth.png'
import celo from '../../assets/images/home/celo.png'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

const HomePage = styled.div`
  max-width: 100vw;
  width: 100%;
  min-height: 1000px;
 

  @media screen and  (max-width: 1100px) {
    width: 100vw !important;
    min-height: 1200px;
  }
`

const BannerContent = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;

  
  @media screen and (max-width: 1100px) {
    height: 150px;
   img {
     width: 100%;
     height: 100%;
     object-fit: contain;
     
   }
  }
  
 
`

const Built = styled.div`
  color: white;
  width: 100%;
  flex-wrap: wrap;
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
  
  @media screen and (max-width: 1100px) {
    
    .celo, .eth {
      font-size: 18px;
    }
    
    img {
      margin: 0 10px;
    }

    img:nth-of-type(1) {
      height: 20px;
    }
    
  }
`

const HomePageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`

const Content = styled.div`
  width: 1200px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;

  
  @media screen and (max-width: 1100px) {
    width: 100vw;
  }



`

const Title = styled.div`
  font-weight: 550;
  font-size: 46px;
  background-image: -webkit-linear-gradient(left, #00EBA4, #02A6F5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 20px;

  @media screen and (max-width: 1100px) {
    text-align: center;
    width: 100%;
    font-size: 32px;
  }
`

const GamingPools = styled.div`
  width: 100%;
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;


  @media screen and (max-width: 1100px) {
    padding: 0 20px;
  }




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

 
`

const PoolsTitle = styled.div`
  width: 100%;
  padding: 10px 15px;
  font-size: 30px;
  color: white;
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
    title: 'Style Transferred NFT',
    background: 'linear-gradient(90deg,#E45341,#F5B1A6)',
    path: ''
  },
  {
    title: 'GAN-Driven NFT Generation',
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
  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })

  return (
    <HomePage>
      <BannerContent>
        <img src={banner} />
      </BannerContent>

      <HomePageContainer>
        <Built>
          { !isMobile && <span>Built on</span> }

          <div className="celo"><img src={celo} />Celo</div>
          <img src={solana} style={isMobile ? { width:'100px' }: { width:'140px' } } />
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
              <PoolsTitle>Style Transferred NFT</PoolsTitle>
            </PoolsItem>

            <PoolsItem>
              <PoolsTitle>GAN-Driven NFT Generation</PoolsTitle>
            </PoolsItem>

            <PoolsItem>
              <PoolsTitle>AI-Driven Tool Kit to mint NFTs</PoolsTitle>
              <PoolsTitle>Coming Soon!</PoolsTitle>
            </PoolsItem>

          </GamingPools>
        </Content>
      </HomePageContainer>
    </HomePage>
  )
}

export default Home
