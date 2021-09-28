import { Container, Header, Table, Button, Image, Responsive, Dimmer, Loader, Tab } from 'semantic-ui-react'
import VehiculoContainer from './form_vehiculo/VehiculoContainer';
import AccesorioContainer from './form_accesorios/AccesorioContainer';
export const panes = (data) => {
    return [
        {
            menuItem: "VEHÍCULOS",
            render: () => (
                <Tab.Pane>
                    <Header as="h2">PUBLICAR VEHÍCULOS</Header>
                    <p>
                        Para publicar tu vehículo con VENDETUNAVE se requiere
                        diligenciar completamente el formulario. Una vez diligenciado
                        pasará a revisión por parte del soporte técnico, y publicado en
                        un periodo máximo de 24 horas.
                    </p>
                    <VehiculoContainer data={data} />
                </Tab.Pane>
            ),
        },
        // {
        //     menuItem: "ACCESORIOS",
        //     render: () => (
        //         <Tab.Pane>
        //             <Header as="h2">PUBLICAR ACCESORIOS</Header>
        //             <p>
        //                 Para publicar un accesorio con VENDETUNAVE se requiere
        //                 diligenciar completamente el formulario. Una vez diligenciado
        //                 pasará a revisión por parte del soporte técnico, y publicado en
        //                 un periodo máximo de 24 horas.
        //             </p>
        //             <AccesorioContainer data={data} />
        //         </Tab.Pane>
        //     ),
        // },
    ];
}
