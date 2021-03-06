import React, {useState, useEffect} from 'react'
import { Image, Container, Input, Card, Select, Grid, Pagination } from "semantic-ui-react";

export default function ListadoAccesorios({params, vehiculos, page, totalRecords}) {
    const pathS3 = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x300/vendetunave/images/accesorios/";
    const filter = [
        { key: 0, value: 0, text: "Más reciente" },
        { key: 1, value: 1, text: "Nuevo" },
        { key: 2, value: 2, text: "Usado" },
        { key: 3, value: 3, text: "Precio más bajo" },
        { key: 4, value: 4, text: "Precio más alto" },
    ];
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
    const insertParam = (key, value) => {
        key = encodeURIComponent(key);
        value = encodeURIComponent(value);
        var kvp = document.location.search.substr(1).split('&');
        let i=0;
        for(; i<kvp.length; i++){
            if (kvp[i].startsWith(key + '=')) {
                let pair = kvp[i].split('=');
                pair[1] = value;
                kvp[i] = pair.join('=');
                break;
            }
        }
        if(i >= kvp.length){
            kvp[kvp.length] = [key,value].join('=');
        }
        let params = kvp.join('&');
        document.location.search = params;
    }
    const handlePaginationChange = (e, { activePage }) => {
        insertParam('page', activePage);
    }
    const handleChangeFilter = (e, { value }) => {
        insertParam('orden', value);
    }
    //useEffect
    return (
        <Grid.Column width={13}>
            <Container fluid style={{ textAlign: "center", margin: 10 }}>
                <Grid>
                    <Grid.Column width={12}>
                        <Input
                            style={{ width: "100%" }}
                            action={{
                                icon: "search",
                                onClick: () => this.filterChange(0),
                            }}
                            placeholder="Buscar..."
                        />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Select
                            onChange={handleChangeFilter}
                            value={parseInt(params.orden)}
                            fluid
                            placeholder="Ordenar por..."
                            search
                            options={filter}
                        />
                    </Grid.Column>
                </Grid>
            </Container>
            {vehiculos.length === 0 && (
            <p
                style={{
                    textAlign: "center",
                    marginTop: "25%",
                    fontSize: 24,
                }}
            >
                No encontramos resultados
            </p>
            )}
            {vehiculos.length > 0 && (
            <Card.Group itemsPerRow={4}>
                {vehiculos.map((item, index) => (
                <Card
                    key={index}
                    as='a'
                    style={{ textDecoration: "none" }}
                    href={ "/accesorios/detalle/" + normalize(item.title) .split(" ") .join("-") .split("%") .join("") .split("?") .join("") .split("/") .join("") + "-" + item.id }
                >
                    <Image
                        src={pathS3 + item.nameImage + "." + item.extension}
                        wrapped
                        ui={false}
                    />
                    <Card.Content>
                        <Card.Description
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                marginBottom: 7,
                            }}
                        >
                            {item.title}
                        </Card.Description>
                        <Card.Header>
                            $ {new Intl.NumberFormat("de-DE").format(item.precio)} COP
                        </Card.Header>
                        <Card.Description>
                            {item.ano} -{" "}
                            {new Intl.NumberFormat("de-DE").format(item.kilometraje)} KM
                        </Card.Description>
                    </Card.Content>
                </Card>
                )
                )}
            </Card.Group>
            )}
            {Math.ceil(totalRecords / 20) > 1 && (
                <Container fluid style={{ textAlign: "center", margin: 25 }}>
                    <Pagination
                        pointing
                        secondary
                        boundaryRange={0}
                        activePage={parseInt(page)}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={2}
                        onPageChange={handlePaginationChange}
                        totalPages={Math.ceil(totalRecords / 20)}
                    />
                </Container>
            )}
        </Grid.Column>
    )
}
