'use client'

import * as runtime from 'react/jsx-runtime'
import { useMemo } from 'react'
import { mdxComponents } from './components'

interface MDXProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export const MDXContentRenderer = ({ code, components }: MDXProps) => {
  const Component = useMemo(() => {
    const fn = new Function(code)
    return fn({ ...runtime }).default
  }, [code])

  return <Component components={{ ...mdxComponents, ...components }} />
}
