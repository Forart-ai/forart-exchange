import { styled } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import React from 'react'
import { UseQueryResult } from 'react-query'
import { CSSProperties } from 'styled-components'

type Props<T> = {
    label: string
    queryResult?: UseQueryResult<T | undefined>
    displayExpress?: (data: T) => string
    labelWidth?: CSSProperties['width']
}

const DataItemContainer = styled('div')`
    display: flex;
  align-items: center;
`

const LabelText = styled('div')(({ theme })=>({
  fontWeight: 'bolder',
  fontSize: 16,
  color: theme.palette.text.primary,
}))

const ValueText = styled('div')(({ theme })=>({
  fontSize: 22,
  color: theme.palette.text.secondary
}))

const DataItem = <T,>({ label, queryResult, displayExpress, labelWidth, ...rest }: Props<T>): JSX.Element => {
  return (
    <DataItemContainer>
      <LabelText  className={'label'}>
        {label}
      </LabelText>
      {
        queryResult?.data ? (
          <ValueText>
            {
              displayExpress
                ? displayExpress(queryResult.data)
                : (
                  (queryResult.data as any).toString?.() || queryResult.data
                )
            }
          </ValueText>
        ) : (
          queryResult?.isFetching
            ? <ClipLoader color={'#abc'} size={16} css={'position: relative; top: 2px; left: 4px;'} />
            : <ValueText> &nbsp;- </ValueText>
        )
      }
    </DataItemContainer>
  )
}

export { DataItem }
