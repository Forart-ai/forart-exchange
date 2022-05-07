import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { GamePageSidebar } from './sidebar'
import { gameRoutes } from './routes'
import { styled } from '@mui/material'

const GamePageWrapper = styled('div')`
 min-height: 100vh;
  display: flex;
`

const MainContainer = styled('div')`
  width: calc(100vw - 240px);
`

const Game: React.FC = () => {
  return (
    <GamePageWrapper>
      <GamePageSidebar />
      <MainContainer>
        <Switch>
          {
            gameRoutes.map(({ path, component }) => (
              <Route
                path={`/game/${path}`}
                component={component}
                key={path}
              />
            ))
          }
        </Switch>
      </MainContainer>
    </GamePageWrapper>
  )
}

export default Game
