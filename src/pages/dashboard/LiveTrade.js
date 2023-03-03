import {Fragment, React} from 'react';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../FirebaseConfig';
import InSearchTable from './InSearchTable';
import {
  Box, Divider,
  List,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import MainCard from "../../components/MainCard";
import Dot from "../../components/@extended/Dot";
import {useTheme} from '@mui/material/styles';
import InTradeTable from "./InTradeTable";
import ExitTrade from "./ExitTrade";
import ExitTradeFactory from "./FactoryLiveTrade/ExitTradeFactory";

const LiveTrade = (props) => {
  const theme = useTheme();
  let live_trade_bool = "false";
  // let testObj = JSON.parse(`${props.liveTradeInfo["current_ind_val"]}`);

  const live_info = props.liveTradeInfo;

  live_trade_bool = live_info["live_trade"]["in_trade"];
  const currentIndLong = live_info["current_ind_long"];
  const currentIndShort = live_info["current_ind_short"];
  const lastClosingPrice = live_info["current_ind_val"]["last_closing_price"];
  const currentIndVal = live_info["current_ind_val"];
  const liveTrade = live_info["live_trade"];
  let botName = props.botInfo.bot;
  const fl = botName.charAt(0).toUpperCase();
  botName = fl+botName.slice(1);

  return (
    <MainCard>
      <Typography variant={"h4"} sx={{pb: 3}}>{botName} Bot in Real-Time</Typography>
      <List>
        <Stack justifyContent="space-between" direction={"row"} sx={{pb: 3}}>
          <Stack spacing={1} direction={"row"} alignItems={"center"}>
            <Typography variant={"h5"}>Trade Status: </Typography>
            {live_trade_bool === "false" && <Dot size={20} color={'warning'}/>}
            {live_trade_bool === "true" && <Dot size={20} color={'success'}/>}
          </Stack>
          <Typography variant={"h5"}>Time Frame: {props.botInfo.tf}</Typography>
          <Typography variant={"h5"}>Trading Pair: {props.botInfo.pair}</Typography>
          <Typography variant={"h5"}>Last Closing Price: {lastClosingPrice}</Typography>
        </Stack>
        <Divider />
        {live_trade_bool === "false" &&
          <Fragment>
            <InSearchTable position_type={"long"} current_ind={currentIndLong} current_ind_vals={currentIndVal}/>
            <InSearchTable position_type={"short"} current_ind={currentIndShort} current_ind_vals={currentIndVal}/>
          </Fragment>
        }
        {live_trade_bool === "true" &&
          <Fragment>
            <Typography variant={"h4"}sx={{pt:3}}>Current Trade</Typography>
            <Stack direction={"column"} alignItems={"center"}>
              <InTradeTable current_ind_vals={liveTrade}/>
              <Divider/>
              <ExitTradeFactory botName={props.botInfo.bot} currentIndVals={live_info}/>
            </Stack>
          </Fragment>
        }

      </List>
    </MainCard>
  )
}

export default LiveTrade