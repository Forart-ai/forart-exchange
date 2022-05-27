import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import DownIcon from '../../../../assets/images/siderIcon/down.svg'

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
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
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
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  backgroundColor: '#14002D',
  marginBottom: '15px',

}))

const CustomizedAccordions:React.FC<AccordionProps> = (props:AccordionProps) => {
  const [expanded, setExpanded] = React.useState<boolean>(true)

  const handleChange = (props: boolean) => {
    setExpanded( props)
  }

  return (
    <div>
      <Accordion expanded={expanded} onChange={() => handleChange(!expanded)} >
        <AccordionSummary  expandIcon={<img src={DownIcon} />} aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{  border:'none'  }}>
          {
            props.children
          }
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default CustomizedAccordions
