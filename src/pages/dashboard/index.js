import {useState} from 'react';
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

for (let i=0; i < 10; i++){
  rows.push(tradeData("","","",""));
}
// ==============================|| DASHBOARD - DEFAULT ||============================== //
const DashboardDefault = () => {
  const defaultQuant = {
    id: "default", bots:
      {
        csp:
          {strat_type: "mean reversion", timeframes: ['5m', '30m', '1h'], trading_pairs: ['BTCUSDT, ETHUSD']}
      }
  };
  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');
  const [infoForTH, setInfoForTH] = useState([]);
  const [currentQuant, setQuant] = useState(defaultQuant);


  const fetchQuants = async () => {
    const querySnapshot = await getDocs(collection(db, "quant_names"));
    return querySnapshot;
  }

  const onSelectedQuant = (selectedQuant) => {
    setQuant(selectedQuant);
  }

  const thHandler = async (dict) => {
    const bn = dict["botName"];
    const queryPath = `trade_history/${dict["botName"]}/${dict["tf"]}${dict["pair"]}`
    if (dict["tf"] !== "" && dict["pair"] !== "" && dict["botName"] !== "") {
      console.log("LETS SET SOME STUFF!", dict);
      await getDocs(collection(db, queryPath))
        .then((querySnapshot) => {
          const rowData = querySnapshot.docs.map((doc, index) => (
            tradeData(index, bn, doc.data().position, doc.data().pnl)
          ));
          console.log("ROW DATA: ", rowData);
          setInfoForTH(rowData);
        })
    }
  }


  return (
    <Grid container spacing={2}>
      {/* Static left side column containing populated list of bots from a qaunt */}
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <Stack>
          <Grid item>
            <Typography variant="h5">{currentQuant.id}</Typography>
            <Box/>
          </Grid>
          <Grid item/>
          <MainCard sx={{mt: 2}} content={false}>
            <QuantsBots infoForTradeHistory={thHandler} quant={currentQuant}/>
          </MainCard>
        </Stack>
      </Grid>

      {/* Right side of the dashboard */}
      <Grid item xs={8}>
        {/* Populates the first rows of cards containing Quants available */}
        <AvailableQuants onSelectedQuant={onSelectedQuant} quants={fetchQuants()}/>
        <Box sx={{pt: 4}}/>
        {/* Live trade box */}
        {/*<Grid container spacing={2}>*/}
        {/*  <Grid item={12}>*/}
        {/*    <LiveTrade></LiveTrade>*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
        {/* TradeHistory Table */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Trade History</Typography>
          </Grid>
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
