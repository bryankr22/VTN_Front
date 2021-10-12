import React, {useState, useEffect, Fragment} from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import { Header, Container, Table, Button, Image, Responsive, Pagination, Dimmer, Loader } from "semantic-ui-react";
import { authInitialProps } from '../../helpers/auth';

import { AUTH_URL, busquedas_api, busquedas_remove } from '../../helpers/constants';
import { useCookies } from "react-cookie"
import jwt from 'jsonwebtoken';
import axios from 'axios';
export default function mis_busquedas() {
    const [cookies, setCookie] = useCookies(['vtn_token']);
    const [busqueda, setBusqueda] = useState({
        busquedas: '',
        busquedasTotal: 0,
        page: 0
    })
    const normalize = (function() {
        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
          to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
          mapping = {};
      
        for (var i = 0, j = from.length; i < j; i++)
          mapping[from.charAt(i)] = to.charAt(i);
      
        return function(str) {
          var ret = [];
          for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
            else ret.push(c);
          }
          return ret.join("");
        };
    })();
    const pathS3 = "https://vendetunave.s3.amazonaws.com/vendetunave/images/vehiculos/";
    useEffect(() => {
        const cookie = cookies.vtn_token;
        const decoded = jwt.verify(cookie, 'vendetunave2021');
        const user_id = decoded.user.id;
        const config = {
            headers: { Authorization: `Bearer ${decoded.token_server.access_token}` }
        };
        axios.get(AUTH_URL + busquedas_api + user_id, config).then((res) => {
            if(res.status === 401) {
                window.location = '/401'
            }
            setBusqueda({...busqueda, ...res.data});
        })
    }, [])
    const [loading, setLoading] = useState(false);
    const removeSearch = (vehicle_id) => {
        setLoading(true);
        const cookie = cookies.vtn_token;
        const decoded = jwt.verify(cookie, 'vendetunave2021');
        const user_id = decoded.user.id;
        const config = {
            headers: { Authorization: `Bearer ${decoded.token_server.access_token}` }
        };
        const data = { user_id, vehicle_id }; 
        axios.post(AUTH_URL + busquedas_remove, data, config).then((res) => {
            setLoading(false);
            location.reload();
        })
        .catch((error) => {
            //console.log(error);
        });
    }
    return (
        <PublicLayout>
            <Dimmer style={{ position: "fixed" }} active={loading}>
                <Loader>Eliminando...</Loader>
            </Dimmer>   
            <Container style={{ paddingTop: 25 }} text>
                <Header as="h2">MIS BÚSQUEDAS</Header>
                {busqueda.busquedas.length > 0 && (
                <Fragment>
                    <Table>
                        <Responsive
                        {...Responsive.onlyComputer}
                        style={{ display: "contents" }}
                        >
                        <Table.Header>
                            <Table.Row>
                            <Table.HeaderCell>PRODUCTO</Table.HeaderCell>
                            <Table.HeaderCell>FECHA</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        </Responsive>
                        <Table.Body>
                        {busqueda.busquedas.map((item, index) => (
                            <Table.Row key={index}>
                            <Table.Cell style={{ verticalAlign: "inherit" }}>
                                <Header
                                as="h4"
                                image
                                style={{ margin: 0, width: "85%" }}
                                >
                                <Image
                                    src={pathS3 + item.nameImage + "." + item.extension}
                                    rounded
                                    size="massive"
                                />
                                <Header.Content
                                    style={{
                                        width: "70%",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                    }}
                                >
                                    {item.title.substr(0, 22)}
                                    <Header.Subheader style={{ fontSize: 10 }}>
                                        {item.labelCiudad}
                                    </Header.Subheader>
                                    <Responsive {...Responsive.onlyMobile}>
                                        {item.fecha}
                                    </Responsive>
                                </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell style={{ verticalAlign: "inherit" }}>
                                <Responsive
                                {...Responsive.onlyComputer}
                                {...Responsive.onlyLargeScreen}
                                >
                                    {item.fecha}
                                </Responsive>
                            </Table.Cell>
                            <Table.Cell>
                                <Button href={ "/vehiculos/detalle/" + normalize(item.title).split(" ").join("-").split("%").join("").split("?").join("").split("/").join("") + "-" + item.vehiculo_id } fluid>
                                    CONTACTAR VENDEDOR
                                </Button>
                                <Button
                                fluid
                                onClick={() => removeSearch(item.vehiculo_id)}
                                style={{ marginTop: 7 }}
                                >
                                ELIMINAR BÚSQUEDA
                                </Button>
                            </Table.Cell>
                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table>
                    {Math.ceil(busqueda.busquedasTotal / 20) > 1 && (
                        <Container fluid style={{ textAlign: "center", margin: 25 }}>
                        <Pagination
                            pointing
                            secondary
                            boundaryRange={0}
                            activePage={1}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            siblingRange={2}
                            totalPages={Math.ceil(busqueda.busquedasTotal / 20)}
                        />
                        </Container>
                    )}
                    </Fragment>
                )}
                {busqueda.busquedas.length == 0 && (
                    <Header as="h4">Aún no cuentas con publicaciones.</Header>
                )}
            </Container>
        </PublicLayout>
    )
}
mis_busquedas.getInitialProps = authInitialProps()
