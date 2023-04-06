import React      from 'react'
import CodeBlock  from '../site/CodeBlock.jsx'
import FileTree from '../site/FileTree.jsx'

const CustomScaffolding = () =>
  <div>
    <h1>Custom Scaffolding</h1>
    <p>
      You can create your own scaffolding templates and use them with the
      scaffolding tool.
    </p>
    <p>
      A typical scaffold directory might look something like this.  It is
      loosely based on the{' '}
      <a href="https://github.com/abw/scaffold-js/tree/master/scaffold">scaffold</a>{' '}
      directory from the distribution which you should peruse for further
      insight.
      Here there are are two template sets defined in the <code>src</code> directory:{' '}
      <code>react-lib</code> and <code>website</code>.
    </p>
    <FileTree
      className="dir box"
      contents={[
        {
          dir: 'scaffold',
          contents: [
            {
              dir: 'config',
              contents: [
                { file: 'vars.json' }
              ]
            },
            {
              dir: 'lib',
              contents: [
                {
                  dir: 'common',
                  contents: [
                    { file: 'package.json' },
                    { file: '...etc..' },
                  ]
                },
                {
                  dir: 'vite',
                  contents: [
                    { file: 'vite.config.js' },
                    { file: '...etc...' },
                  ]
                },
              ]
            },
            {
              dir: 'src',
              contents: [
                {
                  dir: 'react-lib',
                  contents: [
                    {
                      dir: 'config',
                      contents: [
                        { file: 'vars.json' },
                        { file: 'files.json' }
                      ]
                    },
                    {
                      dir: 'lib',
                      contents: [
                        { file: 'common-file-1.jsx' },
                        { file: '...etc...' }
                      ]
                    },
                    {
                      dir: 'src',
                      contents: [
                        { file: 'react-file1.jsx' },
                        { file: 'react-file2.jsx' },
                        { file: '...etc...' }
                      ]
                    },
                  ]
                },
                {
                  dir: 'website',
                  contents: [
                    {
                      dir: 'config',
                      contents: [
                        { file: 'vars.json' },
                        { file: 'files.json' }
                      ]
                    },
                    {
                      dir: 'lib',
                      contents: [
                        { file: 'common-file-1.html' },
                        { file: '...etc...' }
                      ]
                    },
                    {
                      dir: 'src',
                      contents: [
                        { file: 'index.html' },
                        { file: 'about.html' },
                        { file: '...etc...' }
                      ]
                    },
                  ]
                },
              ]
            }
          ]
        }
      ]}
    />

    <h2 id="scaffold">Scaffold Directory</h2>
    <p>
      The <code>-s</code> or <code>--scaffold</code> option allows you
      to specify the path to your own scaffold directory.  This should have
      three sub-directories: <code>config</code> containing configuration
      files, <code>lib</code> containing reusable template files or fragments,
      and <code>src</code> containing the templates for different module types.
      The <code>-t</code> or <code>--template</code> option is then used to
      select one of the templates from the <code>src</code> directory.
    </p>

    <h2 id="template">Template Directory</h2>
    <p>
      The <code>-t</code> or <code>--template</code> option allows you
      to specify the template to use.  This should be a directory in the{' '}
      <code>scaffold/src</code> directory.  This should also have
      three sub-directories: <code>config</code> containing configuration
      files, <code>lib</code> containing reusable template files or fragments,
      and <code>src</code> containing the template files.
    </p>

    <h2 id="variables">Custom Variables</h2>
    <p>
      The scaffold and template directories can both contain a{' '}
      <code>config/vars.(yaml|json)</code> file which defines template
      variables.
    </p>
    <p>
      Variables in the{' '}
      <code>scaffold/config/vars.(yaml|json)</code> file will be be defined
      regardless of which template you&apos;re using.  This is a good place
      to put your personal details include <code>name</code>,{' '}
      <code>githubId</code>, and so on.
    </p>
    <p>
      Variables in a{' '}
      <code>scaffold/src/&lt;template&gt;/config/vars.(yaml|json)</code> file
      will be be defined only when you&apos;re using that particular template.
      They will overwrite any variables of the same name from the more generic{' '}
      <code>scaffold/config/vars.(yaml|json)</code> file.
    </p>
    <p>
      Additional variables can be provided in a configuration file specified
      using the <code>-c</code> or <code>--config</code> option when you run
      the script.  These will take precedence over both of the above.
    </p>
    <p>
      Here&apos;s an extract from the{' '}
      <a href="https://github.com/abw/scaffold-js/blob/master/scaffold/src/react-lib/config/vars.json">config/vars.json</a> for the{' '}
      <code>react-lib</code> template.  Note how it defines things like{' '}
      <code>dependencies</code>, <code>devDependencies</code> and{' '}
      <code>scripts</code> which are
      then added into the <code>package.json</code> by the{' '}
      <a href="https://github.com/abw/scaffold-js/blob/master/scaffold/lib/common/package.json">lib/common/package.json</a>{' '}
      template in the scaffold directory.
    </p>
    <CodeBlock language="json">
      {`{
  "type": "React library",
  "dependencies": {
    "react":     "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@abw/badger-timestamp": "^1.0.4",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^14.0.0",
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "@vitejs/plugin-react": "^3.1.0",
    "eslint": "^8.37.0",
    "eslint-plugin-react": "^7.32.2",
    "jsdom": "^21.1.1",
    "react-router-dom": "^6.10.0",
    "react-syntax-highlighter": "^15.5.0",
    "sass": "^1.60.0",
    "vite": "^4.2.0",
    "vitest": "^0.29.8"
  },
  "scripts": {
    "dev": {
      "command": "vite",
      "about": "To run the development server."
    },
    "test": {
      "command": "vitest",
      "about": "To run the tests."
    },
    "build": {
      "command": "vite build",
      "about": "To build for production."
    },
    "build:docs": {
      "command": "vite build --outDir docs --config vite.docs.js",
      "about": "To build the documentation."
    },
    "preview": {
      "command": "vite preview --outDir docs --config vite.docs.js",
      "about": "To preview the documentation."
    }
  },
}
`}
    </CodeBlock>

    <h2 id="files">Custom Files</h2>
    <p>
      A template directory can contain a <code>config/files.(yaml|json)</code>{' '}
      file which lists the files that should be copied from one of the{' '}
      <code>lib</code> directories (either of the <code>scaffold/lib</code>
      or <code>scaffold/src/&lt;template&gt;/lib</code> directories) into the
      destination directory.
    </p>
    <p>
      Here&apos;s an example of a <code>files.json</code>.  It indicates that
      the <code>common/editorconfig</code> library template should be processed
      and written to the <code>.editorconfig</code> file in the destination
      directory, <code>common/eslintrc.json</code> should be process and
      written to <code>.edlintrc.json</code>, and so on.
    </p>
    <CodeBlock language="json">
      {`{
  "common/editorconfig":  ".editorconfig",
  "common/eslintrc.json": ".eslintrc.json",
  "common/package.json":  "package.json",
  "common/gitignore":     ".gitignore",
  "vite/vite.defs.js":    "vite.defs.js",
  "vite/vite.config.js":  "vite.config.js",
  "vite/vite.docs.js":    "vite.docs.js",
}`}
    </CodeBlock>
    <p>
      The source or destination in the above can be a directory. In this case
      all the files under the directory will be processed and output to the
      corresponding destination files.
    </p>

    <h2 id="source">Source Templates</h2>
    <p>
      Any additional files in the template <code>src</code> directory will also
      be process and written to the corresponding files in the destination
      directory.
    </p>
    <p>
      All templates are written using
      the <a href="https://mozilla.github.io/nunjucks/">Nunjucks</a> template
      language.
    </p>
    <p>
      Any of the defined variables can be inserted in double curly braces,
      e.g.
    </p>
    <CodeBlock>
      {`This is the README for {{name}}.`}
    </CodeBlock>

    <h2 id="library">Library Templates</h2>
    <p>
      Templates in either of the <code>lib</code> directories can be copied
      into the destination directory by being specified in
      the <code>files.(yaml|json)</code> configuration file.
    </p>
    <p>
      In addition, templates in either of the <code>lib</code> directories
      can be included into any source template.  For example, a{' '}
      <code>common/header</code> template in a <code>lib</code> directory can
      be included as:
    </p>
    <CodeBlock>
      {`{% include "common/header" %}`}
    </CodeBlock>

    <h2 id="template-variables">Template Variables</h2>
    <p>
      The default set of templates variables are:
    </p>
    <table>
      <thead>
        <tr>
          <th>Variable</th>
          <th>Example</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>author</td>
          <td>Andy Wardley</td>
          <td>Author name</td>
        </tr>
        <tr>
          <td>licence</td>
          <td>ISC</td>
          <td>Module licence</td>
        </tr>
        <tr>
          <td>npmOrg</td>
          <td>@abw</td>
          <td>NPM organisation</td>
        </tr>
        <tr>
          <td>githubId</td>
          <td>abw</td>
          <td>Github user id</td>
        </tr>
        <tr>
          <td>manager</td>
          <td>pnpm</td>
          <td>Preferred package manager</td>
        </tr>
        <tr>
          <td>name</td>
          <td>my-new-module</td>
          <td>Name for new module</td>
        </tr>
        <tr>
          <td>dist</td>
          <td>@abw/my-new-module</td>
          <td>Full distribution name (npmOrg + name)</td>
        </tr>
        <tr>
          <td>scaffold</td>
          <td>scaffold</td>
          <td>Scaffold option</td>
        </tr>
        <tr>
          <td>scaffoldDir</td>
          <td>/full/path/to/scaffold</td>
          <td>Directory object for scaffold directory</td>
        </tr>
        <tr>
          <td>template</td>
          <td>react-lib</td>
          <td>Template option</td>
        </tr>
        <tr>
          <td>templateDir</td>
          <td>/full/path/to/scaffold/src/react-lib</td>
          <td>Directory object for template directory</td>
        </tr>
        <tr>
          <td>output</td>
          <td>my-module</td>
          <td>Output option</td>
        </tr>
        <tr>
          <td>outputDir</td>
          <td>/full/path/to/my-module</td>
          <td>Directory object for output directory</td>
        </tr>
      </tbody>
    </table>
    <p>
      Any other variables defined by various configuration files will also
      be available to use.  Use the <code>-D</code> or <code>--debug</code>{' '}
      option to see all of the variable defined in any particular case.

    </p>
  </div>

export default CustomScaffolding