import React, { useEffect } from 'react'
import { BottomNavigation, BottomNavigationAction, Paper, styled } from '@mui/material'
import routes, { Route } from '../../routes'
import { Link, useHistory } from 'react-router-dom'
import { NavLinkText } from '../AppHeader'

const AppBottomNavigation: React.FC = () => {

  const [value, setValue] = React.useState('/')

  const history = useHistory()

  useEffect(() => {
    history.push(value)
    // console.log(value)
  },[value])

  return (
    <>
      <Paper sx={{ '&.MuiPaper-root': { zIndex: '3' }, position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >

          {
            routes.filter(route => (!route.hidden) ).map((route: Route, index) => (
              <BottomNavigationAction key={index} value={route.path}  label={ route.title} />
            ))
          }

        </BottomNavigation>
      </Paper>
    </>
  )
}

export default AppBottomNavigation
