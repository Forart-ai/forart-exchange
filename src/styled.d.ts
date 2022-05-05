import 'styled-components'
import { ThemeOptions } from '@mui/material'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends ThemeOptions {}
}
