import React from 'react'
// @ts-ignore
import styled from 'styled-components'
import { useLocationQuery } from '../../hooks/useLocationQuery'


const Wrapper = styled.div`
  color: white
`
const NFTDetail: React.FC = () => {

  const uri = useLocationQuery('uri') ?? ''

  const addressContract = useLocationQuery('addressContract')



  return (
    <Wrapper>we</Wrapper>
  )

}

export default NFTDetail
