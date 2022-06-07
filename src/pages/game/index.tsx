import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { GamePageSidebar } from './sidebar'
import { gameRoutes } from './routes'
import { styled } from '@mui/material'

const GamePageWrapper = styled('div')`
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

const MainContainer = styled('div')`
  width: 100%;
`

const Game: React.FC = () => {

  const navigate = useNavigate()

  useEffect(() => {
    navigate('/game/aiArt')
  }, [navigate])

  return (
    <GamePageWrapper>
      <GamePageSidebar />
      <MainContainer>
        <Routes>
          {
            gameRoutes.map(({ path, component }) => (
              <Route
                path={`/game/${path}`}
                element={component}
                key={path}
              />
            ))
          }
        </Routes>
      </MainContainer>
    </GamePageWrapper>
  )
}

export default Game
