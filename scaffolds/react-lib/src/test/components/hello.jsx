import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hello } from '../../lib/Hello.jsx'

describe(
  'App',
  () => {
    it(
      'renders hello world',
      () => {
        render(<Hello/>)
        screen.debug()
        expect(screen.getByText(/Hello/)).toHaveTextContent('Hello World!')
      }
    )
    it(
      'renders name',
      () => {
        render(<Hello name="Badger Fans"/>)
        screen.debug()
        expect(screen.getByText(/Hello/)).toHaveTextContent('Hello Badger Fans!')
      }
    )
  }
)