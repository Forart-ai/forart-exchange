import React, { useEffect, useState } from 'react'
import Dialog from '../../../../../contexts/theme/components/Dialog/Dialog'
import { styled } from '@mui/system'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import CONFT_API from '../../../../../apis/co-nft'
import { useLocationQuery } from '../../../../../hooks/useLocationQuery'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const Wrapper = styled('div')`
  height: 300px;
  overflow: scroll;
`

const CreateRankModal:React.FC = () => {
  const series = useLocationQuery('artistId')
  const [page, setPage] = useState<number>(1)
  const [searchKey, setSearchKey] = useState<string | number>('')
  const [data, setData] = useState<any[]>([])
  const [total, setTotal] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [flag, setFlag] = useState(true)

  const getData = () => {
    if (!series) {
      return
    }
    CONFT_API.core.nft.getWalletRank(series, page, searchKey )
      .then((res:any) => {
        console.log(res)
        setData( res.map((item:any, index: number) => ({
          key: index,
          wallet: item.wallet,
          rank: item.rank,
          count: item.count
        })))
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Dialog title={'wallet rank'} closeable >

      <Wrapper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#No</StyledTableCell>
                <StyledTableCell align="right">Wallet</StyledTableCell>
                <StyledTableCell align="right">donate</StyledTableCell>
                <StyledTableCell align="right">amount</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item,index) => (
                <StyledTableRow key={item.name}>

                  <StyledTableCell align="right">{index + 1}</StyledTableCell>
                  <StyledTableCell align="right">{item.wallet}</StyledTableCell>
                  <StyledTableCell align="right">{item.rank}</StyledTableCell>
                  <StyledTableCell align="right">{item.count}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Wrapper>
    </Dialog>
  )
}

export default CreateRankModal
