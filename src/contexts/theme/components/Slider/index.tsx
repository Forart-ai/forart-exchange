import * as React from 'react'
import Slider, { sliderClasses, SliderProps } from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

const CustomizeSlider = styled(Slider)`
  color: #8246F5;
  //background:  linear-gradient(90deg, #50DCB4, #8246F5, #C86EFF);
  height: 20px;
  //border-radius: 20px;
  
  &.MuiSlider-track {
    border: none;
  }
  
  & .${sliderClasses.thumb} {
    height: 24px;
    width: 24px;
    background-color: white;
    border: 2px solid currentColor;

  &:focus, &:hover, & .Mui-active, & .Mui-focusVisible {
    boxShadow: inherit;
  },

  &:before {
    display: none;
  },
  }

 & .MuiSlider-valueLabel {
    line-height: 1.2px;
    font-size: 12px;
    padding: 0;
    width: 32px;
    height: 32px;
    background-color: #ba75ff;
    border-radius: 50% ;

    transform-origin: bottom left;


  & .MuiSlider-valueLabelOpen {
    transform: translate(50%, -100%)  scale(1);
  }

 
  }
`

const CustomizedSlider:React.FC<SliderProps> = (props: SliderProps) => {
  return (
    <CustomizeSlider
      {...props}
    />

  )
}

export default CustomizedSlider
