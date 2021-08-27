import React, { useState } from "react";
import {
  Container,
  List,
  Modal,
  Grid,
  Header,
  Icon,
  Accordion,
  Input,
  Button,
  Checkbox,
} from "semantic-ui-react";
import * as R from "ramda";
import OpcionesComponent from "./OpcionesComponent";
import MarcaModeloComponent from "./MarcaModeloComponent";
import TiposComponent from "./TiposComponent";
import ModalFiltersDesk from "./ModalFiltersDesk";
import { groupByAlphabet, groupByDecade } from '../../../helpers/dataStructure';

const getSlug = (slug) => {
    return slug === 'ano' ? 'anios' : slug
}

export default function ModalFiltersMobile({
  showModal,
  onClose,
  filtros,
  params,
}) {
  const mapping_contador = (contador, canWatchAll = true) => {
    var mapItems = Object.keys(contador).map((item, index) => {
      return {
        label: item,
        slug: item,
        qty: index,
      };
    });
    var size = 5;
    var sliceItems = mapItems.slice(0, size);

    if(canWatchAll) {
        sliceItems.push({
          label: "Ver Todos",
          slug: "",
          qty: 0,
        });
    }
    return sliceItems;
  };
  const mapping_anios = (contador) => {
    const mapItems = Object.keys(contador).map((item, index) => {
      return {
        label: parseInt(item),
        slug: parseInt(item),
        qty: index,
      };
    });
    const byLabel = R.descend(R.prop("label"));
    const aniosByLabel = R.sort(byLabel, mapItems);
    const size = 5;
    const sliceItems = aniosByLabel.slice(0, size);
    sliceItems.push({
        label: "Ver Todos",
        slug: "",
        qty: 0,
      });
    return sliceItems;
  };
  const kilometraje_filter = [
    { label: "De 0 a 5.000", slug: "0:5000" },
    { label: "De 5.000 a 10.000", slug: "5000:10000" },
    { label: "De 10.000 a 20.000", slug: "10000:20000" },
    { label: "De 20.000 a 30.000", slug: "20000:30000" },
    { label: "De 30.000 a 45.000", slug: "30000:45000" },
  ];
  const precios_filter = [
    { label: "Hasta $10.000.000", slug: "0:10000000" },
    { label: "$10.000.000 a $20.000.000", slug: "10000000:20000000" },
    { label: "$20.000.000 a $35.000.000", slug: "20000000:35000000" },
    { label: "$35.000.000 a $50.000.000", slug: "35000000:50000000" },
    { label: "$50.000.000 a $100.000.000", slug: "50000000:100000000" },
  ];
  const categorias_filter = [
    { label: "CARROS Y CAMIONETAS", slug: "carros" },
    { label: "CAMIONES", slug: "camiones" },
    { label: "CARROS DE COLECCION", slug: "carros_coleccion" },
    { label: "MOTOS", slug: "motos" },
    { label: "OTROS", slug: "otros" },
  ];

  const [filtrosLocal, setFiltrosLocal] = useState([
    {
      text: "Ubicacion",
      open: false,
      values: mapping_contador(filtros.ubicacion),
      slug: "ubicacion",
      component: false,
    },
    {
      text: "Categorias",
      open: false,
      values: categorias_filter,
      slug: "categoria",
      component: false,
    },
    {
      text: "Tipos",
      component: true,
      render: <TiposComponent filtros={filtros} params={params} />,
    },
    {
      text: "Marcas",
      component: true,
      render: <MarcaModeloComponent filtros={filtros} params={params} />,
    },
    //Marcas
    {
      text: "Año",
      open: false,
      values: mapping_anios(filtros.anios),
      slug: "ano",
      component: false,
    },
    {
      text: "Tipo de motor",
      open: false,
      values: mapping_contador(filtros.combustible),
      slug: "combustible",
      component: false,
    },
    {
      text: "Transmision",
      open: false,
      values: mapping_contador(filtros.caja, false),
      slug: "transmision",
      component: false,
    },
    {
      text: "Estado",
      open: false,
      slug: "estado",
      component: false,
      values: [
        {
          label: "Nuevo",
          slug: "Nuevo",
        },
        {
          label: "Usado",
          slug: "Usado",
        },
      ],
    },
    {
      text: "Opciones",
      component: true,
      render: <OpcionesComponent params={params} />,
    },
    //Opciones
    {
      text: "Precio",
      slug: "precio",
      open: false,
      component: false,
      values: precios_filter,
      minimo: 0,
      maximo: 0,
    },
    {
      text: "Kilometraje",
      slug: "kilometraje",
      open: false,
      components: false,
      values: kilometraje_filter,
      minimo: 0,
      maximo: 0,
    },
  ]);
  const activeDropDown = (index) => {
    var openDrop = filtrosLocal[index].open;
    filtrosLocal[index].open = !openDrop;
    setFiltrosLocal([...filtrosLocal]);
  };
  const changeInputFiltro = (value, index, input) => {
    filtrosLocal[index][input] = value;
    setFiltrosLocal([...filtrosLocal]);
  };
  const insertParam = (key, value) => {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);
    var kvp = document.location.search.substr(1).split("&");
    let i = 0;
    for (; i < kvp.length; i++) {
      if (kvp[i].startsWith(key + "=")) {
        let pair = kvp[i].split("=");
        pair[1] = value;
        kvp[i] = pair.join("=");
        break;
      }
    }
    if (i >= kvp.length) {
      kvp[kvp.length] = [key, value].join("=");
    }
    let params = kvp.join("&");
    //document.location.search = params;
  };

  const [modalAll, setModalAll] = useState(false);
  const [tituloModal, setTituloModal] = useState("");
  const [paramModal, setParamModal] = useState("");
  const [listadoModal, setListadoModal] = useState([]);
  const openModal = (titulo, listado, param) => {
    setTituloModal(titulo);
    setParamModal(param);
    var mapItems = Object.keys(listado).map((item, index) => {
      return {
        label: item,
        qty: index,
      };
    });
    if (titulo === "Año") {
      var byLabel = R.descend(R.prop("label"));
      var aniosByLabel = R.sort(byLabel, mapItems);
      setListadoModal(groupByDecade(aniosByLabel));
    } else {
      setListadoModal(groupByAlphabet(mapItems));
    }
    setModalAll(true);
  };

  return (
    <>
      <Modal size="tiny" open={showModal} onClose={onClose} closeIcon>
        <Modal.Header>Filtros</Modal.Header>
        <Modal.Content scrolling>
          <Container style={{ padding: "20px 20px" }}>
            <Grid>
              <Grid.Row columns={1} style={{ paddingTop: 0, paddingBottom: 0 }}>
                {filtrosLocal.map((item, index) =>
                  item.component ? (
                    item.render
                  ) : (
                    <Accordion
                      key={index}
                      style={{ width: "100%", marginBottom: 15 }}
                    >
                      <Accordion.Title
                        style={{
                          width: "100%",
                          border: "1px solid black",
                          padding: "10px 20px",
                          borderRadius: 20,
                        }}
                        active={item.open}
                        index={0}
                        onClick={() => activeDropDown(index)}
                      >
                        <Header as="h5">
                          {item.text}
                          <Icon name="dropdown" style={{ cssFloat: "right" }} />
                        </Header>
                      </Accordion.Title>
                      <Accordion.Content active={item.open}>
                        <Grid.Column>
                          <List>
                            <List.Item>
                              <List.Content>
                                <List.List style={{ paddingLeft: 15 }}>
                                  {item.values.map(
                                    (itemSecond, indexSecond) => (
                                      <List.Item
                                        key={item.text + indexSecond}
                                        as="a"
                                        style={{
                                          padding: "7px 0px",
                                          borderBottom: "1px solid #cccccc",
                                          color: "#2185d0",
                                        }}
                                        onClick={() => {
                                          if (itemSecond.slug != "") {
                                            return insertParam(
                                              item.slug,
                                              itemSecond.slug
                                            );
                                          }
                                          let {slug} = item;
                                          openModal(
                                            item.text,
                                            filtros[getSlug(slug)],
                                            slug
                                          );
                                        }}
                                      >
                                        {itemSecond.label}
                                      </List.Item>
                                    )
                                  )}
                                </List.List>
                              </List.Content>
                            </List.Item>
                          </List>
                          {item.slug === "precio" ||
                          item.slug === "kilometraje" ? (
                            <Grid
                              id="grid-range-price"
                              style={{ marginBottom: 8 }}
                            >
                              <Grid.Column width={6}>
                                <Input
                                  type="number"
                                  fluid
                                  value={item.minimo}
                                  onChange={(e, { value }) =>
                                    changeInputFiltro(value, index, "minimo")
                                  }
                                  placeholder="Mínimo"
                                />
                              </Grid.Column>
                              <Grid.Column
                                width={1}
                                style={{
                                  textAlign: "center",
                                  marginTop: 3,
                                  fontSize: 16,
                                }}
                              >
                                -
                              </Grid.Column>
                              <Grid.Column width={6}>
                                <Input
                                  type="number"
                                  fluid
                                  placeholder="Máximo"
                                  value={item.maximo}
                                  onChange={(e, { value }) =>
                                    changeInputFiltro(value, index, "maximo")
                                  }
                                />
                              </Grid.Column>
                              <Grid.Column width={3}>
                                <Button
                                  onClick={() =>
                                    insertParam(
                                      item.slug,
                                      item.minimo + ":" + item.maximo
                                    )
                                  }
                                  style={{ marginLeft: 6 }}
                                  circular
                                  icon="angle right"
                                />
                              </Grid.Column>
                            </Grid>
                          ) : null}
                        </Grid.Column>
                      </Accordion.Content>
                    </Accordion>
                  )
                )}
              </Grid.Row>
            </Grid>
          </Container>
        </Modal.Content>
      </Modal>
      {modalAll && (
        <ModalFiltersDesk
          showModal={modalAll}
          onClose={() => setModalAll(!modalAll)}
          titulo={tituloModal}
          param={paramModal}
          listado={listadoModal}
        />
      )}
    </>
  );
}
