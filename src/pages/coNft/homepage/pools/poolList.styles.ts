import { styled } from '@mui/system'

export const PoolsContainer = styled('div')`
  width: 100%;
  margin: 40px 0 ;

 
`

export const PoolListContainer = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr)); 
  justify-content: space-between;
  gap: 20px;
  overflow-x: auto;
  list-style: none;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    grid-template-columns: repeat(1,minmax(0,1fr));
  }
 
`

export const PoolsCardContainer = styled('div')<{chain?: string}>`
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  position: relative;
  margin-top: 26px;
  border: 1px #999999 solid;
  cursor: pointer;
  background-color: rgba(255, 255, 255, .05);
  -o-transition:all .5s ease-in-out;
  -webkit-transition: all .5s ease-in-out;
  -moz-transition: all .5s ease-in-out;
  transition:all .5s ease-in-out;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-left: 0;
    margin-right: 0;
  }

  .right-arrow-svg {
    position: relative;
    -o-transition:all .3s ease-in-out;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    transition:all .3s ease-in-out;
    left: 0;
  }


  &:hover {
    background-color: rgb(12, 9, 33);
    
    .right-arrow-svg {
      position: relative;
      left: 5px;
    }

  }


  .ribbon {
    width: 150px;
    height: 150px;
    overflow: hidden;
    position: absolute;
    z-index: 3;
  }
  .ribbon::before,
  .ribbon::after {
    position: absolute;
    z-index: -1;
    content: '';
    display: block;
    border: 5px solid #1f3685;
  }
  .ribbon span {
    position: absolute;
    display: block;
    width: 225px;
    padding: 15px 0;
    //background: linear-gradient(45deg, #00FFA3, #03E1FF 27%, #DC1FFF);
    background: ${({ chain }) => chain === 'AVALANCHE' ? 'rgb(232,65,66)' : 'linear-gradient(45deg, #00FFA3, #03E1FF 27%, #DC1FFF)'};
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
    color: #fff;
    font: 700 18px/1 'Lato', sans-serif;
    text-shadow: 0 1px 1px rgba(0,0,0,.2);
    text-transform: uppercase;
    text-align: center;
  }

  /* top left*/
  .ribbon-top-left {
    top: -10px;
    left: -10px;
  }
  .ribbon-top-left::before,
  .ribbon-top-left::after {
    border-top-color: transparent;
    border-left-color: transparent;
  }
  .ribbon-top-left::before {
    top: 0;
    right: 0;
  }
  .ribbon-top-left::after {
    bottom: 0;
    left: 0;
  }
  .ribbon-top-left span {
    right: -25px;
    top: 30px;
    transform: rotate(-45deg);
  }

`

export const ImageContent = styled('div')<{cover: any}>`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  position: relative;


  .background {
    width: 100%;
    height: 100%;
    background: url(${({ cover }) =>  cover}) no-repeat center  ;
    background-size: cover;
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
    object-fit: cover;
    opacity: .8;
    position: relative;
    
  

  }
  img {
    height: 100%;
    object-fit: contain;
    opacity: 1;
    position: absolute;
    right: 0;
    bottom: 40px;
  }


  .title {
    position: absolute;
    height: 50px;
    width: 100%;
    bottom: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%);
    z-index: 1;
    display: flex;
    align-items: center;

    span {
      padding: 5px;
      color: white;
      font-size: 26px;
      font-family: arialBold;
      opacity: 1;
      z-index: 9;
    }
  }


`
export const InfoContent = styled('div')`
  width: 100%;
  padding: 18px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const DataContent = styled('div')`
  width: fit-content;
  font-family: Kanit-Regular;
  border: 1px #3750a8 solid;
  color: #ffffff;
  font-size: 16px;
  background: linear-gradient(276.64deg,#172a65 1.77%,rgba(15,29,71,0) 130.65%);
  padding: 4px 8px;
  border-radius: .4rem;
  margin: 0 .5rem;
`

export const PoolTitle = styled('div')`
  
`

export const LeftArea = styled('div')(({ theme }) => ({
  width: '55%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontSize: '12px',

  '& .avatar': {
    width: '64px',
    height: '64px',
    marginRight: '6px',
    img: {
      width: '100%',
      height: '100%',
      borderRadius: '5px',
      objectFit: 'cover',

    }
  },

  '& .owner': {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.secondary,
    fontSize: '12px',
    whiteSpace:'nowrap',

    span: {
      color: theme.palette.text.primary,
      fontSize: '16px',
      fontFamily: 'arialBold',
    }
  },

  [theme.breakpoints.down('sm')]: {
    '& .owner': {

      span: {
      }
    },
  }

}))

export const RightArea = styled('div')(({ theme }) => ({
  width: '45%',
  display: 'flex',
  justifyContent: 'space-around',
  fontFamily: 'Aldrich-Regular',

  '& .data': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.primary.main,
    fontSize: '20px',

  },

  span: {
    fontSize: '12px',
    fontFamily: 'arial',
    color: theme.palette.text.secondary,
  },

  [theme.breakpoints.down('sm')] :{
    '& .data': {

    },

    span: {
    },
  }

}))

