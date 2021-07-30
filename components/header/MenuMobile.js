import React from 'react'
import { Dropdown, Input, Icon, Button } from "semantic-ui-react";
import Link from 'next/link'
import Image from 'next/image'
import { useCookies } from "react-cookie"
export default function MenuMobile() {
    const [cookies, setCookie] = useCookies(['vtn_token']);
    return (
        <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ marginTop: 10 }}
            >
            <ul
                className="navbar-nav mr-auto"
                style={{ width: "auto", margin: "0 auto" }}
            >
                <li
                className="nav-item"
                >
                <Link
                    href="/"
                >
                    <a className="nav-link" style={{ letterSpacing: 2, textAlign: 'left', fontSize: 16 }}>HOME
                    </a>
                </Link>
                </li>
                <li
                className="nav-item dropdown"
                >
                    <a className="nav-link menuBlack" style={{ letterSpacing: 2, textAlign: 'left', fontSize: 16 }} href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown">
                        VEH&Iacute;CULOS<Icon name="angle right" size="big" />
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
                    <a className="nav-link menuBlack" style={{ letterSpacing: 2, textAlign: 'left', fontSize: 16 }} href="#" id="navbarDropdownServicios" role="button" data-toggle="dropdown">
                        SERVICIOS<Icon name="angle right" size="big" />
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
                    <a className="nav-link" style={{ letterSpacing: 2, textAlign: 'left', fontSize: 16 }}>COMUNIDAD
                    </a>
                </Link>
                </li>

                <li
                className="nav-item"
                >
                <Link
                    href={!cookies.vtn_token ? '/login' : '/usuario/crear_producto'}
                >
                    <a className="nav-link" style={{ letterSpacing: 2, textAlign: 'left', fontSize: 16 }}>VENDER
                    </a>
                </Link>
                </li>
            </ul>
        </div>
    )
}
