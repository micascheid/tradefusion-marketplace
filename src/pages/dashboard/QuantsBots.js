import PropTypes from 'prop-types';
import {Fragment, useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import {KeyboardArrowDown, KeyboardArrowRight} from '@mui/icons-material';
// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import {blueGrey} from "@mui/material/colors";

import {useTheme} from '@mui/material/styles';


const botsData = (botName, strat_type, timeframes, trading_pairs, about_bot) => {
  return {botName, strat_type, timeframes, trading_pairs, about_bot}
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [{
  id: 'collapsable', align: 'left', disablePadding: true, label: ''
}, {
  id: 'botName', align: 'left', disablePadding: true, label: 'Bot'
}, {
  id: 'strat_type', align: 'left', disablePadding: true, label: 'Strategy Type'
}, {
  id: 'timeframes', align: 'right', disablePadding: true, label: 'Timeframes'
},];

const infoForTradeHistory = {};

// ==============================|| ORDER TABLE - HEADER ||============================== //

function QuantsBotsTableHead({order, orderBy}) {
  return (<TableHead>
    <TableRow>
      {headCells.map((headCell) => (<TableCell
        key={headCell.id}
        align={headCell.align}
        padding={"checkbox"}
        // padding={headCell.disablePadding ? 'none' : 'normal'}
        sortDirection={orderBy === headCell.id ? order : false}
      >
        {headCell.label}
      </TableCell>))}
    </TableRow>
  </TableHead>);
}

QuantsBotsTableHead.propTypes = {
  order: PropTypes.string, orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({status}) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (<Stack direction="row" spacing={1} alignItems="center">
    <Dot color={color}/>
    <Typography>{title}</Typography>
  </Stack>);
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function QuantsBots(props) {
  const theme = useTheme();
  const [order] = useState('asc');
  const [orderBy] = useState('botName');
  const [selected] = useState([]);
  const [open, setOpen] = useState(-1);
  const [tfSlot, setTFSlot] = useState('');
  const [tpSlot, setTPSlot] = useState('');
  const [currentQuantName, setCurentQuantName] = useState('');
  const rows = Object.keys(props.quant.bots).map((name) => {
    return botsData(name, props.quant.bots[name].strat_type, props.quant.bots[name].timeframes, props.quant.bots[name].trading_pairs, props.quant.bots[name].about_bot)
  })

  const addTF = tf => {
    infoForTradeHistory["tf"] = tf;
    props.infoForTradeHistory(infoForTradeHistory);
    props.infoForTradeStatus(infoForTradeHistory);
    setTFSlot(tf);
  }
  const addPair = pair => {
    infoForTradeHistory["pair"] = pair;
    props.infoForTradeHistory(infoForTradeHistory);
    props.infoForTradeStatus(infoForTradeHistory);
    setTPSlot(pair);
  }

  const addBotName = botName => {
    infoForTradeHistory["tf"] = "";
    infoForTradeHistory["pair"] = "";
    setTPSlot('');
    setTFSlot('');
    infoForTradeHistory["botName"] = botName;
    props.infoForTradeHistory(infoForTradeHistory);
    props.infoForTradeStatus(infoForTradeHistory);
  }

  useEffect(() => {
    console.log("USE EFFECT IN QUANTS BOTS");
    if (props.quant.id !== currentQuantName) {
      setCurentQuantName(props.quant.id);
      setOpen(-1);
    }
  }, [currentQuantName, props.quant.id])

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  return (
    <Box>
      {currentQuantName === 'default' ? (
        <Box sx={{alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: 400}}>
          <Typography variant={"h5"}>Select a quant to get started!</Typography>
        </Box>
      ) : (
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': {whiteSpace: 'nowrap'}
          }}
        >
          <Table aria-label="collapsible table"
                 aria-labelledby="tableTitle"
                 sx={{
                   '& .MuiTableCell-root:first-of-type': {
                     pl: 2
                   }, '& .MuiTableCell-root:last-child': {
                     pr: 3
                   }
                 }}
          >
            <QuantsBotsTableHead/>
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                const isItemSelected = isSelected(row.botName);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <Fragment key={row.botName}>
                    <TableRow
                      hover
                      role="checkbox"
                      sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.botName}
                      selected={isItemSelected}
                    >
                      <TableCell>
                        <IconButton onClick={() => setOpen((open === index ? -1 : index))}>
                          {open === index ? (<KeyboardArrowDown onClick={() => addBotName(row.botName)}/>) : (
                            <KeyboardArrowRight onClick={() => addBotName(row.botName)}/>)}

                        </IconButton>
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" align="left">
                        {row.botName}
                      </TableCell>
                      <TableCell align="left">{row.strat_type}</TableCell>
                      <TableCell align="right">{row.timeframes}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        style={{whiteSpace: "normal", wordWrap: "break-word"}}
                        sx={{paddingTop: 0, paddingBottom: 0, border: 0}}>
                        <Collapse in={open === index} timeout={"auto"} unmountOnExit>
                          <Stack direction={"row"} spacing={1} alignItems={"center"} sx={{paddingTop: 3}}>
                            <Typography sx={{paddingRight: 3}}>Timeframes:</Typography>
                            {row.timeframes.map((tf) => {
                              return (<Button
                                key={tf}
                                onClick={() => addTF(tf)}
                                color={tfSlot === tf ? 'primary' : 'inherit'}
                                variant={"contained"}
                                size="medium"
                              >{tf}</Button>);
                            })}
                          </Stack>
                          <Stack direction={"row"} alignItems={"center"} spacing={1} sx={{paddingTop: 3}}>
                            <Typography sx={{paddingRight: 3}}>Trading Pairs:</Typography>
                            {row.trading_pairs.map((tp) => {
                              return (<Button
                                key={tp}
                                onClick={() => addPair(tp)}
                                color={tpSlot === tp ? 'primary' : 'inherit'}
                                variant={"contained"}
                                size="medium"
                              >{tp}</Button>);
                            })}
                          </Stack>
                          <Typography variant={"h4"} sx={{pt: 3, paddingRight: 3}}>About Bot: </Typography>
                          {/*<Stack direction={"row"} sx={{paddingTop: 3}}>*/}
                          {/*  <Typography sx={{paddingRight: 3}}>About Bot: </Typography>*/}
                          <Box sx={{pl: 1}}>
                            <Typography sx={{pt: 1, textDecoration: 'underline'}}>Idea</Typography>
                            <Typography>{row.about_bot.idea}</Typography>
                            <Typography sx={{pt: 1, textDecoration: 'underline'}}>Long Entry</Typography>
                            <Typography>{row.about_bot.long_entry}</Typography>
                            <Typography sx={{pt: 1, textDecoration: 'underline'}}>Long Take Profit</Typography>
                            <Typography>{row.about_bot.long_take_profit}</Typography>
                            <Typography sx={{pt: 1, textDecoration: 'underline'}}>Long Stop Loss</Typography>
                            <Typography>{row.about_bot.long_stop_loss}</Typography>
                            <Typography sx={{pt: 1, textDecoration: 'underline'}}>Short Entry</Typography>
                            <Typography>{row.about_bot.short_entry}</Typography>
                            <Typography sx={{pt: 1, textDecoration: 'underline'}}>Short Take Profit</Typography>
                            <Typography>{row.about_bot.short_take_profit}</Typography>
                            <Typography sx={{pt: 1, textDecoration: 'underline'}}>Short Stop Loss</Typography>
                            <Typography>{row.about_bot.short_stop_loss}</Typography>
                          </Box>
                          {/*</Stack>*/}
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </Fragment>);
              })}
            </TableBody>
          </Table>
        </TableContainer>)}
    </Box>)
}
