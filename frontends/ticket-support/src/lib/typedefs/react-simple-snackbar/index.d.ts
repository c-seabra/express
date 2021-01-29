declare module 'react-simple-snackbar' {
  import { CSSProperties, ReactElement, ReactNode } from 'react'

  export default function SnackbarProvider({ children }: { children: ReactNode }): ReactElement

  type SnackbarPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'

  export type SnackbarOptions = {
    closeStyle?: CSSProperties
    position?: SnackbarPosition
    style?: CSSProperties
  }

  export function useSnackbar(
    options?: SnackbarOptions
  ): [(node: ReactNode, duration?: number) => void, () => void]

  type InjectedSnackbarProps = {
    closeSnackbar: () => void
    openSnackbar: (node: ReactNode, duration?: number) => void
  }

  export function withSnackbar<P>(
    component: ReactElement<P>,
    options?: SnackbarOptions
  ): ReactElement<P & InjectedSnackbarProps>
}
