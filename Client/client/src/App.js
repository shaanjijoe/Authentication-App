import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// importing pages
import Username from './components/Username';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Register from './components/Register';
import Reset from './components/Reset';
import Password from './components/Password';
import PageNotFound from './components/PageNotFound';
// root routes
const router = createBrowserRouter ([
  {
    path: '/',
    element : <Username></Username>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/password',
    element : <Password></Password>
  },
  {
    path: '/profile',
    element: <Profile></Profile>
  },
  {
    path: '/recovery',
    element : <Recovery></Recovery>
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>
  },
  {
    path: '/reset',
    element: <Reset></Reset>
  }
])


function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App;


// App.js file runs initially in my React app so I have to call
// other functionality to this file