import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import DownIcon from '../../../../assets/images/siderIcon/down.svg'
import Text from '../Text/Text'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '& .MuiAccordion-root': {
    border:'none'
  },
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    {...props}

  />
))(({ theme }) => ({
  backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.secondary.dark
          : theme.palette.secondary.dark,
  flexDirection: 'row',
  borderRadius:'10px',
  marginBottom:'10px',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },

}
))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius:'10px',
  backgroundColor: '#14002D',

}))

const CustomizedAccordions:React.FC<AccordionProps> = (props:AccordionProps) => {
  const [expanded, setExpanded] = React.useState<boolean>(true)

  const handleChange = (props: boolean) => {
    setExpanded( props)
  }

  return (
    <Accordion expanded={expanded} onChange={() => handleChange(!expanded)} >
      <AccordionSummary  expandIcon={<img src={DownIcon} />} aria-controls="panel1d-content" id="panel1d-header">
        <Text color={'white'} fontSize={18} letterSpacing={'1.3px'}> {props.title}</Text>
      </AccordionSummary>
      <AccordionDetails sx={{  border:'none'  }}>
        {
          props.children
        }
      </AccordionDetails>
    </Accordion>
  )
}

export default CustomizedAccordions
