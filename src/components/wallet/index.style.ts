import { styled } from '@mui/material'

export const Wrapper = styled('div')`
  position: relative;
`

export const TopArea = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`

export const ChosenArea = styled('div')`
position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .col-3 {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #f2f2f2;
    font-size: .8em;
    cursor: pointer;


    .Celo, .Avalanche {
      pointer-events: none;
      cursor: not-allowed;
      opacity: 0.6;
    }

    img {
      width: 70px;
    }
  }

  .row {
    display: flex;
    align-items: center;
    color: white;
    font-family: Aldrich-Regular;
    justify-content: flex-start;
    width: 100%;
    border-radius: 20px;
    padding: 7px 10px;
    transition: all .3s;

    :hover {
      background-color: ${({ theme }) => theme.palette.background.paper};
      cursor: pointer;
    }

    img {
      width: 40px;
      margin-right: 20px;
      border-radius: 50%;

    }
  }
`

export const ChipContainer = styled('div')`
  position: absolute;
  right: -10px;
  top: -14px;
  animation: heartbeat 1.5s ease-in-out infinite both;

  @keyframes heartbeat {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: center center;
      transform-origin: center center;
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    10% {
      -webkit-transform: scale(0.91);
      transform: scale(0.91);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    17% {
      -webkit-transform: scale(0.98);
      transform: scale(0.98);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    33% {
      -webkit-transform: scale(0.87);
      transform: scale(0.87);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    45% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }

`
