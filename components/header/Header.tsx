import { BreakdownHelper } from '@helpers/responsive.helper'
import { defaultTheme } from '@helpers/themes.helper'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { alpha, AppBar, Box, Container, IconButton, InputBase, Link, Stack, ThemeProvider, Toolbar } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Component, KeyboardEvent } from 'react'
import { Cookies, withCookies } from 'react-cookie'
import { VTNMenu, VTNUserMenu } from './common'
import { DesktopMenu, MobileMenu } from './HeaderMenu'
import { UserMenu } from './UserMenu'

type HeaderComponentState = {
    menu: VTNMenu
    userMenu: VTNUserMenu
    mobileMenuOpened: boolean
}

const PageLogo = () => {
    return (
        <Link component='a' href='/'>
            <Box sx={{ width: 55, height: 35 }}>
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <Image
                        alt='image logo'
                        quality={50}
                        layout='fill'
                        src='/images/VTN_logo_white_mobile.png'
                    />
                </div>
            </Box>
        </Link>
    )
}

const PageSearch = () => {
    const router = useRouter()

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }))

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }))

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: (theme.transitions as any).create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }))

    const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            const query = (event.target as HTMLInputElement).value

            router.push('/vehiculos?q=' + query)
        }
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Buscar..."
                inputProps={{ 'aria-label': 'search' }}
                onKeyUp={handleSearch}
            />
        </Search>
    )
}


class Header extends Component<{ cookies: Cookies }, HeaderComponentState> {
    state: Readonly<HeaderComponentState> = {
        mobileMenuOpened: false,
        menu: {
            home: {
                label: 'Home',
                link: '/'
            },
            vehicles: {
                label: 'Vehículos',
                submenu: [
                    {
                        label: 'Carros y Camionetas',
                        link: '/vehiculos',
                        query: { categoria: "carros" }
                    },
                    {
                        label: 'Motos',
                        link: '/vehiculos',
                        query: { categoria: "motos" }
                    },
                    {
                        label: 'Camiones',
                        link: '/vehiculos',
                        query: { categoria: "camiones" }
                    },
                    {
                        label: 'Carros de coleccion',
                        link: '/vehiculos',
                        query: { categoria: "carros_colleccion" }
                    },
                    {
                        label: 'Otros',
                        link: '/vehiculos',
                        query: { categoria: "otros" }
                    },
                    {
                        label: 'Ficha técnica',
                        link: '/ficha-tecnica'
                    },
                    {
                        label: 'Comparar',
                        link: '/comparar'
                    },
                ]
            },
            services: {
                label: 'Servicios',
                submenu: [
                    {
                        label: 'Documentos',
                        link: '/documentos'
                    },
                    {
                        label: 'Recomendados',
                        link: '/servicios'
                    },
                    {
                        label: 'Financiación',
                        link: '/financiacion'
                    },

                    {
                        label: 'Concesionarios',
                        link: '/concesionarios'
                    },
                ]
            },
            community: {
                label: 'Comunidad',
                link: '/comunidad',
            },
            sell: {
                label: 'Vender',
                link: '/usuario/vender-carro',
            }
        },
        userMenu: {
            userSearchHistory: {
                label: 'Mis Busquedas',
                link: '/usuario/mis_busquedas',
            },
            favorites: {
                label: 'Favoritos',
                link: '/usuario/favoritos',
            },
            userPublications: {
                label: 'Mis Publicaciones',
                link: '/usuario/mis_publicaciones',
            },
            sellAVehicle: {
                label: 'Vender mi vehiculo',
                link: '/usuario/vender-carro',
            },
            profile: {
                label: 'Perfil',
                link: '/usuario/perfil',
            },
            closeSession: {
                label: 'Cerrar Sesion',
                action: 'closeSession'
            },
        }
    }



    private handleOpenMobileMenu() {
        this.setState({
            mobileMenuOpened: !this.state.mobileMenuOpened
        })
    }

    constructor(props) {
        super(props)

        this.handleOpenMobileMenu = this.handleOpenMobileMenu.bind(this)
    }

    render() {
        const {
            mobileMenuOpened,
            menu,
            userMenu,
        } = this.state

        return (
            <ThemeProvider theme={defaultTheme} >
                <BreakdownHelper>
                    {(isSmOrDown, isMdOrUp) => (
                        <AppBar sx={{ height: 'auto' }} position="static">
                            <Container maxWidth="xl">
                                <Toolbar disableGutters>
                                    {isMdOrUp &&
                                        <Stack
                                            sx={{ width: '100%', py: 2 }}
                                            direction="row" alignContent='center'
                                            alignItems='center'
                                            justifyContent='center'
                                            spacing={2}
                                        >
                                            <PageLogo></PageLogo>
                                            <DesktopMenu menu={menu}></DesktopMenu>
                                            <PageSearch></PageSearch>
                                            <UserMenu menu={userMenu}></UserMenu>
                                        </Stack>
                                    }
                                    {isSmOrDown &&
                                        <Stack sx={{ width: '100%', py: 0.5 }} direction='column'>
                                            <Stack
                                                sx={{ width: '100%' }}
                                                direction="row" alignContent='center'
                                                alignItems='center'
                                                justifyContent='space-between'>
                                                <IconButton
                                                    size="large"
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="open drawer"
                                                    sx={{
                                                        mr: 2,
                                                        borderRadius: 5,
                                                        '&:focus': {
                                                            outline: 'none'
                                                        }
                                                    }}
                                                    onClick={this.handleOpenMobileMenu}>
                                                    <MenuIcon fontSize='large' />
                                                </IconButton>
                                                <PageLogo></PageLogo>
                                                <UserMenu menu={userMenu}></UserMenu>
                                            </Stack>
                                            <MobileMenu menu={menu} opened={mobileMenuOpened}></MobileMenu>
                                        </Stack>
                                    }
                                </Toolbar>
                            </Container>
                        </AppBar>
                    )}
                </BreakdownHelper>
            </ThemeProvider>
        )
    }
}

export default withCookies(Header)