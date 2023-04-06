import React      from 'react'
import CodeBlock  from '../site/CodeBlock.jsx'
import Link from '../site/Link.jsx'

const ConfigurationOptions = () =>
  <div>
    <h1>Configuration Options</h1>
    <p>
      You can specify the name of the module you want to create as a command
      line argument.
    </p>
    <CodeBlock language="bash">
      {`$ npx @abw/scaffold my-module-name`}
    </CodeBlock>
    <p>
      It will still prompt you to confirm the remaining configuration
      parameters. There are a number of command line options you can use to
      specify these.
    </p>

    <h2 id="help"><code className="code">-h</code> or <code className="code">--help</code> - Help</h2>
    <p>
      Add the <code className="code">-h</code> or{' '}
      <code className="code">--help</code> option for help showing a summary
      of the available options and examples of use.
    </p>
    <CodeBlock language="bash">
      {`$ npx @abw/scaffold -h
scaffold.js

  Scaffold a new project.

Usage:
  scaffold.js [options] module

Options:
  -c <file> / --config <file>   Configuration file (.json or .yaml)
  -s <dir>  / --scaffold <dir>  Scaffold directory
  -t <dir>  / --template <dir>  Template directory (in scaffold dir)
  -o <dir>  / --output <dir>    Output directory
  -d        / --dryrun          Dry run - don't create any files
  -y        / --yes             Accept all defaults
  -p        / --progress        Show progress
  -v        / --verbose         Verbose mode
  -D        / --debug           Debugging mode
  -V        / --version         Print version number
  -h        / --help            This help

Examples
  scaffold.js
  scaffold.js my-module-name
  scaffold.js -c mydata.json my-module-name
  scaffold.js -y -c mydata.json my-module-name
  scaffold.js -y -t react-lib -c mydata.json my-module-name
`}
    </CodeBlock>

    <h2 id="config"><code className="code">-c</code> or <code className="code">--config</code> - Configuration File</h2>
    <p>
      The scaffolding tool was written tool to help me create new projects.
      It has my name, github account, npm account, and other preferences
      pre-defined as the defaults. Unless you&apos;re me then you&apos;ll
      want to change this.
    </p>
    <p>
      You can always go and edit the generated files (most importantly
      the <code className="code">package.json</code>) after the event to
      correct this.  Or you can use the <code className="code">-c</code>{' '}
      or <code className="code">--config</code> option to specify a different
      configuration file.
    </p>
    <CodeBlock language="bash">
      {`## either -c <file>
npx @abw/scaffold -c /path/to/my-config.yaml my-module-name
## or --config <file>
npx @abw/scaffold --config /path/to/my-config.yaml my-module-name`}
    </CodeBlock>
    <p>
      Your configuration file can be either a YAML or JSON file and should
      contain your personal details and preferences.  It might look something
      like this:
    </p>
    <CodeBlock language="yaml">
      {`author:   Bobby Badger
githubId: BobbyBadger
npmOrg:   '@bobby'
licence:  ISC
manager:  pnpm`}
    </CodeBlock>

    <p>
      The <code className="code">author</code> field should contain your
      full name.  The <code className="code">githubId</code> is your github
      id.  This is used to automatically generate links to the github
      repository in the <code className="code">package.json</code> file.
      If you don&apos;t use github, or don&apos;t plan to store your new
      module on github then you&apos;ll need to update
      the <code className="code">package.json</code> afterwards.
      The <code className="code">npmOrg</code> is your NPM organisation
      that you publish modules under.  For example, mine
      is <code className="code">@abw</code>.  If you don&apos;t have one or
      don&apos;t plan to use it for this module then sorry, it&apos;s a case
      of having to tweak the <code className="code">package.json</code> after
      it&apos;s generated.  The <code className="code">licence</code> is the
      name of the licence that you want to use for your module.
      The <code className="code">manager</code> is your preferred package
      manager, e.g. <code className="code">npm</code>,{' '}
      <code className="code">yarn</code> or <code className="code">pnpm</code>.
    </p>
    <p>
      If you don&apos;t use github, don&apos;t plan to publish your module
      to NPM, don&apos;t have an NPM organisation, or dislike any of the
      other defaults, then you&apos;ll have to go and edit the generated
      <code className="code">package.json</code> anyway.
      Sorry, but like I said, I wrote this primarily for me to use, so
      it&apos;s set up to make my life easy and do things the way I usually
      do them.
    </p>
    <p>
      You can define any other variables in this file that you want to be
      made available to the scaffolding templates.  This is particularly
      relevant if you plan to write your own scaffolding templates.
    </p>

    <h2 id="scaffold"><code className="code">-s</code> or <code className="code">--scaffold</code> - Scaffold Directory</h2>
    <p>
      The <code>-s</code> or <code>--scaffold</code> option allows you to
      specify a path to your own set of scaffolding templates.  The default
      is to use the{' '}
      <a href="https://github.com/abw/scaffold-js/tree/master/scaffold">scaffold</a>{' '}
      directory from the <a href="https://github.com/abw/scaffold-js">scaffold-js</a>{' '}
      distribution which works fine for me, but might not for you.
    </p>
    <CodeBlock language="bash">
      {`## either -s <dir>
npx @abw/scaffold -d /path/to/my-scaffold-dir my-module-name
## or --scaffold <dir>
npx @abw/scaffold --scaffold /path/to/my-scaffold-dir my-module-name`}
    </CodeBlock>
    <p>
      See the <Link to="../custom-scaffolding" text="Custom Scaffolding"/>{' '}
      page for further information.
    </p>

    <h2 id="template"><code className="code">-t</code> or <code className="code">--template</code> - Template Directory</h2>
    <p>
      The <code>-t</code> or <code>--template</code> option allows you to
      specify which scaffolding template you want to use.  This should be a
      directory in the <a href="#scaffold">scaffold</a> directory.  If you
      don&apos;t specify this option then you will be prompted to select one
      of the available template directories.
    </p>
    <CodeBlock language="bash">
      {`## either -t <dir>
npx @abw/scaffold -t react-lib my-module-name
## or --template <dir>
npx @abw/scaffold --template react-lib my-module-name`}
    </CodeBlock>
    <p>
      You can also specify this as an absolute or relative path to another
      directory.
    </p>
    <CodeBlock language="bash">
      {`## absolute path
npx @abw/scaffold -t /path/to/my/template my-module-name
## relative path
npx @abw/scaffold -t ../path/to/my/template my-module-name`}
    </CodeBlock>
    <p>
      See the <Link to="../custom-scaffolding" text="Custom Scaffolding"/>{' '}
      page for further information.
    </p>

    <h2 id="output"><code className="code">-o</code> or <code className="code">--output</code> - Output Directory</h2>
    <p>
      The default behaviour is to write output to a directory with the same
      name as the module you specify.  This will be under the current working
      directory. If this directory already exists then it will print an error
      and exit without proceeding any further.
    </p>
    <p>
      You can use the <code className="code">-o</code> or{' '}
      <code className="code">--output</code> option to specify s different
      output directory.  The same rule as above applies - if the directory
      already exists then the script will throw its toys out of the pram and
      refuse to overwrite your existing files.
    </p>
    <CodeBlock language="bash">
      {`npx @abw/scaffold --output /path/to/my-module-name my-module-name`}
    </CodeBlock>

    <h2 id="dryrun"><code className="code">-d</code> or <code className="code">--dryrun</code> - Dry Run</h2>
    <p>
      The <code>-d</code> or <code>--dryrun</code> option enables a dry run
      of the scaffolding process.  It shows you what would have happened but
      without actually generating any output files.
    </p>
    <CodeBlock language="bash">
      {`## either -d
npx @abw/scaffold -d my-module-name
## or --dryrun
npx @abw/scaffold --dryrun my-module-name`}
    </CodeBlock>

    <h2 id="yes"><code className="code">-y</code> or <code className="code">--yes</code> - Accept Defaults</h2>
    <p>
      The <code>-y</code> or <code>--yes</code> option will automatically
      accept any default values that you haven&apos;t explicitly specified.
    </p>
    <CodeBlock language="bash">
      {`## either -y
npx @abw/scaffold -y my-module-name
## or --yes
npx @abw/scaffold --yes my-module-name`}
    </CodeBlock>

    <h2 id="progress"><code className="code">-p</code> or <code className="code">--progress</code> - Show Progress</h2>
    <p>
      The <code>-p</code> or <code>--progress</code> option shows some natty
      ASCII art charting the progress of the scaffolding process.  On my
      machine it typically runs in a fraction of a second so it&apos;s rather
      pointless.  But it&apos;s possible that you&apos;ve got a very slow
      machine or are scaffolding lots of files or very large files and want
      some visual indication of how far along the process is.
    </p>
    <CodeBlock language="bash">
      {`## either -p
npx @abw/scaffold -p my-module-name
## or --progress
npx @abw/scaffold --progress my-module-name`}
    </CodeBlock>

    <h2 id="verbose"><code className="code">-v</code> or <code className="code">--verbose</code> - Verbose Module</h2>
    <p>
      The <code>-v</code> or <code>--verbose</code> option enables verbose
      mode.  The script will output some additional information and list
      each file that is processes.
    </p>
    <CodeBlock language="bash">
      {`## either -v
npx @abw/scaffold -v my-module-name
## or --verbose
npx @abw/scaffold --verbose my-module-name`}
    </CodeBlock>

    <h2 id="debug"><code className="code">-D</code> or <code className="code">--debug</code> - Debugging Module</h2>
    <p>
      The <code>-D</code> or <code>--debug</code> option enables debugging
      mode.  The script will output lots of additional information.
    </p>
    <CodeBlock language="bash">
      {`## either -D
npx @abw/scaffold -D my-module-name
## or --debug
npx @abw/scaffold --debug my-module-name`}
    </CodeBlock>

    <h2 id="version"><code className="code">-V</code> or <code className="code">--version</code> - Print Version</h2>
    <p>
      The <code>-V</code> or <code>--version</code> option outputs the current
      version of <code>@abw/scaffold</code>
    </p>
    <CodeBlock language="bash">
      {`## either -V
npx @abw/scaffold -V
## or --version
npx @abw/scaffold --version`}
    </CodeBlock>

    <Link
      to="/custom-scaffolding" className="read-on"
      text="Custom Scaffolding..."
    />

  </div>

export default ConfigurationOptions