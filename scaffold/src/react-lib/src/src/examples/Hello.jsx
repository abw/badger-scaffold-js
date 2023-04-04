import React from 'react'
import Hello from '../../lib/Hello.jsx'

{/* START */}
// PRETEND: import Hello from '{{dist}}'

const HelloExample = () =>
  <>
    <Hello/>
    <Hello name="Badger Fans"/>
  </>
{/* END */}

export default HelloExample