import React from 'react'
import Layout from './Layout.jsx'
import Home from '../pages/Home.jsx'
import { createBrowserRouter } from 'react-router-dom'
{%- for page in websitePages %}
import {{page.component}} from '../pages/{{page.component}}.jsx'
{%- endfor %}

export const Router = createBrowserRouter(
  [
    {
      path:     '/',
      element:  <Layout/>,
      children: [
        { path: '/', element: <Home/> },
{%- for page in websitePages %}
        { path: '{{page.url}}', element: <{{page.component}}/> }{{',' if not loop.last }}
{%- endfor %}
      ]
    },
  ],
  {
    basename: import.meta.env.BASE_URL
  }
)

export default Router