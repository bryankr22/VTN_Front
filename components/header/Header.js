import React, {useState} from 'react';
import { Dropdown, Input, Icon, Responsive, Button } from "semantic-ui-react";
import Link from 'next/link'
import Image from 'next/image'
const Header = () => {
    const [query, setQuery] = useState("");
    const handleSearch = () => {
        //console.log("click")
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

            <Responsive
            {...Responsive.onlyMobile}
            style={{ display: "contents" }}
            >
            <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Link href="/">
                <div
                className={'image-container-tablet'}
                >
                    <Image
                    layout='fill'
                    className={'imglogo'}
                    src="/images/VTN_logo_white.png"
                    />
                </div>
                </Link>
            </div>
            <Link id="link-login" href="/login">
                <h6 className="text-native">LOGIN</h6>
            </Link>
            </Responsive>
            <Responsive
            {...Responsive.onlyTablet}
            style={{ display: "contents" }}
            >
            <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Link href="/">
                <div
                className={'image-container'}
                >
                    <Image
                    layout='fill'
                    className={'imglogo'}
                    src="/images/VTN_logo_white.png"
                    />
                </div>
                </Link>
            </div>
            <Link id="link-login" href="/login">
                <h6 className="text-native">LOGIN</h6>
            </Link>
            </Responsive>
            <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
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
                                ><a style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Carros y Camionetas</a></Link>
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
                                ><a style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Motos</a></Link>
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
                                ><a style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Camiones</a></Link>
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
                                    <a style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Carros de coleccion</a>
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
                                    <a style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Otros</a>
                                </Link>
                            </span>
                        </div>
                        <div style={{borderTop: '1px solid rgb(255 255 255 / 10%)', margin:'.5em 0'}}></div>
                        <div className="item" href="#" style={{padding: 11}}><span style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Ficha Tecnica</span></div>
                        <div style={{borderTop: '1px solid rgb(255 255 255 / 10%)', margin:'.5em 0'}}></div>
                        <div className="item" href="#" style={{padding: 11}}><span style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Comparar</span></div>
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
                                href={{
                                    pathname: '/vehiculos',
                                    query: { categoria: 'accesorios' },
                                }}
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
                    
                    href={'/login'}
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
                <li className="nav-item deleteMobile" style={{ width: 250 }}>
                <Link
                id="link-login"
                href="/login"
                style={{ textDecoration: "none" }}
                >
                <h6 className="text-native" style={{ marginTop: 9 }} >
                    LOGIN
                </h6>
                </Link>
                </li>
            </ul>
            </div>
        </nav>
        </div>
    );
}
export default Header;
