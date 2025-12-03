import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';

const App: React.FunctionComponent = () => {
  // Get basename from environment variable (set by webpack DefinePlugin)
  // In development: empty string (no basename)
  // In production: '/updates' (for GitHub Pages)
  const basename = process.env.ASSET_PATH 
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
