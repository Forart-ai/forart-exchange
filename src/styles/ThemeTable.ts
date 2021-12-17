// @ts-ignore
import styled from 'styled-components'
import { Table } from 'antd'
import { Property } from 'csstype'

export type ThemeTableProps = {
  headerTextColor?: Property.Color

  rowBackgroundColor?: Property.Color
  rowTextColor?: Property.Color

  rowCursor?: Property.Cursor
}

const ThemeTable = styled(Table)<ThemeTableProps>`
  width: 100%;
  margin-top: 15px;

  .ant-table {
    background-color: transparent;
    border-spacing: 10px;

    table {
      border-collapse: separate;
      border-spacing: 0 4px;
    }
  }

  .ant-table-thead {
    th {
      background-color: transparent;
      border-bottom-width: 0;
    }

    .ant-table-cell {
      font-size: 14px;
      font-weight: 550;

      padding-bottom: 12px;
      line-height: 0;
      color: ${props => props.headerTextColor ?? '#b3b3b3'}
    }

    .ant-table-column-sorters {
      padding-bottom: 0;
    }

    .ant-tooltip-open {
      background-color: transparent;
    }

    .ant-table-column-sort {
      background-color: ${props => props.rowBackgroundColor ?? '#282c34'};
      filter: brightness(85%);
    }

    .ant-table-column-has-sorters:hover {
      background: ${props => props.rowBackgroundColor ?? '#282c34'};
      filter: brightness(100%);
    }
  }

  .ant-table-tbody {
    .ant-table-row {
      background-color: ${props => props.rowBackgroundColor ?? '#282c34'};
      cursor: ${props => props.rowCursor} !important;
      margin-bottom: 4px !important;
      transition: all 0.7s;

      .ant-table-cell {
        font-size: 15px;
        color: ${props => (props.rowTextColor ?? 'rgb(244, 244, 244)') + '!important;'}
        line-height: 20px;
      }

      td {
        border-width: 0;
      }

      &:hover {
        filter: brightness(150%);
        transform: scale(1.006);

        td {
          background-color: ${props => props.rowBackgroundColor ?? '#282c34'};
        }
      }

      .ant-table-cell:nth-of-type(1) {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      .ant-table-cell:nth-last-of-type(1) {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }

      .ant-table-column-sort {
        background: ${props => props.rowBackgroundColor ?? '#282c34'};
      }

      &:hover {
        height: 10px;
      }
    }


    & > tr:nth-last-of-type(1) > td {
      border-bottom: none;
    }
  }

  .ant-table-empty {
    background-color: transparent;

    .ant-empty-description {
      color: ${props => (props.rowTextColor ?? 'rgb(244, 244, 244)') + '!important;'}
    }
  }

  .ant-table-placeholder:hover > td {
    background-color: transparent !important;
  }

  @media screen and (max-width: 1000px) {
    width: 100vw !important;
    overflow-x: scroll;
    position: relative;
  }
`

export default ThemeTable
