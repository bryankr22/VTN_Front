import React from 'react'
import Link from 'next/link'

export default function MenuUsuario() {
    return (
        <>
            <a 
            className="nav-link menuBlack" 
            href="#" 
            id="navbarDropdownServicios" 
            role="button" 
            data-toggle="dropdown"
            style={{textAlign: 'left', lineHeight: 1}}>
                MI CUENTA
            </a>
            <div className="dropdown-menu" 
            aria-labelledby="navbarDropdownServicios"
            style={{backgroundColor: '#fff', left: 'auto', right: 0, minWidth: 175}}>
                <div className="item" href="#" style={{padding: '5px 15px'}}>
                    <span>
                        <Link
                        href="/usuario/mis_busquedas"
                        style={{ textDecoration: "none" }}
                        ><a style={{ color: '#000000de', fontSize: '1rem', fontWeight: 400 }}>Mis Busquedas</a></Link>
                    </span>
                </div>
                <div style={{borderTop: '1px solid rgba(34,36,38,.1)', margin:'.5em 0'}}></div>
                <div className="item" href="#" style={{padding: '5px 15px'}}>
                    <span>
                        <Link
                        href="/usuario/favoritos"
                        style={{ textDecoration: "none" }}
                        ><a style={{ color: '#000000de', fontSize: '1rem', fontWeight: 400 }}>Favoritos</a>
                        </Link>
                    </span>
                </div>
                <div style={{borderTop: '1px solid rgba(34,36,38,.1)', margin:'.5em 0'}}></div>
                <div className="item" href="#" style={{padding: '5px 15px'}}>
                    <span>
                        <Link
                        href="/usuario/mis_publicaciones"
                        >
                            <a style={{ color: '#000000de', fontSize: '1rem', fontWeight: 400 }}>Mis Publicaciones</a>
                        </Link>
                    </span>
                </div>
                <div style={{borderTop: '1px solid rgba(34,36,38,.1)', margin:'.5em 0'}}></div>
                <div className="item" href="#" style={{padding: '5px 15px'}}>
                    <span>
                        <Link
                        style={{ textDecoration: "none" }}
                        href="/usuario/crear_producto"
                        ><a style={{ color: '#000000de', fontSize: '1rem', fontWeight: 400 }}>Vender mi vehiculo</a>
                        </Link>
                    </span>
                </div>
                <div style={{borderTop: '1px solid rgba(34,36,38,.1)', margin:'.5em 0'}}></div>
                <div className="item" href="#" style={{padding: '5px 15px'}}>
                    <span>
                        <Link
                        style={{ textDecoration: "none" }}
                        href="/usuario/perfil"
                        ><a style={{ color: '#000000de', fontSize: '1rem', fontWeight: 400 }}>Perfil</a>
                        </Link>
                    </span>
                </div>
                <div style={{borderTop: '1px solid rgba(34,36,38,.1)', margin:'.5em 0'}}></div>
                <div className="item" href="#" style={{padding: '5px 15px'}}>
                    <span>
                        <a style={{ color: '#000000de', fontSize: '1rem', fontWeight: 400 }}>Cerrar Sesion</a>
                    </span>
                </div>
            </div>
        </>
    )
}
