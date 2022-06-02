import React from 'react'
import { styled, Tab, Tabs } from '@mui/material'

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  variant?: 'scrollable' | 'standard';
  centered?: boolean
}

export  const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    scrollButtons="auto"
    aria-label="scrollable auto tabs example"
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(({ theme }) => ({

  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
  },

}))

export interface StyledTabProps {
  label: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (

        <div  >
          {children}
        </div>

      )}
    </div>
  )
}

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  fontFamily: 'arialBold',
  textTransform: 'none',
  fontSize: '20px',
  padding: 0,
  margin: '0 20px',

  [theme.breakpoints.down('sm')] : {
    fontSize:'14px',
    margin:'0 10px',
  },

  marginRight: theme.spacing(1),
  color:theme.palette.secondary.main,

  '&.Mui-selected': {
    color:theme.palette.primary.main,
  },
}))
