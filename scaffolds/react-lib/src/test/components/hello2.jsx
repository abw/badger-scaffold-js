import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hello2 } from '../lib/Hello2.jsx'

describe(
  'App',
  () => {
    it(
      'renders hello world',
      () => {
        render(<Hello2/>)
        // screen.debug()
        expect(screen.getByText(/Hello/)).toHaveTextContent('Hello World!')
      }
    )
    it(
      'renders name',
      () => {
        render(<Hello2 name="Badger Fans"/>)
        // screen.debug()
        expect(screen.getByText(/Hello/)).toHaveTextContent('Hello Badger Fans!')
      }
    )
  }
)