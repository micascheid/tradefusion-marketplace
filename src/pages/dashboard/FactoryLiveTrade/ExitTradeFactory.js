import {Fragment, React} from 'react';
import ExitTradeKrownCross from "./ExitTradeKrownCross";
import ExitTradeCSP from "./ExitTradeCSP";
import { Box } from "@mui/material";

const ExitTradeFactory = (props) => {
  console.log("TradeFactory: ", props.botName);
  switch (props.botName) {
    case "krowncross":
      return <ExitTradeKrownCross currentIndVals={props.currentIndVals}/>
    case "csp":
      return <ExitTradeCSP allInfo={props.currentIndVals}/>
    default:
      return <Box>Loading...</Box>

  }
}
export default ExitTradeFactory;