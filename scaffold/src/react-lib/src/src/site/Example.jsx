import React from 'react'
import CodeBlock from './CodeBlock.jsx'

export const Example = ({Element, code, children='', className=''}) => {
  const core = code
    .replace(/^[^]*?{?\/\*\s*START\s*\*\/}?\n/, '')  // remove everything up to {/* START */}
    .replace(/[\n\s]*{?\/\*\s*END\s*\*\/}?[^]*/, '') // and everything from {/* END */} onwards
    .replaceAll(/^\/\/\s*PRETEND:\s*/mg, '')         // and the // PRETEND: prefix

  return <div className={`example ${className}`}>
    { children
      ? <div className="explanation">
          {children}
        </div>
      : null
    }
    <div className="mar-t-4 code">
      <h4>Code</h4>
      <CodeBlock>{core}</CodeBlock>
    </div>
    { Element
      ? <>
          <div className="mar-t-4 output">
            <h4>Output</h4>
            <Element/>
          </div>
        </>
      : null
    }
  </div>
}

export default Example
