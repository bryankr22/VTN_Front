import { Button, Collapse, Fade, List, ListItemButton, ListItemText, Menu, MenuItem, MenuItemProps, Stack, SxProps } from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { forwardRef, MouseEvent, useMemo, useState } from 'react'
import { VTNMenu } from './common'
import NextLink, { LinkProps } from 'next/link'

const DesktopMenu = ({ menu }: { menu: VTNMenu }) => {
    const menuItemStyle: SxProps = {
        color: 'white',
        letterSpacing: 2,
        textTransform: 'uppercase',
        "&:hover": {
            color: 'white'
        },
        "&:focus": {
            outline: 'none'
        }
    }

    return (
        <Stack direction='row' spacing={2}>
            {Object.values(menu).map((menuItem, index) => {
                if (menuItem.link) {
                    return <Button
                        key={menuItem.label + index}
                        href={menuItem.link}
                        sx={menuItemStyle}
                    >
                        {menuItem.label}
                    </Button>
                } else {
                    const [anchorEl, setAnchorEl] = useState(null)
                    const open = Boolean(anchorEl)

                    const handleOpenSubmenu = (event: MouseEvent<HTMLButtonElement>) => {
                        setAnchorEl(event.currentTarget)
                    }

                    const handleClose = () => {
                        setAnchorEl(null)
                    }

                    return (<>
                        <Button
                            key={menuItem.label + index}
                            onClick={handleOpenSubmenu}
                            sx={menuItemStyle}
                        >
                            {menuItem.label}
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            sx={{
                                '.MuiPaper-root': {
                                    backgroundColor: 'black',
                                },
                            }}
                        >
                            {menuItem.submenu.map((menuItem, index) => {
                                return <MenuItem
                                    key={menuItem.label + index}
                                    onClick={handleClose}
                                    sx={{
                                        py: 2,
                                        borderBottom: '1px solid rgb(255 255 255 / 10%)',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'black',
                                            color: 'white'
                                        }
                                    }}
                                >
                                    <NextLink
                                        href={{
                                            pathname: menuItem.link,
                                            query: menuItem.query
                                        }}>
                                        <a
                                            style={{
                                                textDecoration: 'none',
                                                color: 'white'
                                            }}
                                        >
                                            {menuItem.label}
                                        </a>
                                    </NextLink>
                                </MenuItem>
                            })}
                        </Menu>
                    </>)
                }
            })}
        </Stack>
    )
}

const MobileMenu = ({ menu, opened, closeHeader }: { menu: VTNMenu, opened: boolean, closeHeader: () => void }) => {
    return (
        <Collapse in={opened} timeout="auto" unmountOnExit>
            <List
                sx={{
                    width: '100%',
                    backgroundColor: 'black',
                    color: 'white'
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {Object.values(menu).map((menuItem, index) => {
                    if (menuItem.link) {
                        return <ListItemButton
                            sx={{
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                '&:hover': {
                                    backgroundColor: 'black',
                                    color: 'white'
                                }
                            }}
                            key={menuItem.label + index + '_menu'}
                            component='a'
                            href={menuItem.link}
                        >
                            <ListItemText primary={menuItem.label} />
                        </ListItemButton>
                    } else {
                        const [open, setOpen] = useState(false)

                        const handleClick = () => {
                            setOpen(!open)
                        }

                        const handleItemClick = () =>??{
                            setOpen(false)
                            closeHeader()
                        }

                        return <>
                            <ListItemButton onClick={handleClick}>
                                <ListItemText sx={{ 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '2px',
                                    fontSize: '1.3rem'
                                }} primary={menuItem.label} />
                                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {menuItem.submenu.map((menuItem, index) => {
                                        return <ListItemButton
                                            sx={{
                                                pl: 4,
                                                letterSpacing: '2px',
                                                borderBottom: '1px solid rgb(255 255 255 / 10%)',
                                                '&:hover': {
                                                    backgroundColor: 'black',
                                                    color: 'white'
                                                }
                                            }}
                                            key={menuItem.label + index + '_submenu'}
                                        >
                                            <NextLink href={{
                                                pathname: menuItem.link,
                                                query: menuItem.query
                                            }} >
                                                <ListItemText primary={menuItem.label} onClick={handleItemClick} />
                                            </NextLink>
                                        </ListItemButton>
                                    })}
                                </List>
                            </Collapse>
                        </>
                    }
                })}
            </List>
        </Collapse>
    )
}

export {
    DesktopMenu,
    MobileMenu,
}
