import React, { useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 20px 0;
  width: 100%;
`
export const Title = styled.div`
  font-size: 2.5em;
  color: #ffffff;
`
const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 6px;
    height: 5px;
    background-color: transparent;
  }
`

const MintItems = styled.div`

  margin: 10px;
  min-width: 135px;
  min-height: 200px;
  width: 200px;
  height: 200px;
  background: #1E052D;
  border-radius: 10px;
  
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  &:last-child {
    margin-right: auto;
  }
`


export const SelectedList: React.FC<{kitList?: Map<string, any>, body: any}> = ({ kitList, body }) => {

  useEffect(()=> {
    // console.log(kitList)
  },[kitList])

  return (
    <Wrapper>
      <Title>Selected</Title>
      <Container>

        <MintItems>
          {
            body?.url && <img src={body?.url} />
          }
        </MintItems>

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
