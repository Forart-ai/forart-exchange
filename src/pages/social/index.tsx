import React, { useEffect } from 'react'
import DefaultPageWrapper from '../../components/default-page-wrapper'
import { Box } from '@mui/material'
import { Route, Switch, useHistory } from 'react-router-dom'
import { socialRoutes } from './routes'
import Flex from '../../contexts/theme/components/Box/Flex'
import { styled } from '@mui/system'
import SocialHomepage from './modules/home'

const SocialContainer = styled('div')`
  display: flex;
  border: 1px red solid;
`

const NftChatroom: React.FC = () => {
  const history = useHistory()

  useEffect(() => {
    history.push('home')
  }, [history])

  return (
    <SocialContainer>
      <Switch>
        {
          socialRoutes.map(({ path, component }) => (
            <Route
              path={`/social/${path}`}
              component={component}
              key={path}
            />
          ))
        }
      </Switch>

      <Box sx={{ width:'200px' ,height:'100px', border:'1px aqua solid' }} />
    </SocialContainer>
  )
}

export default NftChatroom
