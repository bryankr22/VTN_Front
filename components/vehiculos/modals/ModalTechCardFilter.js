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
import ModalFiltersDesk from "./ModalFiltersDesk";
import { groupByAlphabet, groupByDecade } from '../../../helpers/dataStructure';
import { PRICES_FILTER } from '../../../helpers/constants';

const getSlug = (slug) => {
    return slug === 'ano' ? 'anios' : slug
}

const vehicleType = [
  { label: 'Carro', slug: 'Carro' },
  { label: 'Camioneta', slug: 'Camioneta' },
  { label: 'SUV', slug: 'SUV' },
  { label: 'Deportivo', slug: 'Deportivo' },
  { label: 'Convertible', slug: 'Convertible' },
  { label: 'Pick-Up', slug: 'Pick-Up' }
];

export default function ModalTechCardFilter({
  showModal,
  onClose,
  filtros,
  params,
}) {
  const mapping_contador = (contador, canWatchAll = true, {lower} = {}) => {
    const list = Array.isArray(contador) ? contador : Object.keys(contador);
    var mapItems = list.map((item, index) => {
      return {
        label: lower ? item?.toLowerCase?.() : (item.label || item),
        slug: item.slug || item,
        qty: index,
      };
    });
    var size = 5;
    var sliceItems = mapItems.slice(0, size);

    if (canWatchAll) {
      sliceItems.push({
        label: "Ver Todos",
        slug: "",
        qty: 0,
      });
    }
    return sliceItems;
  };


  const [filtrosLocal, setFiltrosLocal] = useState([
    {
      text: "Tipo de Vehículo",
      slug: 'tipo',
      component: false,
      values: vehicleType,
      reset: true
    },
    {
      text: "Marcas",
      slug: 'marca',
      values: mapping_contador(filtros.marca),
    },
    {
      text: "Tipo de motor",
      open: false,
      values: mapping_contador(filtros.combustible, false),
      slug: "combustible",
      component: false,
    },
    {
      text: "Transmisión",
      open: false,
      values: mapping_contador(filtros.transmision, false),
      slug: "transmision",
      component: false,
    },
    //Opciones
    {
      text: "Precio",
      slug: "precio",
      open: false,
      component: false,
      values: mapping_contador(PRICES_FILTER),
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
  const insertParam = (key, value, reset, persist) => {
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
    if (reset) {
      if (persist) {
        const url = new URL(location.href);
        const newUrl = new URL("http://test.com");
        url.searchParams.forEach((nValue, nKey) => {
          if (persist.includes(nKey)) {
            newUrl.searchParams.append(nKey, nValue);
          }
        });
        newUrl.searchParams.append(key, value);
        params = newUrl.search;
      } else {
        params = `${key}=${value}`;
      }
    }
    document.location.search = params;
  };

  const [modalAll, setModalAll] = useState(false);
  const [tituloModal, setTituloModal] = useState("");
  const [paramModal, setParamModal] = useState("");
  const [listadoModal, setListadoModal] = useState([]);
  const [modalAction, setActionModal] = useState();
  const openModal = (titulo, listado, param, action) => {
    setTituloModal(titulo);
    setParamModal(param);
    setActionModal(() => action)

    if(param === 'precio') {
      listado = [...PRICES_FILTER].slice(1, PRICES_FILTER.length)
    }

    const list = Array.isArray(listado) ? listado : Object.keys(listado);

    var mapItems = list.map((item, index) => {
      return {
        label: item.label || item,
        slug: item.slug,
        qty: index,
      };
    });
    if (titulo === "Año") {
      var byLabel = R.descend(R.prop("label"));
      var aniosByLabel = R.sort(byLabel, mapItems);
      setListadoModal(groupByDecade(aniosByLabel));
    } else {
      let grouped = [];
      if(Array.isArray(listado)) {
        grouped = [[...mapItems]]
      } else {
        grouped = groupByAlphabet(mapItems)
      }
      setListadoModal(grouped);
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
                          <List link>
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
                                          color: params[item.slug] === itemSecond.slug && "#2185d0",
                                        }}
                                        onClick={() => {
                                          console.log(itemSecond, item)
                                          if (itemSecond.slug != "") {
                                            return insertParam(
                                              item.slug,
                                              itemSecond.slug,
                                              item.reset
                                            );
                                          }
                                          let {slug} = item;
                                          openModal(
                                            item.text,
                                            filtros[getSlug(slug)],
                                            slug,
                                            (label) => insertParam(
                                              item.slug,
                                              label,
                                              item.reset
                                            )
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
          modalAction={modalAction}
        />
      )}
    </>
  );
}
