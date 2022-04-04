import { useMediaQuery } from '@mui/material/'
import { defaultTheme } from '.'
import { FunctionComponent } from 'react'

// eslint-disable-next-line no-unused-vars
type BreakdownHelperChildren = (isSmOrDown: boolean, isMdOrUp: boolean) => any

interface IBreakdownHelperProps {
    children: BreakdownHelperChildren
}

/**
 * Raeact functional component for expose material UI breakpoints.
 */
export const BreakdownHelper: FunctionComponent<IBreakdownHelperProps> = ({ children }) => {
    const isSmOrDown = useMediaQuery(defaultTheme.breakpoints.down('md'))

    const isMdOrUp = useMediaQuery(defaultTheme.breakpoints.up('md'))

    return children(isSmOrDown, isMdOrUp)
}

export function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}