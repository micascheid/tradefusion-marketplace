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


const ExitTradeKrownCrossV2 = (props) => {
  const position = props.currentIndVals["live_trade"]["position"];
  let inequalityEmaFEmaM;
  let inequalityPriceEmaF;
  if (position === "long"){
    inequalityEmaFEmaM = "Ema9 < Ema21";
    inequalityPriceEmaF = "Price < Ema9";
  } else {
    inequalityEmaFEmaM = "Ema9 > Ema21";
    inequalityPriceEmaF = "Price > Ema9";
  }

  const currentIndVals = props.currentIndVals["current_ind_val"];
  const emaf = currentIndVals["ema_f"];
  const emam = currentIndVals["ema_m"];
  const emas = currentIndVals["ema_s"];
  const price = ["last_closing_price"];
  const bbwpHits = props.currentIndVals["current_ind_val"]["tp_bbwp_hits"];
  const bbwpHitsBool = bbwpHits >= 3 ? true : false;

  //bools
  const slEmaFEmam = currentIndVals["sl_emaf_lt_emam"];
  const slPEmas = currentIndVals["sl_p_lt_emas"];
  return (
    <Box sx={{width: '100%'}}>
      <Typography variant={"h4"}>Stop Loss Exit Parameters</Typography>
      <TableContainer sx={{pb:3}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rules</TableCell>
              <TableCellInTrade color={slEmaFEmam}>{inequalityEmaFEmaM}</TableCellInTrade>
              <TableCell>OR</TableCell>
              <TableCellInTrade color={slPEmas}>{inequalityPriceEmaF}</TableCellInTrade>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Values</TableCell>
              <TableCell>
                <Stack direction={"column"}>
                  <Typography>9: {emaf}</Typography>
                  <Typography>21: {emam}</Typography>
                </Stack>
              </TableCell>
              <TableCell>...</TableCell>
              <TableCell>
                <Stack direction={"column"}>
                  <Typography>Price: {price}</Typography>
                  <Typography>55: {emas}</Typography>
                </Stack>
              </TableCell>
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
              <TableCellInTrade color={bbwpHitsBool}>BBWP Hits = 3</TableCellInTrade>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Values</TableCell>
              <TableCell>{bbwpHits}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ExitTradeKrownCrossV2;