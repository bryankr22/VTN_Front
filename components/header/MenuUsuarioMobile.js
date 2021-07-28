import React, { Fragment } from 'react'
import { Dropdown } from "semantic-ui-react";

export default function MenuUsuarioMobile() {
    return (
        <Dropdown.Menu scrolling>
            <Fragment>
                <Dropdown.Item>Mis Busquedas</Dropdown.Item>
                <Dropdown.Divider />
            </Fragment>
            <Fragment>
                <Dropdown.Item>Favoritos</Dropdown.Item>
                <Dropdown.Divider />
            </Fragment>
            <Fragment>
                <Dropdown.Item>Mis Publicaciones</Dropdown.Item>
                <Dropdown.Divider />
            </Fragment>
            <Fragment>
                <Dropdown.Item>Vender mi vehiculo</Dropdown.Item>
                <Dropdown.Divider />
            </Fragment>
            <Fragment>
                <Dropdown.Item>Perfil</Dropdown.Item>
                <Dropdown.Divider />
            </Fragment>
            <Fragment>
                <Dropdown.Item>Cerrar Sesion</Dropdown.Item>
            </Fragment>
        </Dropdown.Menu>
    )
}
