import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { AppState, State } from '../type'

const initialState: AppState = {
  sideBarCollapsed: true
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSideBarCollapsed: (state, action) => {
      state.sideBarCollapsed = action.payload
    },
  }
})

export const useSideBarCollapsed = () => {
  return useSelector((state: State) => state.app.sideBarCollapsed)
}

export const { setSideBarCollapsed } = appSlice.actions

export default appSlice.reducer
