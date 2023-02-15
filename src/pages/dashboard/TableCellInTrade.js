import { React } from 'react';
import {TableCell} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import palette from "../../themes/palette";

const TableCellInTrade = props => {
  const theme = useTheme();
  let color = props.color ? theme.palette.success.main : theme.palette.warning.main;

  return(
    <TableCell sx={{backgroundColor: color}}>{props.children}</TableCell>
  )
}

export default TableCellInTrade;