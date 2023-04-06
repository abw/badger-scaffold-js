import React from 'react'
import Link from './Link.jsx'
import { date, version } from './Utils.jsx'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'

const Sidebar = () =>
  <>
    <div className="menu">
      <h4>@abw/scaffold</h4>
      <ul className="menu">
        <li><Link to="/" end text="Home"/></li>
        <li><Link to="getting-started" text="Getting Started"/></li>
        <li>
          <Link to="configuration-options" text="Configuration Options"/>
          <Routes>
            <Route
              path="configuration-options"
              element={<ConfigMenu/>}
            />
          </Routes>
        </li>
        <li>
          <Link to="custom-scaffolding" text="Custom Scaffolding"/>
          <Routes>
            <Route
              path="custom-scaffolding"
              element={<CustomMenu/>}
            />
          </Routes>
        </li>
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

const ConfigMenu = () =>
  <ul className="submenu">
    <li><a href="#help"><code className="code">-h</code> / <code className="code">--help</code></a></li>
    <li><a href="#config"><code className="code">-c</code> / <code className="code">--config</code></a></li>
    <li><a href="#scaffold"><code className="code">-s</code> / <code className="code">--scaffold</code></a></li>
    <li><a href="#template"><code className="code">-t</code> / <code className="code">--template</code></a></li>
    <li><a href="#output"><code className="code">-o</code> / <code className="code">--output</code></a></li>
    <li><a href="#dryrun"><code className="code">-d</code> / <code className="code">--dryrun</code></a></li>
    <li><a href="#yes"><code className="code">-y</code> / <code className="code">--yes</code></a></li>
    <li><a href="#progress"><code className="code">-p</code> / <code className="code">--progress</code></a></li>
    <li><a href="#verbose"><code className="code">-v</code> / <code className="code">--verbose</code></a></li>
    <li><a href="#debug"><code className="code">-D</code> / <code className="code">--debug</code></a></li>
    <li><a href="#version"><code className="code">-V</code> / <code className="code">--version</code></a></li>
  </ul>

const CustomMenu = () =>
  <ul className="submenu">
    <li><a href="#scaffold">Scaffold Directory</a></li>
    <li><a href="#template">Template Directory</a></li>
    <li><a href="#variables">Custom Variables</a></li>
    <li><a href="#files">Custom Files</a></li>
    <li><a href="#source">Source Templates</a></li>
    <li><a href="#library">Library Templates</a></li>
    <li><a href="#template-variables">Template Variables</a></li>
  </ul>


export default Sidebar