import React, { useEffect } from 'react'
import { Link, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
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
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === '/game') navigate('/game/aiArt')
  }, [pathname])

  return (
    <GamePageWrapper>
      <GamePageSidebar />
      <MainContainer>
        {/*<Routes>*/}
        {/*  {*/}
        {/*    gameRoutes.map(({ path, component }) => (*/}
        {/*      <Route*/}
        {/*        path={`/game/${path}`}*/}
        {/*        element={component}*/}
        {/*        key={path}*/}
        {/*      />*/}
        {/*    ))*/}
        {/*  }*/}
        {/*</Routes>*/}
        <nav>
          <Link to={'aiArt'}  />
          <Link to={'magic-wand'}  />
        </nav>
        <Outlet />
      </MainContainer>
    </GamePageWrapper>
  )
}

export default Game
