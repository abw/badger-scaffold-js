import React      from 'react'
import Link       from '../site/Link.jsx'
import { imgUrl } from '../site/Utils.jsx'

const Home = () =>
  <div className="">
    <h1>{{dist}}</h1>
    <a href="https://github.com/{{githubId}}/{{name}}" className="github">
      <img
        src="https://github.githubassets.com/favicons/favicon.svg"
        alt="Github repository"
      />
    </a>
    <div className="pic-side">
      <img src={imgUrl('badger.svg')}/>
      <div className="blurb">
        <p className="intro">
          <code className="code">{{name}}</code> is a React library...
        </p>
        <p>
          This site was scaffolded by{' '}
          <a href="https://github.com/abw/badger-scaffold-js">badger-scaffold-js</a>.
        </p>
      </div>
    </div>
    <div>
      <ul className="large menu">
        <li>
          <Link to="getting-started" text="Getting Started"/> - adding the module
          to your project.
        </li>
      </ul>
    </div>
    <div className="badger">
      <img src={imgUrl('badger.svg')} alt="badger"/>
      <div className="caption">
        Built by Badgers
      </div>
    </div>
  </div>

export default Home

