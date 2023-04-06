import React      from 'react'
import Link       from '../site/Link.jsx'
import { imgUrl } from '../site/Utils.jsx'

const Home = () =>
  <div className="">
    <h1>@abw/scaffold</h1>
    <a href="https://github.com/abw/scaffold-js" className="github">
      <img
        src="https://github.githubassets.com/favicons/favicon.svg"
        alt="Github repository"
      />
    </a>
    <div className="pic-side">
      <img src={imgUrl('scaffold-js.svg')}/>
      <div className="blurb">
        <p className="intro">
          <code className="code">@abw/scaffold</code> is a tool for scaffolding
          Javscript modules, web sites and other resources.
        </p>
        <p>
          I wrote it to help me bootstrap new Javascript projects with
          all the modules, configuration files and other paraphernalia that I
          happen to like.
        </p>
      </div>
    </div>
    <div>
      <p>
        There are many other tools available for scaffolding new modules.
        Like many of my projects, this started as a quick hack for me to use
        and grew as I added new features.  It wasn&apos;t ever intended to
        be useful to the wider community and shouldn&apos;t necessarily be
        viewed as a competitor to the many other fine scaffolding solutions
        already out there.  On the contrary, it is tailored to my specific
        requirements and taste and as such, it may not scratch your itch as
        well as it scratches mine.
      </p>
      <p>
        At the time of writing there are two inbuilt scaffolding templates,
        <code className="code">react-lib</code> for creating a new React
        library, complete with documentation website,
        and <code className="code">website</code> which will create a basic
        stand-alone React-based website.
      </p>
      <p>
        You can define your own scaffolding templates that are suited to your
        requirements and use them with this tool.
      </p>
      <Link
        to="/getting-started" className="read-on"
        text="Getting Started..."
      />
    </div>
    <div className="badger">
      <img src={imgUrl('badger.svg')} alt="badger"/>
      <div className="caption">
        Built by Badgers
      </div>
    </div>
  </div>

export default Home

