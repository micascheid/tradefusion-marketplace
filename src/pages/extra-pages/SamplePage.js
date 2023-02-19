// material-ui
import {Divider, Typography} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
    <MainCard title="Support">
      <Typography variant="body2">
          micalinscheid@tradefusion.io
      </Typography>
      <Divider sx={{width: '100%'}}/>
      <Typography variant="body2">
        Reach out...
      </Typography>
    </MainCard>
);

export default SamplePage;
