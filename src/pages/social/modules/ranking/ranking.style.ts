import { styled } from '@mui/system'

const getStyleByRank = ({ theme, $rank }: any) => {
  switch ($rank) {
  case '1':
    return { background:'rgb(239,180,60)' }
  case '2':
    return { background:'rgb(144,47,197)' }
  case '3':
    return { background:'rgb(22,18,108)' }

  default:
    return ''

  }
}

export const RankingBox = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px ${({ theme }) => theme.palette.secondary.light} solid;
  margin-top: 30px;
  border-radius: 10px;
`

export const TableHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px 20px;
`

export const RankList = styled('div')`
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
  border-top: 1px ${({ theme }) => theme.palette.secondary.main} solid;
  padding: 16px 20px;
  transition: all .3s;
  
  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.palette.background.paper};

  }

`

export const Number = styled('div')<{$rank: string}>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${getStyleByRank}
`

export const MoreContainer = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-top: 1px ${({ theme }) => theme.palette.secondary.main} solid;

`
