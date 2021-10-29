import React from 'react'
import { Icon } from "semantic-ui-react";
import Link from 'next/link'

import { useCookies } from "react-cookie"
export default function MenuMobile() {
    const [cookies,] = useCookies(['vtn_token']);
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
                        style={{ backgroundColor: '#000', left: 'auto', right: 0, minWidth: 210 }}>
                        <div className="item" href="#" style={{ padding: 11 }}>
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
                        <div style={{ borderTop: '1px solid rgb(255 255 255 / 10%)', margin: '.5em 0' }}></div>
                        <div className="item" href="#" style={{ padding: 11 }}>
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
                        <div style={{ borderTop: '1px solid rgb(255 255 255 / 10%)', margin: '.5em 0' }}></div>
                        <div className="item" href="#" style={{ padding: 11 }}>
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
                        <div style={{ borderTop: '1px solid rgb(255 255 255 / 10%)', margin: '.5em 0' }}></div>
                        <div className="item" href="#" style={{ padding: 11 }}>
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
                        <div style={{ borderTop: '1px solid rgb(255 255 255 / 10%)', margin: '.5em 0' }}></div>
                        <div className="item" href="#" style={{ padding: 11 }}>
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
                        <div style={{ borderTop: '1px solid rgb(255 255 255 / 10%)', margin: '.5em 0' }}></div>
                        <div className="item" href="#" style={{ padding: 11 }}>
                            <Link
                                href="/ficha-tecnica"
                            >
                                <a
                                    onClick={() => localStorage.setItem("compareFichatecnica", "0")}
                                    style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Ficha Tecnica</a>
                            </Link>
                        </div>
                        <div style={{ borderTop: '1px solid rgb(255 255 255 / 10%)', margin: '.5em 0' }}></div>
                        <div className="item" href="#" style={{ padding: 11 }}>
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
                    <a className="nav-link menuBlack" style={{ letterSpacing: 2, textAlign: 'left', fontSize: 16 }} href="#" id="navbarDropdownServicios" role="button" data-toggle="dropdown">
                        SERVICIOS<Icon name="angle right" size="big" />
                    </a>
                    <div className="dropdown-menu"
                        aria-labelledby="navbarDropdownServicios"
                        style={{ backgroundColor: '#000', left: 'auto', right: 0, minWidth: 210 }}>
                        <div className="item" href="#" style={{ padding: 11 }}>
                            <span>
                                <Link
                                    href="/documents"
                                    style={{ textDecoration: "none" }}
                                ><a style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Documentos <span className="new-tag">Nuevo</span></a></Link>
                            </span>
                        </div>
                        <div style={{ borderTop: '1px solid rgb(255 255 255 / 10%)', margin: '.5em 0' }}></div>
                        <div className="item" href="#" style={{ padding: 11 }}>
                            <span>
                                <Link
                                    href="/servicios"
                                    style={{ textDecoration: "none" }}
                                ><a style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Recomendados</a></Link>
                            </span>
                        </div>
                        <div style={{ borderTop: '1px solid rgb(255 255 255 / 10%)', margin: '.5em 0' }}></div>
                        <div className="item" href="#" style={{ padding: 11 }}>
                            <span>
                                <Link
                                    href="/financiacion"
                                    style={{ textDecoration: "none" }}
                                ><a style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Financiacion</a>
                                </Link>
                            </span>
                        </div>
                        {/* <div style={{borderTop: '1px solid rgb(255 255 255 / 10%)', margin:'.5em 0'}}></div> */}
                        {/* <div className="item" href="#" style={{padding: 11}}>
                            <span>
                                <Link
                                href="/accesorios"
                                >
                                    <a style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: 2 }}>Accesorios</a>
                                </Link>
                            </span>
                        </div> */}
                        <div style={{ borderTop: '1px solid rgb(255 255 255 / 10%)', margin: '.5em 0' }}></div>
                        <div className="item" href="#" style={{ padding: 11 }}>
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
                        href={!cookies.vtn_token ? '/login' : '/usuario/vender-carro'}
                    >
                        <a className="nav-link" style={{ letterSpacing: 2, textAlign: 'left', fontSize: 16 }}>VENDER
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
