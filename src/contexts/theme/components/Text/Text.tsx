import { styled } from '@mui/material'
import { TextProps } from './types'
import getThemeValue from '../../../../utils/getThemeValue'
import { DefaultTheme } from 'styled-components'
import { space, typography, layout } from 'styled-system'

interface ThemedProps extends TextProps {
  theme: DefaultTheme;
}

const getColor = ({ color, theme }: ThemedProps) => {
  return getThemeValue(`palette.${color}`, color)(theme)
}

const Text = styled('div')<TextProps> `
  color: ${getColor};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  line-height: 1.5;
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${({ ellipsis }) =>
    ellipsis && `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  `}

  ${space}
  ${typography}
  ${layout}

`

Text.defaultProps = {
  color: 'primary.main',
  fontSize: '16px',
  fontFamily:'Kanit-Regular'
}

export default Text
