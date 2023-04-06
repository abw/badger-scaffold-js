import React from 'react'
import Link from './Link.jsx'
import { date, version } from './Utils.jsx'

const Sidebar = () =>
  <>
    <div className="menu">
      <h4>{{name}}</h4>
      <ul className="menu">
        <li><Link to="/" end text="Home"/></li>
{%- for page in websitePages %}
        <li><Link to="{{page.url}}" end text="{{page.text}}"/></li>
{%- endfor %}
      </ul>
    </div>
    <footer>
      <div>
        Version {version}
      </div>
      <div>
        {date}
      </div>
    </footer>
  </>


export default Sidebar