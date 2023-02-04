import { useState } from 'react';
import { collection, doc, getDoc, getDocs, firestore } from 'firebase/firestore';

import { db } from  '../../FirebaseConfig';
// material-ui
import {
  Box,
  Grid,
  Stack,
  Typography
} from '@mui/material';

// project import
import OrdersTable from './QuantsBots';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import QuantSelectee from 'components/cards/statistics/QuantSelectee';

// assets

import TradeHistoryTable from "./TradeHistoryTable";
import AvailableQuants from "./AvailableQuants";
import QuantsBots from "./QuantsBots";

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

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');
  const defaultQuant = {id: "mica", bots:
      {csp:
          {strat_type: "mean reversion", timeframes: ['5m', '30m', '1h'], trading_pairs: ['BTCUSDT, ETHUSD']}}};

  const [currentQuant, setQuant] = useState(defaultQuant);


  const fetchQuants = async () => {
    const querySnapshot = await getDocs(collection(db, "quant_names"));
    // querySnapshot.forEach((doc) =>{
    //   console.log(doc.id, '=>', doc.data());
    // });
    console.log()
    return querySnapshot;
  }

  const onSelectedQuant = (selectedQuant) => {
    setQuant(selectedQuant);
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
            <QuantsBots quant={currentQuant}/>
          </MainCard>
        </Stack>
      </Grid>

      {/* Populates the first rows of cards conaining Qaunts available */}
      <Grid item xs={8}>
        <AvailableQuants onSelectedQuant={onSelectedQuant} quants={fetchQuants()}/>
        <Box sx={{pt:4}}/>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Trade History</Typography>
          </Grid>
          <Grid item xs={12}>
            <MainCard>
              <TradeHistoryTable/>
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
