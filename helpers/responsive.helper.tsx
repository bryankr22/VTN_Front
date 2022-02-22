import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material/'
import { Theme } from '@mui/material'
import { defaultTheme } from '.'
import { Children, FunctionComponent, useState } from 'react'

// let theme: Theme


/* const isSmOrDown = () => {
    // theme = theme ?? useTheme()
    return false// hasMediaQuery(defaultTheme.breakpoints.down('md'))
}

const isMdOrUp = () => {
    // theme = theme ?? useTheme()
    return true // hasMediaQuery(defaultTheme.breakpoints.up('md'))
}

export {
    isSmOrDown,
    isMdOrUp
} */

type BreakdownHelperChildren = (isSmOrDown: boolean, isMdOrUp) => any;

interface   IBreakdownHelperProps {
    children: BreakdownHelperChildren
}

export const BreakdownHelper: FunctionComponent<IBreakdownHelperProps> = ({children}) =>  {
    // const [isMd, setIsMd] = useState(false)
    const isSmOrDown = useMediaQuery(defaultTheme.breakpoints.down('md'))

    const isMdOrUp =  useMediaQuery(defaultTheme.breakpoints.up('md'))

    return children(isSmOrDown, isMdOrUp)
}