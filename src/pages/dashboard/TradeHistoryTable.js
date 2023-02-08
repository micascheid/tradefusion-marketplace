import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Box,
    Link,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';

// firestore
import { db } from '../../FirebaseConfig';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import {collection, getDocs} from "firebase/firestore";
import {isEmptyArray} from "formik";
import {useTheme} from "@mui/material/styles";

const tradeData = (time, botName, position, pnl) => {
    return { time, botName, position, pnl }
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

const headCells = [
    {
        id: 'time',
        align: 'left',
        disablePadding: false,
        label: 'Time'
    },
    {
        id: 'botName',
        align: 'center',
        disablePadding: false,
        label: 'Bot'
    },
    {
        id: 'position',
        align: 'center',
        disablePadding: true,
        label: 'Position'
    },
    {
        id: 'pnl',
        align: 'right',
        disablePadding: false,
        label: 'PnL'
    },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
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

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function TradeHistoryTable(props) {
    const [order] = useState('asc');
    const [orderBy] = useState('time');
    const [selected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const theme = useTheme();

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
    const thDBParamsCaller = () => {
        const params = props.thDBParams;
        console.log("DBPARAMS: ", params);
        console.log("Being called for TH");
        const botName = params["botName"];
        const tf = params["tf"];
        const pair = params["pair"];

        return "";
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' },
                    maxHeight: 440,
                    minHeight: 440
                }}
            >
                <Table
                    stickyHeader
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-of-type': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <OrderTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {props.thDBParams.length > 0 && stableSort(props.thDBParams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), getComparator(order, orderBy)).map((row, index) => {
                            const isItemSelected = isSelected(row.botName);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 35 }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.time}
                                    selected={isItemSelected}
                                >
                                    <TableCell component="th" id={labelId} scope="row" align="left">
                                        <Link color="secondary" component={RouterLink} to="">
                                            {row.time}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">{row.botName}</TableCell>
                                    <TableCell align="center">{row.position}</TableCell>
                                    <TableCell align="right">{row.pnl}</TableCell>
                                </TableRow>
                            );
                        })}
                        {props.thDBParams.length === 0 &&
                        <TableRow sx={{ backgroundColor: theme.palette.action.focus}}>
                            <TableCell align={"center"} colSpan={5}>
                            Select a Quant, a bot, timeframe and trading pair to see some history!
                            </TableCell>
                        </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination count={props.thDBParams.length}
                             component="div"
                             page={page}
                             rowsPerPage={rowsPerPage}
                             onPageChange={handleChangePage}
                             onRowsPerPageChange={handleChangeRowsPerPage}/>
        </Box>
    );
}
