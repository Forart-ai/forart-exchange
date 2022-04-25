import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { ProgressProps } from 'antd'

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 20,
//   borderRadius: 20,
//   border: `1px ${theme.palette.primary.main} solid`,
//
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor: 'transparent'
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
//   },
// }))

const BorderLinearProgress = styled(LinearProgress)`
  min-height: 30px;
  border-radius: 20px;
  border: 1px ${({ theme }) => theme.palette.primary.main} solid;


   &.${linearProgressClasses.colorPrimary}  {
  background-color: transparent;
}
  
 & .${linearProgressClasses.bar}  {
   border-radius: 20px;
   background-clip: padding-box, border-box;
   background-origin: padding-box, border-box;
   background-image:  linear-gradient(90deg, #50DCB4, #8246F5, #C86EFF);
}
`

const CustomizedProgressBars:React.FC<ProgressProps> = (props:ProgressProps) => {
  return (

    <BorderLinearProgress variant="determinate" value={props.percent} />
  )
}

export default CustomizedProgressBars
