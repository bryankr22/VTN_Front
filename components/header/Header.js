import React, {useState} from 'react';
import { Dropdown, Input, Icon, Responsive, Button } from "semantic-ui-react";
import Link from 'next/link'
import Image from 'next/image'
import { useCookies } from "react-cookie"
import MenuMobile from './MenuMobile'
import MenuUsuario from './MenuUsuario'
import MenuUsuarioMobile from './MenuUsuarioMobile';

const Header = (props) => {
    const [cookies, setCookie] = useCookies(['vtn_token']);
    const [query, setQuery] = useState("");
    const handleSearch = () => {
        if ( document.getElementById("dropSearchInput").classList.contains("visible") ) {
            document.getElementById("dropSearchInput").classList.remove("visible");
        } else {
            document.getElementById("dropSearchInput").classList.add("visible");
        }
    };
    const handleKeyDown = () => {
        
    };
    const handleSubmit = () => {

    };
    return (
        <div
        className="nativeHeader"
        style={{ zIndex: 1001, background: "#000" }}
        >
        <nav className="navbar navbar-expand-lg navbar-dark navbar-native-second">
            <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <Icon color="grey" inverted name="bars" size="big" />
            </button>

            <Responsive {...Responsive.onlyMobile}
            style={{ display: "contents" }}
            >
            <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Link href="/">
                <div
                className={'image-container-tablet'}
                >
                    <Image
                    quality={50}
                    loading='lazy'
                    layout='fill'
                    className={'imglogo'}
                    src="/images/VTN_logo_white_mobile.png"
                    />
                </div>
                </Link>
            </div>
            {!cookies.vtn_token ?
            <Link id="link-login" href="/login">
                <a
                style={{
                    cursor: 'pointer'
                }}>
                    <h6 className="text-native">LOGIN</h6>
                </a>
            </Link>
            : 
            <Dropdown
                text="MI CUENTA"
                floating
                direction="left"
                labeled
                button
                style={{ marginTop: "-9px", color: "white" }}
            >
                <Dropdown.Menu>
                    <MenuUsuarioMobile />
                </Dropdown.Menu>
            </Dropdown>}
            <MenuMobile />
            </Responsive>
            <Responsive {...Responsive.onlyTablet}
            style={{ display: "contents" }}
            >
            <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Link href="/">
                <div
                className={'image-container'}
                >
                    <Image
                    quality={50}
                    loading='lazy'
                    layout='fill'
                    className={'imglogo'}
                    src="/images/VTN_logo_white_mobile.png"
                    />
                </div>
                </Link>
            </div>
            {!cookies.vtn_token ?
            <Link id="link-login" href="/login">
                <a
                style={{
                    cursor: 'pointer'
                }}>
                    <h6 className="text-native">LOGIN</h6>
                </a>
            </Link>
            : 
            <Dropdown
                text="MI CUENTA"
                floating
                direction="left"
                labeled
                button
                style={{ marginTop: "-9px", color: "white" }}
            >
                <Dropdown.Menu>
                    <MenuUsuarioMobile />
                </Dropdown.Menu>
            </Dropdown>}
            <MenuMobile />
            </Responsive>
            <Responsive {...Responsive.onlyComputer} style={{ display: "contents" }}>
            <div
            className="collapse navbar-collapse"
            style={{ marginTop: 10 }}
            >
            <ul
                className="navbar-nav mr-auto"
                style={{ width: "auto", margin: "0 auto" }}
            >
                <li className="nav-item deleteMobile">
                <Link href="/">
                    <div
                    className={'image-container'}
                    >
                        <Image
                        quality={50}
                        loading='lazy'
                        layout='fill'
                        className={'imglogo'}
                        src="/images/VTN_logo_white.png"
                        />
                    </div>
                </Link>
                </li>
                <li
                className="nav-item"
                >
                <Link
                    href="/"
                >
                    <a className="nav-link" style={{ letterSpacing: 2 }}>HOME
                    <Icon name="angle right" size="big" /></a>
                </Link>
                </li>
                <li
                className="nav-item dropdown"
                >
                    <a className="nav-link menuBlack" style={{ letterSpacing: 2 }} href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown">
                        VEH&Iacute;CULOS
                    </a>
                    <div className="dropdown-menu" 
                    aria-labelledby="navbarDropdownMenuLink"
                    style={{backgroundColor: '#000', left: 'auto', right: 0, minWidth: 210}}>
                        <div className="item" href="#" style={{padding: 11}}>
                            <span>
                                <Link
                                href={{
                                    pathname: '/vehiculos',
                                    query: { categoria: 'carros' },
                                }}
                                ><a 
                                onClick={() => localStorage.setItem("compareVehiculos", "0")}
                                style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Carros y Camionetas</a></Link>
                            </span>
                        </div>
                        <div style={{borderTop: '1px solid rgb(255 255 255 / 10%)', margin:'.5em 0'}}></div>
                        <div className="item" href="#" style={{padding: 11}}>
                            <span>
                                <Link
                                href={{
                                    pathname: '/vehiculos',
                                    query: { categoria: 'motos' },
                                }}
                                ><a 
                                onClick={() => localStorage.setItem("compareVehiculos", "0")}
                                style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Motos</a></Link>
                            </span>
                        </div>
                        <div style={{borderTop: '1px solid rgb(255 255 255 / 10%)', margin:'.5em 0'}}></div>
                        <div className="item" href="#" style={{padding: 11}}>
                            <span>
                                <Link
                                href={{
                                    pathname: '/vehiculos',
                                    query: { categoria: 'camiones' },
                                }}
                                ><a 
                                onClick={() => localStorage.setItem("compareVehiculos", "0")}
                                style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Camiones</a></Link>
                            </span>
                        </div>
                        <div style={{borderTop: '1px solid rgb(255 255 255 / 10%)', margin:'.5em 0'}}></div>
                        <div className="item" href="#" style={{padding: 11}}>
                            <span>
                                <Link
                                href={{
                                    pathname: '/vehiculos',
                                    query: { categoria: 'carros_coleccion' },
                                }}
                                >
                                    <a 
                                    onClick={() => localStorage.setItem("compareVehiculos", "0")}
                                    style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Carros de coleccion</a>
                                </Link>
                            </span>
                        </div>
                        <div style={{borderTop: '1px solid rgb(255 255 255 / 10%)', margin:'.5em 0'}}></div>
                        <div className="item" href="#" style={{padding: 11}}>
                            <span>
                                <Link
                                href={{
                                    pathname: '/vehiculos',
                                    query: { categoria: 'otros' },
                                }}
                                >
                                    <a 
                                    onClick={() => localStorage.setItem("compareVehiculos", "0")}
                                    style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Otros</a>
                                </Link>
                            </span>
                        </div>
                        <div style={{borderTop: '1px solid rgb(255 255 255 / 10%)', margin:'.5em 0'}}></div>
                        <div className="item" href="#" style={{padding: 11}}>
                            <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>
                                <Link
                                href="/ficha-tecnica"
                                >
                                    <a 
                                    onClick={() => localStorage.setItem("compareFichatecnica", "0")}
                                    style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Ficha Tecnica</a>
                                </Link>
                            </span>
                        </div>
                        <div style={{borderTop: '1px solid rgb(255 255 255 / 10%)', margin:'.5em 0'}}></div>
                        <div className="item" href="#" style={{padding: 11}}>
                            <Link
                            href="/comparar"
                            >
                                <a style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Comparar</a>
                            </Link>
                        </div>
                    </div>
                </li>
                <li
                className="nav-item dropdown"
                >
                    <a className="nav-link menuBlack" style={{ letterSpacing: 2 }} href="#" id="navbarDropdownServicios" role="button" data-toggle="dropdown">
                        SERVICIOS
                    </a>
                    <div className="dropdown-menu" 
                    aria-labelledby="navbarDropdownServicios"
                    style={{backgroundColor: '#000', left: 'auto', right: 0, minWidth: 210}}>
                        <div className="item" href="#" style={{padding: 11}}>
                            <span>
                                <Link
                                href="/servicios"
                                style={{ textDecoration: "none" }}
                                ><a style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Recomendados</a></Link>
                            </span>
                        </div>
                        <div style={{borderTop: '1px solid rgb(255 255 255 / 10%)', margin:'.5em 0'}}></div>
                        <div className="item" href="#" style={{padding: 11}}>
                            <span>
                                <Link
                                href="/financiacion"
                                style={{ textDecoration: "none" }}
                                ><a style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Financiacion</a>
                                </Link>
                            </span>
                        </div>
                        <div style={{borderTop: '1px solid rgb(255 255 255 / 10%)', margin:'.5em 0'}}></div>
                        <div className="item" href="#" style={{padding: 11}}>
                            <span>
                                <Link
                                href="/accesorios"
                                >
                                    <a style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Accesorios</a>
                                </Link>
                            </span>
                        </div>
                        <div style={{borderTop: '1px solid rgb(255 255 255 / 10%)', margin:'.5em 0'}}></div>
                        <div className="item" href="#" style={{padding: 11}}>
                            <span>
                                <Link
                                style={{ textDecoration: "none" }}
                                href="/concesionarios"
                                ><a style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Concesionarios</a>
                                </Link>
                            </span>
                        </div>
                    </div>
                </li>

                <li
                className="nav-item"
                >
                <Link
                    href="/comunidad"
                >
                    <a className="nav-link" style={{ letterSpacing: 2 }}>COMUNIDAD
                    <Icon name="angle right" size="big" /></a>
                </Link>
                </li>

                <li
                className="nav-item"
                >
                
                <Link
                    href={!cookies.vtn_token ? '/login' : '/usuario/crear_producto'}
                >
                    <a className="nav-link" style={{ letterSpacing: 2 }}>VENDER
                    <Icon name="angle right" size="big" /></a>
                </Link>
                </li>

                <li
                id="input-nav"
                style={{ margin: "0 7%", textAlign: "center" }}
                >
                <Icon
                    onClick={() => handleSearch()}
                    name="search"
                    size="large"
                    style={{ color: "#fff", marginTop: 10 }}
                />
                <Dropdown id="dropSearch" floating direction="left">
                    <Dropdown.Menu id="dropSearchInput">
                    <Input
                        onChange={(e) => setQuery({ search: e.target.value }) }
                        onKeyDown={() => handleKeyDown}
                        placeholder="Buscar..."
                    />
                    <Button
                        color="black"
                        onClick={() => handleSubmit}
                        style={{ paddingRight: 10 }}
                    >
                        <Icon style={{ opacity: 1 }} name="search" />
                    </Button>
                    </Dropdown.Menu>
                </Dropdown>
                </li>
                {!cookies.vtn_token ?
                <li className="nav-item deleteMobile" style={{ width: 250 }}>
                    <Link
                    id="link-login"
                    href="/login"
                    style={{ textDecoration: "none" }}
                    >
                    <h6 className="text-native" style={{ marginTop: 9, cursor: 'pointer' }} >
                        LOGIN
                    </h6>
                    </Link>
                </li>
                : 
                <li className="nav-item dropdown">
                    <MenuUsuario />
                </li>
                }
            </ul>
            </div>
            </Responsive>
        </nav>
        </div>
    );
}
export default Header;
