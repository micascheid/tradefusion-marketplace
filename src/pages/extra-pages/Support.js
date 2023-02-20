// material-ui
import {Divider, Stack, Typography} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Support = () => (
    <MainCard title="Support">
      <Stack direction={"row"} spacing={2}>
        <Typography variant="h6">
          Email:
        </Typography>
        <Typography sx={{}}variant="h6">
          micalinscheid@tradefusion.io
        </Typography>
      </Stack>
      <Stack direction={"row"} spacing={2}>
        <Typography variant="h6">
          Slack:
        </Typography>
        <Typography variant="h6">
          @Mica Linscheid
        </Typography>
      </Stack>
      <Divider sx={{width: '100%'}}/>
    </MainCard>
);

export default Support;
