import React from 'react'
import { RefreshIcon } from '@heroicons/react/outline'

export default function LoaderButton({
  isLoading,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button disabled={disabled || isLoading} className={className} {...props}>
      {isLoading && (
        <RefreshIcon className="h-5 w-5 text-indigo-500 animate-spin" />
      )}
      {props.children}
    </button>
  )
}
