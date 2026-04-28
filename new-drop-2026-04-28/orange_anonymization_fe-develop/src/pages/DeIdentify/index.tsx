import CustomizedSteppers from '@/components/business/deIdentity/CustomizedStepper';
import { Box } from '@mui/material';

const DeIdentify = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <CustomizedSteppers />
    </Box>
  );
};

export default DeIdentify;
