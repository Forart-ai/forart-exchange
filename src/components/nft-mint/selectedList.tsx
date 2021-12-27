import React, { useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 20px 0;
  width: 100%;
`
const Title = styled.div`
  font-size: 2.7em;
  color: #ffffff;
`
const Container = styled.div`
  width: 100%;
  height: 155px;
  display: flex;
  justify-content: space-between;
`

const MintItems = styled.div`
  margin: 10px;
  min-width: 135px;
  background: #070E1E;
  box-shadow: 10px 4px 10px #0000008c;
  border-radius: 10px;
  
  &:last-child {
    margin-right: auto;
  }
`


export const SelectedList: React.FC<{kitList?: Map<string, any>, body: any}> = ({ kitList, body }) => {

  useEffect(()=> {
    console.log(kitList)
  },[kitList])

  return (
    <Wrapper>
      <Title>Selected</Title>
      <Container>

        <MintItems> <img src={body?.url} /> </MintItems>
        {
          Array.from(kitList?.entries() ?? []).map(([key, value]) => (
            <MintItems  key={key}>
              <img className="image" src={value.url} />
            </MintItems>
          ))
        }
      </Container>
    </Wrapper>
  )
}
