import React from 'react'
import Layout from './Layout.jsx'
import Home from '../pages/Home.jsx'
import GettingStarted from '../pages/GettingStarted.jsx'
import { createBrowserRouter } from 'react-router-dom'

export const Router = createBrowserRouter(
  [
    {
      path:     '/',
      element:  <Layout/>,
      children: [
        { path: '/',               element: <Home/> },
        { path: 'getting-started', element: <GettingStarted/> },
      ]
    },
  ],
  {
    basename: import.meta.env.BASE_URL
  }
)

export default Router