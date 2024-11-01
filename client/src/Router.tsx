import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import EmployeeMain from './screens/employee/EmployeeMain';
import EmployeeInput from './screens/employee/EmployeeInput';
import Admin from './screens/admin/Admin';
import Login from './screens/auth/Login';

import SelectPages from './screens/SelectPages';
import DriveMain from './screens/driving/DriveMain';
import DriveInput from './screens/driving/DriveInput';
import StatisticsMain from './screens/statistics/StatisticsMain';
import ScheduleMain from './screens/schedule/ScheduleMain';
import { lazy } from 'react';

const Register = lazy(() => import('./screens/auth/Register'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/home',
        element: <SelectPages />,
      },
      {
        path: '/employee-status',
        element: <EmployeeMain />,
      },
      {
        path: '/driving-status',
        element: <DriveMain />,
      },
      {
        path: '/statistics',
        element: <StatisticsMain />,
      },
      {
        path: '/employee-input',
        element: <EmployeeInput />,
      },
      {
        path: '/driving-input',
        element: <DriveInput />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
      {
        path: '/schedule',
        element: <ScheduleMain />,
      },
    ],
  },
]);

export default router;
