import {React} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

// ==============================|| In Trade Table - Current Stats Header Cell ||============================== //


const InTradeTable = (props) => {

  const currentIndVal = props.current_ind_vals;
  const pnl = currentIndVal["live_pnl"];
  const position = currentIndVal["position"]
  const entryPrice = currentIndVal["price_entry"];
  const timeIn = currentIndVal["time_in"];
  const headCells = {
    'position':
      {
        val: position,
        align: 'left',
        disablePadding: false,
        label: 'Position Type'
      },
    'pnl':
      {
        val: pnl,
        align: 'left',
        disablePadding: true,
        label: 'PnL'
      },
    'entry_price':
      {
        val: entryPrice,
        align: 'left',
        disablePadding: false,
        label: 'Entry Price'
      },
    'time_in':
      {
        val: timeIn,
        align: 'left',
        disablePadding: false,
        label: 'Time In'
      },
  };

  return (
    <TableContainer sx={{pb: 3}}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(headCells).map((key, index) => (
              <TableCell key={index}>{headCells[key].label}</TableCell>
            ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {Object.keys(headCells).map((key, index) => (
              <TableCell key={index}>
                {headCells[key].val}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default InTradeTable