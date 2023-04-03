import React from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('scss', scss)
SyntaxHighlighter.registerLanguage('bash', bash)

export const CodeBlock = ({children, language='jsx'}) =>
  <div className="codeblock">
    <SyntaxHighlighter language={language} style={darcula} showLineNumbers={true}>
      {children}
    </SyntaxHighlighter>
  </div>

export default CodeBlock
