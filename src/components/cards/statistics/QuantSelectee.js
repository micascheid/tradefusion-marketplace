import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import {blueGrey} from "@mui/material/colors";

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const TOTALBOTS = "Total Bots:";
const QuantSelectee = ({ color, quantName, totalBots }) => (
    <MainCard contentSX={{ p: 2.25 }} >
        <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">
                {quantName}
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h4" color="inherit">
                        {TOTALBOTS}
                    </Typography>
                </Grid>
                {totalBots && (
                    <Grid item>
                        <Chip
                            variant="combined"
                            color={color}
                            // icon={
                            //     <>
                            //         {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                            //         {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                            //     </>
                            // }
                            label={`${totalBots}`}
                            sx={{ ml: 1.25 }}
                            size="small"
                        />
                    </Grid>
                )}
            </Grid>
        </Stack>
        <Box sx={{ pt: 2.25 }}>
            <Typography variant="caption" color="textSecondary">
                You made an extra{' '}
                <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
                    {35}
                </Typography>{' '}
                this year
            </Typography>
        </Box>
    </MainCard>
);

QuantSelectee.propTypes = {
    color: PropTypes.string,
    quantName: PropTypes.string,
    totalBots: PropTypes.string,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

QuantSelectee.defaultProps = {
    color: 'primary'
};

export default QuantSelectee;
