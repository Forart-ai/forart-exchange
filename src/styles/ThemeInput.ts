// @ts-ignore
import styled from 'styled-components'
import { Input } from 'antd'
import { Property } from 'csstype'

type SearchInputProps = {
  backgroundColor?: Property.Color
}

const defaultColor = '#282c34'

const ThemeInput = styled(Input)<SearchInputProps>`
  border-color: ${props =>  props.backgroundColor ?? defaultColor};
  border-radius: 5px;
  font-weight: 500;
  font-size: 1.4rem;
  height: 100%;

  &, .ant-input {
    background-color: ${props =>  props.backgroundColor ?? defaultColor};
    color: white !important;
  }
`

export {
  ThemeInput
}
