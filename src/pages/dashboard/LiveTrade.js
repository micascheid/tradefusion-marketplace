import {Fragment, React} from 'react';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../FirebaseConfig';
import InSearchTable from './InSearchTable';
import {
  Box,
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
  // console.log(live_info["live_trade"]);



  return (
    <MainCard>
      <Typography variant={"h4"} sx={{pb: 3}}>Bot in Real-Time</Typography>
      <List>
        <Stack spacing={2} justifyContent="space-between" direction={"row"} sx={{pb:3}}>
          <Stack spacing={2} direction={"row"} alignItems={"center"}>
            <Typography variant={"h4"}>Trade Status: </Typography>
            {live_trade_bool === "false" && <Dot size={20} color={'warning'}/>}
            {live_trade_bool === "true" && <Dot size={20} color={'success'}/>}
          </Stack>
          <Typography variant={"h4"}>Last Closing Price: {lastClosingPrice}</Typography>
        </Stack>
        {live_trade_bool === "false" &&
          <Fragment>
            <InSearchTable position_type={"long"} current_ind={currentIndLong} current_ind_vals={currentIndVal}/>
            <InSearchTable position_type={"short"} current_ind={currentIndShort} current_ind_vals={currentIndVal}/>
          </Fragment>
        }
        {live_trade_bool === "true" &&
          <InTradeTable current_ind_vals={liveTrade}/>
        }

      </List>
    </MainCard>
  )
}

export default LiveTrade