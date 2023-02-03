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
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import QuantSelectee from 'components/cards/statistics/QuantSelectee';

// assets

import TradeHistoryTable from "./TradeHistoryTable";
import AvailableQuants from "./AvailableQuants";

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


  // const fetchPost = async () =>
  // {
  //   const docRef = doc(db, "quant_names", "mica");
  //
  //   const querySnapshot = await getDoc(docRef);
  //   console.log(querySnapshot.data());
  //   // querySnapshot.forEach((doc) => {
  //   //   // doc.data() is never undefined for query doc snapshots
  //   //   console.log(doc.id, " => ", doc.data());
  //   // });
  // }
  // fetchPost().then();

  const fetchQuants = async () => {
    const querySnapshot = await getDocs(collection(db, "quant_names"));
    // querySnapshot.forEach((doc) =>{
    //   console.log(doc.id, '=>', doc.data());
    // });
    console.log()
    return querySnapshot;
  }



  return (
    <Grid container spacing={2}>
      {/* Static left side column containing populated list of bots from a qaunt */}
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <Stack>
          <Grid item>
            <Typography variant="h5">Quant Bro's Bots</Typography>
            <Box/>
          </Grid>
          <Grid item/>
          <MainCard sx={{mt: 2}} content={false}>
            <OrdersTable/>
          </MainCard>
        </Stack>
      </Grid>

      {/* Populates the first rows of cards conaining Qaunts available */}
      <Grid item xs={8}>
        {/*<Grid container justifyContent="space-between" spacing={2}>*/}
        {/*  <Grid item xs={12}>*/}
        {/*    <Typography variant="h5">Available Qaunts</Typography>*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs={12} lg={4}>*/}
        {/*    <QuantSelectee totalBots="35,000"/>*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs={12} lg={4}>*/}
        {/*    <QuantSelectee extra="35,000"/>*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs={12} lg={4}>*/}
        {/*    <QuantSelectee extra="35,000"/>*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
        <AvailableQuants quants={fetchQuants()}/>
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
