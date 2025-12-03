import * as React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from '@app/Dashboard/Dashboard';
import { Support } from '@app/Support/Support';
import { GeneralSettings } from '@app/Settings/General/GeneralSettings';
import { ProfileSettings } from '@app/Settings/Profile/ProfileSettings';
import { NotFound } from '@app/NotFound/NotFound';
import { ClusterSettings } from '@app/Administration/ClusterSettings/ClusterSettings';
import { Namespaces } from '@app/Administration/Namespaces/Namespaces';
import { ResourceQuotas } from '@app/Administration/ResourceQuotas/ResourceQuotas';
import { LimitRanges } from '@app/Administration/LimitRanges/LimitRanges';
import { ImageVulnerabilities } from '@app/Administration/ImageVulnerabilities/ImageVulnerabilities';
import { CustomResourceDefinitions } from '@app/Administration/CustomResourceDefinitions/CustomResourceDefinitions';
import { DynamicPlugins } from '@app/Administration/DynamicPlugins/DynamicPlugins';
import { Updates } from '@app/Administration/Updates/Updates';
import { PreflightSummary } from '@app/Administration/Updates/PreflightSummary/PreflightSummary';
import { UpgradeProgress } from '@app/Administration/Updates/UpgradeProgress/UpgradeProgress';
import { UpdateOverview } from '@app/Administration/Updates/UpdateOverview/UpdateOverview';

export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  element: React.ReactElement;
  exact?: boolean;
  path: string;
  title: string;
  routes?: undefined;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  // Default route for "/" - redirects to Updates page
  {
    element: <Navigate to="/administration/updates" replace />,
    exact: true,
    path: '/',
    title: 'PatternFly Seed | Updates',
  },
  {
    label: 'Home',
    routes: [],
  },
  {
    label: 'Favorites',
    routes: [],
  },
  {
    label: 'Ecosystem',
    routes: [],
  },
  {
    label: 'Helm',
    routes: [],
  },
  {
    label: 'Workloads',
    routes: [],
  },
  {
    label: 'Virtualization',
    routes: [],
  },
  {
    label: 'Migration for Virtualization',
    routes: [],
  },
  {
    label: 'GitOps',
    routes: [],
  },
  {
    label: 'Serverless',
    routes: [],
  },
  {
    label: 'Networking',
    routes: [],
  },
  {
    label: 'Storage',
    routes: [],
  },
  {
    label: 'Builds',
    routes: [],
  },
  {
    label: 'Pipelines',
    routes: [],
  },
  {
    label: 'Observe',
    routes: [],
  },
  {
    label: 'Compute',
    routes: [],
  },
  {
    label: 'User Management',
    routes: [],
  },
  {
    label: 'Administration',
    routes: [
      {
        element: <ClusterSettings />,
        exact: true,
        label: 'Cluster Settings',
        path: '/administration/cluster-settings',
        title: 'PatternFly Seed | Cluster Settings',
      },
      {
        element: <Namespaces />,
        exact: true,
        label: 'Namespaces',
        path: '/administration/namespaces',
        title: 'PatternFly Seed | Namespaces',
      },
      {
        element: <ResourceQuotas />,
        exact: true,
        label: 'ResourceQuotas',
        path: '/administration/resource-quotas',
        title: 'PatternFly Seed | Resource Quotas',
      },
      {
        element: <LimitRanges />,
        exact: true,
        label: 'LimitRanges',
        path: '/administration/limit-ranges',
        title: 'PatternFly Seed | Limit Ranges',
      },
      {
        element: <ImageVulnerabilities />,
        exact: true,
        label: 'Image Vulnerabilities',
        path: '/administration/image-vulnerabilities',
        title: 'PatternFly Seed | Image Vulnerabilities',
      },
      {
        element: <CustomResourceDefinitions />,
        exact: true,
        label: 'CustomResourceDefinitions',
        path: '/administration/custom-resource-definitions',
        title: 'PatternFly Seed | Custom Resource Definitions',
      },
      {
        element: <DynamicPlugins />,
        exact: true,
        label: 'Dynamic Plugins',
        path: '/administration/dynamic-plugins',
        title: 'PatternFly Seed | Dynamic Plugins',
      },
      {
        element: <Updates />,
        exact: true,
        label: 'Updates',
        path: '/administration/updates',
        title: 'PatternFly Seed | Updates',
      },
      {
        element: <PreflightSummary />,
        exact: true,
        path: '/administration/updates/preflight-summary',
        title: 'PatternFly Seed | Preflight Summary',
      },
      {
        element: <UpgradeProgress />,
        exact: true,
        path: '/administration/updates/upgrade-progress',
        title: 'PatternFly Seed | Upgrade Progress',
      },
      {
        element: <UpdateOverview />,
        exact: true,
        path: '/administration/updates/update-overview',
        title: 'PatternFly Seed | Update Overview',
      },
    ],
  },
];

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[],
);

const AppRoutes = (): React.ReactElement => (
  <Routes>
    {flattenedRoutes.map(({ path, element }, idx) => (
      <Route path={path} element={element} key={idx} />
    ))}
    <Route element={<NotFound />} />
  </Routes>
);

export { AppRoutes, routes };
