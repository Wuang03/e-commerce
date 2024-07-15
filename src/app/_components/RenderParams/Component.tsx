'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { Message } from '../Message'

import classes from './index.module.scss'

export type Props = {
  params?: string[]
  message?: string
  className?: string
  onParams?: (paramValues: ((string | null | undefined) | string[])[]) => void
}

export const RenderParamsComponent: React.FC<Props> = ({
  params = ['error', 'warning', 'success', 'message'],
  className,
  onParams,
}) => {
  const searchParams = useSearchParams()
  const paramValues = params.map(param => searchParams?.get(param))

  useEffect(() => {
    if (paramValues.length && onParams) {
      onParams(paramValues)
    }
  }, [searchParams, onParams]) // Use searchParams here to avoid potential infinite loops

  if (paramValues.length) {
    return (
      <div className={className}>
        {paramValues.map((paramValue, index) => {
          if (!paramValue) return null

          return (
            <Message
              className={classes.renderParams}
              key={`${params[index]}-${paramValue}`} // Ensure unique key
              {...{
                [params[index]]: paramValue,
              }}
            />
          )
        })}
      </div>
    )
  }

  return null
}
