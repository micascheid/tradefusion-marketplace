import {React, useEffect, useState} from 'react';
import {collection, doc, getDoc, getDocs, firestore} from 'firebase/firestore';

import {db} from '../../FirebaseConfig';
// material-ui
import {
  Backdrop,
  Box,
  Grid,
  Stack,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import QuantSelectee from 'components/cards/statistics/QuantSelectee';

// assets

import TradeHistoryTable from "./TradeHistoryTable";
import AvailableQuants from "./AvailableQuants";
import QuantsBots from "./QuantsBots";
import LiveTrade from "./LiveTrade";
import {isEmptyArray} from "formik";
import {createTheme, useTheme} from "@mui/material/styles";

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];
const tradeData = (time, botName, position, pnl) => {
  return {time, botName, position, pnl}
}

const rows = [];

for (let i = 0; i < 10; i++) {
  rows.push(tradeData("", "", "", ""));
}
// ==============================|| DASHBOARD - DEFAULT ||============================== //
const DashboardDefault = () => {
  const defaultQuant = {
    id: "default",
    about:
        {"display_name":"Default"},
    bots:
      {
        csp:
          {
            strat_type: "mean reversion",
            timeframes: ['5m', '30m', '1h'],
            trading_pairs: ['BTCUSDT, ETHUSD'],
            about_bot: {idea: "The CSP version 2 bot is based on the PPVI (Pure Pupil Volatility Indicator) "/
              "which tries to exploit the most recent volatility by making a position"/
              "opposite of the price movement. PPVI consists of an upper and lower line to form a band",
              long_entry: "When price closes below the lower line",
              long_take_profit: "When profit is or exceeds 2% OR price closes above the upper line",
              long_stop_loss: "When loss is or exceeds 1%",
              short_entry: "When price closes above the upper line",
              short_take_profit: "When profit is or exceeds 2% OR price closes below the lower line",
              short_stop_loss: "When loss is or exceeds 1%",
            }}
      }
  };

  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');
  const [infoForTH, setInfoForTH] = useState([]);
  const [infoForLiveTrade, setInfoForLiveTrade] = useState();
  const [currentQuant, setQuant] = useState(defaultQuant);
  const [botInfo, setBotInfo] = useState({"bot":"", "tf":"", "pair":""});
  const theme = useTheme();

  const onSelectedQuant = (selectedQuant) => {
    setQuant(selectedQuant);
  }

  const thHandler = async (dict) => {
    const bn = dict["botName"];
    const tf = dict["tf"];
    const pair = dict["pair"];
    const queryPath = `trade_history/${bn}/${tf}${pair}`;
    if (tf !== "" && pair !== "" && bn !== "") {
      await getDocs(collection(db, queryPath))
        .then((querySnapshot) => {
          const rowData = querySnapshot.docs.map((doc, index) => (
            tradeData(doc.data().time_in.split('+')[0], bn, doc.data().position, doc.data().pnl)
          ));
          setInfoForTH(rowData);
        })
    }
  }

  const liveTradeHandler = async (dict) => {
    const bn = dict["botName"];
    const tf = dict["tf"];
    const pair = dict["pair"];
    const entry_name = tf + pair;
    const queryPath = `entry/${bn}`;
    if (tf !== "" && pair !== "" && bn !== "") {
      const docRef = doc(db, queryPath);
      const querySnapshot = await getDoc(docRef);
      const entryNameInfo = querySnapshot.data()[entry_name];
      setInfoForLiveTrade(entryNameInfo);
      setBotInfo({"bot": bn, "tf": tf, "pair": pair})
    }
  }


  return (
    <Grid container spacing={2}>
      {/* Static left side column containing populated list of bots from a qaunt */}
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <Stack>
          <Grid item>
            <Typography variant="h5">{currentQuant.about.display_name}</Typography>
            <Box/>
          </Grid>
          <Grid item/>
          <MainCard sx={{mt: 2}} content={false}>
            <QuantsBots infoForTradeHistory={thHandler} infoForTradeStatus={liveTradeHandler} quant={currentQuant}/>
          </MainCard>
        </Stack>
      </Grid>

      {/* Right side of the dashboard */}
      <Grid item xs={8}>
        {/* Populates the first rows of cards containing Quants available */}
        <AvailableQuants onSelectedQuant={onSelectedQuant}/>
        <Box sx={{ pt: 4}}/>

        {/*Live trade box */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {Object.is(infoForLiveTrade, undefined) &&
              <MainCard>
                <Typography variant={"h4"} sx={{pb: 3}}>Bot in Real-Time</Typography>
                <Box sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  minHeight: 400
                }}>
                  <Typography variant={"h4"}>Select a quant, bot, timeframe and pair to see some live
                    action!</Typography>
                </Box>
              </MainCard>
            }
            {!Object.is(infoForLiveTrade, undefined) &&
              <LiveTrade liveTradeInfo={infoForLiveTrade} botInfo={botInfo}/>
            }
          </Grid>
        </Grid>
        <Box sx={{pt: 4}}/>

        {/*TradeHistory Table */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MainCard>
              <TradeHistoryTable thDBParams={infoForTH}/>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    //{/* Populates the tradehistory table */}

  )
    ;
};

export default DashboardDefault;
