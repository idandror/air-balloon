import { ReactJSXIntrinsicAttributes } from '@emotion/react/types/jsx-namespace';
import { Link, Typography } from '@mui/material';

import React from 'react';

const Copyright: React.FC<ReactJSXIntrinsicAttributes> = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8, mb: 4 }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://www.devalore.com/">
        Devalore LTD
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
