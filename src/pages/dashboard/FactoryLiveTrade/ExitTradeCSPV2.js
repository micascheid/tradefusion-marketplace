import {React} from 'react';
import {
  Box,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import TableCellInTrade from "../TableCellInTrade";

const ExitTradeCSPV2 = (props) => {
  const currentIndVals = props.allInfo["current_ind_val"];
  const positionType = props.allInfo["live_trade"]["position"];
  const lowerPPVI = props.allInfo["current_ind_val"]["ppvi_low"];
  const higherPPVI = props.allInfo["current_ind_val"]["ppvi_high"];
  const slPrice = currentIndVals["sl_val"];
  const tpVal = currentIndVals["tp_val"];
  const tpBandBool = currentIndVals["tp_band"];
  const tpByPercentBool = currentIndVals["tp_bool"];

  return (
    <Box sx={{width: '100%'}}>
      <Typography variant={"h4"}>Stop Loss Exit Parameters</Typography>
      <TableContainer sx={{pb: 3}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rules</TableCell>
              <TableCell>Stop Lost by 2%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Values</TableCell>
              <TableCellInTrade color={false}>{slPrice}</TableCellInTrade>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant={"h4"}>Take Profit Parameters</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rules</TableCell>
              <TableCellInTrade color={tpByPercentBool}>Take Profit by %</TableCellInTrade>
              <TableCell>OR</TableCell>
              {/*<TableCell color={tpByPercentBool}>Close</TableCell>*/}
              {positionType === "short" && <TableCellInTrade color={tpByPercentBool}>Close &lt; Lower Band</TableCellInTrade>}
              {positionType === "long" && <TableCellInTrade color={tpByPercentBool}>Close &gt; Upper Band</TableCellInTrade>}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Values</TableCell>
              <TableCell>{tpVal}</TableCell>
              <TableCell>...</TableCell>
              {positionType === "short" && <TableCell>{lowerPPVI}</TableCell>}
              {positionType === "long" && <TableCell>{higherPPVI}</TableCell>}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ExitTradeCSPV2;