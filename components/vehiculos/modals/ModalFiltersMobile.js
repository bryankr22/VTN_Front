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
  Button
} from "semantic-ui-react";
import * as R from "ramda";
import OpcionesComponent from "./OpcionesComponent";
import MarcaModeloComponent from "./MarcaModeloComponent";
import TiposComponent from "./TiposComponent";
import ModalFiltersDesk from "./ModalFiltersDesk";
import { groupByAlphabet, groupByDecade, normalize } from "../../../helpers/dataStructure";
import { KM_FILTER, PLACA_FILTER, PRICES_FILTER } from '../../../helpers/constants';

const getSlug = (slug) => {
  return slug === "ano" ? "anios" : slug;
};

const persistKey = {
  categoria: [],
  marca: ["categoria", 'ubicacion', 'ciudad'],
};

export default function ModalFiltersMobile({
  showModal,
  onClose,
  filtros,
  params,
  vendedor
}) {
  const mapping_contador = (contador, canWatchAll = true, { lower } = {}) => {
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

  const categorias_filter = [
    { label: "Carros y camionetas", slug: "carros" },
    { label: "Camiones", slug: "camiones" },
    { label: "Carros de coleccion", slug: "carros_coleccion" },
    { label: "Motos", slug: "motos" },
    { label: "Otros", slug: "otros" },
  ];

  const objectCities = [];

  if (!params.vendedor) {
    objectCities.push(
      {
        text: "Ubicacion",
        open: false,
        values: mapping_contador(filtros.ubicacion, true, { lower: true }),
        slug: "ubicacion",
        component: false,
      }
    );
  }

  if (params.ubicacion !== undefined) {
    objectCities.push(
      {
        text: "Ciudades",
        open: false,
        values: mapping_contador(filtros.ciudad, true, { lower: true }),
        slug: "ciudad",
        component: false,
      }
    );
  }

  const [filtrosLocal, setFiltrosLocal] = useState([
    ...objectCities,
    {
      text: "Categorias",
      open: false,
      values: categorias_filter,
      slug: "categoria",
      reset: true,
      component: false,
    },
    {
      text: "Tipos",
      component: true,
      render: <TiposComponent filtros={filtros} params={params} vendedor={vendedor} />,
    },
    {
      text: "Marcas",
      component: true,
      render: <MarcaModeloComponent filtros={filtros} params={params} vendedor={vendedor} />,
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
      values: mapping_contador(PRICES_FILTER),
      minimo: 0,
      maximo: 0,
    },
    {
      text: "Kilometraje",
      slug: "kilometraje",
      open: false,
      components: false,
      values: mapping_contador(KM_FILTER),
      minimo: 0,
      maximo: 0,
    },
    {
      text: "Placa",
      slug: "placa",
      open: false,
      components: false,
      values: mapping_contador(PLACA_FILTER),
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
  const insertParam = (key, value, reset) => {
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
    let params = kvp.join("&").replace(`&${key}=false`, '');
    if (reset) {
      if (persistKey[key]?.length) {
        const url = new URL(location.href);
        const newUrl = new URL("http://test.com");
        if (vendedor) {
          newUrl.searchParams.append('vendedor', `${normalize(vendedor.nombre)}-${vendedor.id}`);
        }
        url.searchParams.forEach((nValue, nKey) => {
          if (persistKey[key].includes(nKey)) {
            newUrl.searchParams.append(nKey, nValue);
          }
        });
        newUrl.searchParams.append(key, value);
        params = newUrl.search;
      } else {
        params = vendedor ? `vendedor=${normalize(vendedor.nombre)}-${vendedor.id}&${key}=${value}` : `${key}=${value}`;
      }
    }

    document.location.search = params;
  };
  const [modalAll, setModalAll] = useState(false);
  const [tituloModal, setTituloModal] = useState("");
  const [paramModal, setParamModal] = useState("");
  const [listadoModal, setListadoModal] = useState([]);
  const [resetModal, setResetModal] = useState(false);
  const openModal = (titulo, listado, param, reset) => {
    setTituloModal(titulo);
    setParamModal(param);

    if (param === 'precio') {
      listado = [...PRICES_FILTER].slice(5, PRICES_FILTER.length)
    } else if (param === 'kilometraje') {
      listado = [...KM_FILTER]
    } else if (param === 'placa') {
      listado = [...PLACA_FILTER]
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
      if (Array.isArray(listado)) {
        grouped = [[...mapItems]]
      } else {
        grouped = groupByAlphabet(mapItems)
      }

      setListadoModal(grouped);
    }
    setModalAll(true);
    setResetModal(reset);
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
                        <List link>
                          <List.Item>
                            <List.Content>
                              <List.List style={{ paddingLeft: 15 }}>
                                {item.values.map((itemSecond, indexSecond) => (
                                  <List.Item
                                    key={item.text + indexSecond}
                                    as="a"
                                    style={{
                                      padding: "7px 0px",
                                      borderBottom: "1px solid #cccccc",
                                      textTransform: "capitalize",
                                      color:
                                        params[item.slug] == itemSecond.slug
                                          ? "#2185d0"
                                          : undefined,
                                    }}
                                    onClick={() => {
                                      if (itemSecond.slug != "") {
                                        return insertParam(
                                          item.slug,
                                          itemSecond.slug,
                                          item.reset
                                        );
                                      }
                                      let { slug } = item;
                                      openModal(
                                        item.text,
                                        filtros[getSlug(slug)],
                                        slug,
                                        item.reset
                                      );
                                    }}
                                  >
                                    {itemSecond.label}
                                  </List.Item>
                                ))}
                              </List.List>
                            </List.Content>
                          </List.Item>
                        </List>
                        {item.slug === "precio" ||
                          item.slug === "kilometraje" ||
                          item.slug === "ano" ? (
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
                                    item.slug === "ano" ? "anio" : item.slug,
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
          resetOnClick={resetModal}
        />
      )}
    </>
  );
}
