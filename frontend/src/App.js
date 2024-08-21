import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Index from 'views/Index';
import Login, { action as signinAction } from 'views/pages/Login';
import RootLayout from 'views/layout/Root';
import Register, { action as signupAction } from 'views/pages/Register';
import ErrorPage from 'views/pages/Error';
import { action as logoutAction } from 'views/pages/Logout';
import { checkIsAuthLoader, checkIsNotAuthLoader, tokenLoader } from './util/auth';
import { ToastContainer } from 'react-toastify';
import Profile from 'views/pages/Profile';
import Landing from 'views/pages/Landing';
import FilmDetail, { loader as filmDetailLoader } from 'views/pages/FilmDetail';
import WatchedList, { loader as ratedFilmsLoader } from 'views/pages/WatchedList';
import Recommend from 'views/pages/Recommend';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    id: 'root',
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'films',
        id: 'films',
        children: [
          {
            index: true,
            element: <Landing />,
          },
          {
            path: ':id',
            id: 'film-detail',
            loader: filmDetailLoader,
            children: [
              {
                index: true,
                element: <FilmDetail />,
              },
            ],
          },
        ],
      },
      {
        path: 'recommend',
        element: <Recommend />,
        loader: checkIsAuthLoader,
      },
      {
        path: 'my-profile',
        element: <Profile />,
        loader: checkIsAuthLoader,
      },
      {
        path: 'my-watched-list',
        id: 'my-watched-list',
        loader: ratedFilmsLoader,
        children: [{ index: true, element: <WatchedList />, loader: checkIsAuthLoader }],
      },
    ],
  },
  {
    path: '/signin',
    element: <Login />,
    errorElement: <ErrorPage />,
    id: 'login',
    loader: checkIsNotAuthLoader,
    action: signinAction,
  },
  {
    path: '/signup',
    element: <Register />,
    errorElement: <ErrorPage />,
    id: 'register',
    loader: checkIsNotAuthLoader,
    action: signupAction,
  },
  {
    path: '/logout',
    action: logoutAction,
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
