import { alpha, AppBar, Box, Button, Container, Fade, IconButton, InputBase, List, ListItemButton, ListItemText, Menu, MenuItem, Stack, SxProps, ThemeProvider, Toolbar, Collapse, Avatar, Portal, Slide, Grow, Backdrop, ClickAwayListener } from '@mui/material'
import { MouseEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { VTNUserMenu, VTNMenuItem } from './common'
import PersonIcon from '@mui/icons-material/Person'
import { updateToken } from '../../store/authSlice'
import jwt from "jsonwebtoken"
import axios from 'axios'
import { AUTH_URL, perfil_api as profileApi } from '@helpers/constants'

const menuItemStyle: SxProps = {
    color: 'white',
    "&:hover": {
        color: 'white'
    },
    "&:focus": {
        outline: 'none'
    }
}

const UserMenu = ({ menu }: { menu: VTNUserMenu }) => {
    const [userProfileImage, setUserProfileImage] = useState<string>(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const dispatch = useDispatch()
    const [cookies, , removeCookie] = useCookies(['vtn_token'])

    const isUserLogged = () => {
        return cookies.vtn_token ? true : false
    }

    const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = (menuItem?: VTNMenuItem) => {
        if (menuItem?.action == 'closeSession') {
            closeSession()
        }

        setAnchorEl(null)
    }

    const loadUserProfileImage = async () => {
        console.log('handle')

        const cookie = cookies.vtn_token
        if (cookie) {
            const decoded = jwt.verify(cookie, "vendetunave2021") as { token_server: { access_token: string }, user: { id: string } }
            const userId = decoded.user.id
            const config = {
                headers: { Authorization: `Bearer ${decoded.token_server.access_token}` },
            }

            const response = await axios.get(AUTH_URL + profileApi + userId, config)

            if (response.status == 200) {
                const { image } = response.data as { image: string }
                setUserProfileImage(image)
            }
        }
    }

    const closeSession = () => {
        dispatch(updateToken(null))
        removeCookie('vtn_token', {})
        window.location.href = '/login'
    }

    useEffect(() => {
        loadUserProfileImage()
    }, [])

    return (
        <>
            {isUserLogged() ? <><IconButton
                onClick={handleOpenMenu}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: 40, height: 40 }} src={userProfileImage}>
                    <PersonIcon />
                </Avatar>

            </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    sx={{
                        '.MuiPaper-root': {
                            backgroundColor: 'white',
                        },
                    }}
                >
                    {Object.values(menu).map((menuItem, index) => {
                        return <MenuItem
                            key={menuItem.label + index}
                            component='a'
                            href={menuItem.link}
                            onClick={() => handleClose(menuItem)}
                            sx={{
                                py: 2,
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: 'black'
                                }
                            }}
                        >
                            {menuItem.label}
                        </MenuItem>
                    })}
                </Menu>
            </> :
                <Button
                    key='loginButton'
                    href='/login'
                    sx={menuItemStyle}
                >
                    Login
                </Button>
            }
        </>
    )
}

/* const MobileUserMenu = ({ menu }: { menu: VTNUserMenu }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const dispatch = useDispatch()
    const [cookies, , removeCookie] = useCookies(['vtn_token'])

    const isUserLogged = () => {
        return cookies.vtn_token ? true : false
    }

    const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const closeSession = () => {
        dispatch(updateToken(null))
        removeCookie('vtn_token', {})
        window.location.href = '/login'
    }

    const handleAction = (menuItem: VTNMenuItem) => {
        if (menuItem.action == 'closeSession') {
            closeSession()
        }
    }

    return (
        <>
            {isUserLogged() ? <IconButton
                onClick={handleOpenMenu}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: 40, height: 40 }}>
                    <PersonIcon />
                </Avatar>
            </IconButton> :
                <Button
                    key='loginButton'
                    href='/login'
                    sx={menuItemStyle}
                >
                    Login
                </Button>
            }

            <Portal>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}>
                    <Grow in={open} style={{ transformOrigin: '100% 0 50%' }} mountOnEnter unmountOnExit>
                        <Box sx={{
                            position: 'absolute',
                            padding: 'inherit',
                            margin: 'inherit',
                            float: 'right',
                            top: 0,
                            right: 0,
                            zIndex: 999,
                            marginTop: '-40vh',
                            marginRight: '-45vh',
                            borderRadius: '100%',
                            border: '1px solid white',
                            width: '100vh',
                            height: '100vh',
                            backgroundColor: 'black',
                            color: 'white'
                        }}>
                            <Box
                                sx={{
                                    width: '50vh',
                                    height: '60vh',
                                    marginLeft: '5vh',
                                    marginTop: '15vh',
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                }}
                            >

                                <List sx={{
                                    m: 4,
                                    position: 'absolute',
                                    right: 0,
                                    width: '75%',
                                }} component="div" disablePadding>
                                    {Object.values(menu).map((menuItem, index) => {
                                        return <ListItemButton
                                            sx={{
                                                pl: 4,
                                                textAlign: 'right',
                                                '&:hover': {
                                                    color: 'white'
                                                }
                                            }}
                                            key={menuItem.label + index}
                                            component='a'
                                            href={menuItem.link}
                                            onClick={() => handleAction(menuItem)}
                                        >
                                            <ListItemText primaryTypographyProps={{ fontSize: '1.5rem' }} primary={menuItem.label} />
                                        </ListItemButton>
                                    })}
                                </List>
                            </Box>
                        </Box>
                    </Grow>
                </Backdrop>
            </Portal>
        </>
    )
} */

export {
    UserMenu,
}