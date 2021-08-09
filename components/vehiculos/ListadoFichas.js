import React, {useState, useEffect} from 'react'
import { Image, Container, Input, Item, Select, Grid, Pagination, Header, Button } from "semantic-ui-react";
import { useLocalStorage } from '../../helpers/hooks/useLocalStorage';
import HeaderFicha from '../../components/comparadores/HeaderFicha';
import { useSelector, useDispatch } from 'react-redux';
import { addFicha } from '../../store/comparadorSlice';

export default function ListadoFichas({params, vehiculos, page, totalRecords}) {
    const compareList = useSelector(({ comparador }) => comparador.fichas);
    const dispatch = useDispatch();
    const [compare, setCompare] = useLocalStorage("compareFichatecnica", '0');
    const pathS3 = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x300/vendetunave/images/ficha-tecnica/";
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
    const isOnStorage = (item) => {
        return compareList.some((element) => element.id === item.id);
    }
    const addComparar = (item) => {
        if(compareList.length < 3){
            dispatch(addFicha(item))
        }else{
            setCompare('0');
        }
        return;
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
            <HeaderFicha />
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
            <Item.Group>
                <style>
                {`
                    a:hover {
                    text-decoration: none !important;
                    }
                `}
                </style>
            {vehiculos.map((item, index) => (
            <Item
            as="a"
            href={ "/ficha-tecnica/detalle/" + normalize(item.title).split(" ").join("-").split("%").join("").split("?").join("").split("/").join("") + "-" + item.id }
            style={{ marginBottom: 20 }}
            key={item.id}
          >
            <Item.Image
            size='medium'
            src={pathS3 + item.nameImage + "." + item.extension}
            alt={item.description}
            />
            <Item.Content>
              <Item.Header as='a' style={{ marginBottom: 10, marginTop: 10, fontSize: 20 }}>{item.title}</Item.Header>
              <Grid.Row>
                <Grid.Column>
                  <Grid>
                    <Grid.Row columns={2} style={{ paddingBottom: 5 }}>
                      <Grid.Column>
                        <Header
                          as="h5"
                          style={{ color: "gray", marginBottom: 0 }}
                        >
                          Precio:
                      </Header>
                        <p
                          style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 16,
                            textDecoration: 'none',
                            color: 'black'
                          }}
                        >
                          $ {new Intl.NumberFormat("de-DE").format(item.price)} COP
                      </p>
                      </Grid.Column>
                      <Grid.Column>
                        <Header
                          as="h5"
                          style={{ color: "gray", marginBottom: 0 }}
                        >
                          Tipo de Motor:
                      </Header>
                        <p
                          style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 16,
                            textDecoration: 'none',
                            color: 'black'
                          }}
                        >
                          {item.combustibleLabel}
                        </p>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row
                      columns={2}
                      style={{ paddingTop: 0, paddingBottom: 5 }}
                    >
                      <Grid.Column>
                        <Header
                          as="h5"
                          style={{ color: "gray", marginBottom: 0 }}
                        >
                          Año:
                      </Header>
                        <p
                          style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 16,
                            textDecoration: 'none',
                            color: 'black'
                          }}
                        >
                          {item.year}
                        </p>
                      </Grid.Column>
                      <Grid.Column>
                        <Header
                          as="h5"
                          style={{ color: "gray", marginBottom: 0 }}
                        >
                          Autonomía:
                      </Header>
                        <p
                          style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 16,
                            textDecoration: 'none',
                            color: 'black'
                          }}
                        >
                          {new Intl.NumberFormat("de-DE").format(item.autonomy)} Km
                      </p>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row
                      columns={2}
                      style={{ paddingTop: 0, paddingBottom: 5 }}
                    >
                      <Grid.Column>
                        <Header
                          as="h5"
                          style={{ color: "gray", marginBottom: 0 }}
                        >
                          Motor:
                      </Header>
                        <p
                          style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 16,
                            textDecoration: 'none',
                            color: 'black'
                          }}
                        >
                          {new Intl.NumberFormat("de-DE").format(item.engine)} C.C.
                      </p>
                      </Grid.Column>
                      <Grid.Column>
                        <Header
                          as="h5"
                          style={{ color: "gray", marginBottom: 0 }}
                        >
                          Transmisión:
                      </Header>
                        <p
                          style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 16,
                            textDecoration: 'none',
                            color: 'black'
                          }}
                        >
                          {item.transmisionLabel}
                        </p>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row
                      columns={2}
                      style={{ paddingTop: 0, paddingBottom: 5 }}
                    >
                      <Grid.Column>
                        <Header
                          as="h5"
                          style={{ color: "gray", marginBottom: 0 }}
                        >
                          Potencia:
                      </Header>
                        <p
                          style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 16,
                            textDecoration: 'none',
                            color: 'black'
                          }}
                        >
                          {new Intl.NumberFormat("de-DE").format(item.power)} HP
                      </p>
                      </Grid.Column>
                      <Grid.Column>
                        { compare === 1 && compareList.length < 3 && !isOnStorage(item) &&
                            <Button onClick={(e) => { e.preventDefault(); addComparar(item) }} 
                            primary floated='left' compact style={{ fontSize: 13 }}>Comparar</Button>   
                        }
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Item.Content>
            </Item>
            ))}
            </Item.Group>
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
