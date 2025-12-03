import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';

const App: React.FunctionComponent = () => {
  // For production builds, use ASSET_PATH (injected by webpack DefinePlugin)
  // For development, use empty string (no basename needed)
  const basename = process.env.NODE_ENV === 'production' && process.env.ASSET_PATH
    ? process.env.ASSET_PATH.replace(/\/$/, '') // Remove trailing slash
    : '';
  
  return (
    <Router basename={basename}>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Router>
  );
};

export default App;
