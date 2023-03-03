import {Fragment, React} from 'react';
import ExitTradeKrownCross from "./ExitTradeKrownCross";
import ExitTradeKrownCrossV2 from "./ExitTradeKrownCrossV2";
import ExitTradeCSP from "./ExitTradeCSP";
import ExitTradeCSPV2 from "./ExitTradeCSPV2";
import { Box } from "@mui/material";

const ExitTradeFactory = (props) => {
  switch (props.botName) {
    case "krowncross":
      return <ExitTradeKrownCross currentIndVals={props.currentIndVals}/>
    case "krowncrossv2":
      return <ExitTradeKrownCrossV2 currentIndVals={props.currentIndVals}/>
    case "csp":
      return <ExitTradeCSP allInfo={props.currentIndVals}/>
    case "cspv2":
      return <ExitTradeCSPV2 allInfo={props.currentIndVals}/>
    default:
      return <Box>Loading...</Box>

  }
}
export default ExitTradeFactory;