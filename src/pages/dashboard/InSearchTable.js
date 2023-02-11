import { React } from 'react';
import MainCard from "../../components/MainCard";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";



const InSearchTable = (props) => {
const long_short = props.position_type.charAt(0).toUpperCase()+props.position_type.slice(1);
const ind_bools = props.current_ind;
const currentIndVals = props.current_ind_vals;
const theme = useTheme();
  return (
    <TableContainer sx={{pb:3}}>
      <Typography variant={"h5"}>{long_short} Conditionals</Typography>
      <Table>
        <TableHead>
          <TableRow sx={{mb:-2}}>
            {Object.keys(ind_bools).map((key, index) => (
                <TableCell key={index}>{key}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {Object.keys(ind_bools).map((key, index) => (
              (ind_bools[key] === "true" ? (<TableCell sx={{backgroundColor: theme.palette.success.main}}>{currentIndVals[key]}</TableCell>
              ) : (
              <TableCell sx={{backgroundColor: theme.palette.warning.main}}>{currentIndVals[key]}</TableCell>
              )
              )))
            }
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default InSearchTable