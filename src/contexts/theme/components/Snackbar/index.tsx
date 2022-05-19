import { OptionsObject, useSnackbar as useDefaultSnackbar } from 'notistack'
import { Snackbar } from './snackbar'
import React, { useCallback } from 'react'

export const useEnqueueSnackbar = () => {
  const { enqueueSnackbar } = useDefaultSnackbar()

  return useCallback((
    message: string,
    subMessage?: string,
    options?: OptionsObject & Partial<{ variant: 'success' | 'error' | 'warning' }>
  ) => {
    enqueueSnackbar(message, {
      ...options,
      content: key => {
        // destructure the options we need from the extended options
        // object, and provide a default case if we didn't provide any
        const { variant } = options || { variant: undefined }
        return (
          <Snackbar
            id={`${key}`}
            message={message}
            subMessage={subMessage}
            variant={variant || 'success'}
          />
        )
      },
    })
  }, [enqueueSnackbar])
}
