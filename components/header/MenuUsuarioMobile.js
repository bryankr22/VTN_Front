import React, { Fragment } from 'react'
import { Dropdown } from "semantic-ui-react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"
import { useDispatch } from 'react-redux';
import { updateToken } from '../../store/authSlice';
export default function MenuUsuarioMobile() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['vtn_token']);
    const CloseSession = () => {
        dispatch(updateToken(null));
        removeCookie('vtn_token', {});
        window.location = '/login'
    }
    return (
        <Dropdown.Menu scrolling>
            <Fragment>
                <Link href="/usuario/mis_busquedas">
                    <Dropdown.Item>Mis Busquedas</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
            </Fragment>
            <Fragment>
                <Link href="/usuario/favoritos">
                    <Dropdown.Item>Favoritos</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
            </Fragment>
            <Fragment>
                <Link href="/usuario/mis_publicaciones">
                    <Dropdown.Item>Mis Publicaciones</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
            </Fragment>
            <Fragment>
                <Link href="/usuario/vender-carro">
                    <Dropdown.Item>Vender mi vehiculo</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
            </Fragment>
            <Fragment>
                <Link href="/usuario/perfil">
                    <Dropdown.Item>Perfil</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
            </Fragment>
            <Fragment>
                <Dropdown.Item
                onClick={() => CloseSession()}
                >Cerrar Sesion</Dropdown.Item>
            </Fragment>
        </Dropdown.Menu>
    )
}
