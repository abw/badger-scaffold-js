import React      from 'react'
import CodeBlock  from '../site/CodeBlock.jsx'
import Link from '../site/Link.jsx'

const GettingStarted = () =>
  <div>
    <h1>Getting Started</h1>
    <p>
      You can run the <code className="code">scaffold</code> script
      using <code className="code">npx</code>.
    </p>
    <CodeBlock language="bash">
      {`npx @abw/scaffold`}
    </CodeBlock>
    <p>
      If you run it without any options then it will prompt you to enter the
      required values.
    </p>
    <CodeBlock language="bash">
      {`npx @abw/scaffold
✔ What is your module name? … my-module
✔ What template do you want to use? › react-lib
✔ What is the NPM distribution name? … @abw/my-module
✔ What package manager do you want to use? › pnpm

✔︎ All done!

Now you need to:

  $ cd my-module
  $ pnpm install

To run the development server:

  $ pnpm dev

To run the tests:

  $ pnpm test

To build the module:

  $ pnpm build

To build the documentation:

  $ pnpm build:docs
`}
    </CodeBlock>
    <Link
      to="/configuration-options" className="read-on"
      text="Configuration Options..."
    />
  </div>

export default GettingStarted