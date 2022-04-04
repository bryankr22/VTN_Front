import React, { useState } from "react";
import {
  Container,
  Input,
  List,
  Grid,
  Checkbox,
  Header,
  Button,
} from "semantic-ui-react";
import { useSelector } from 'react-redux';
import ActiveTagsVehiculos from "./ActiveTagsVehiculos";
import ModalFiltersDesk from "./modals/ModalFiltersDesk";
import * as R from "ramda";
import { extractMaxYearRange, extractMinYearRange, groupByAlphabet, groupByDecade } from "../../helpers/dataStructure";
import { KM_FILTER, PRICES_FILTER } from "../../helpers/constants";
import { dark, light } from "../../helpers/colors";
export default function SidebarVehiculos({ params, contadores, vehiculos }) {
  const [filters, setFilters] = useState({
    min_precio: 0,
    max_precio: 0,
    min_km: 0,
    max_km: 0,
  });

  const [rangeYear, setRangeYear] = useState(() => ({ min: extractMinYearRange(params.anio), max: extractMaxYearRange(params.anio) }));

  const setYear = ({ min, max }) => {
    if (min) {
      return setRangeYear(prev => ({ ...prev, min }));
    }
    if (max) {
      return setRangeYear(prev => ({ ...prev, max }));
    }
  }

  const submitYear = () => {
    const { min, max } = rangeYear;
    insertParam("anio", `${min || 0}:${max || new Date().getFullYear() + 1}`);
  }

  const title_page = (slug) => {
    switch (slug) {
      case "motos":
        return "Motos";
      case "camiones":
        return "Camiones";
      case "carros_coleccion":
        return "Carros de coleccion";
      case "otros":
        return "Otros";
      case "accesorios":
        return "Accesorios";
      default:
        return "Carros y camionetas";
    }
  };

  const mapArray = (contador = []) => {
    var mapItems = contador.map((item) => {
      return {
        label: item.label,
        slug: item.slug,
      };
    });
    var size = 5;
    var sliceItems = mapItems.slice(0, size);
    return sliceItems;
  };

  const mapping_contador = (contador, allList = false) => {
    var mapItems = Object.keys(contador).map((item, index) => {
      return {
        label: item,
        qty: index,
      };
    });
    var size = allList ? mapItems.length : 5;
    var sliceItems = mapItems.slice(0, size);
    return sliceItems;
  };
  const mapping_anios = (contador) => {
    var mapItems = Object.keys(contador).map((item, index) => {
      return {
        label: parseInt(item),
        qty: index,
      };
    });
    var byLabel = R.descend(R.prop("label"));
    var aniosByLabel = R.sort(byLabel, mapItems);
    var size = 5;
    var sliceItems = aniosByLabel.slice(0, size);
    return sliceItems;
  };


  const categorias_filter = [
    { text: "Carros y camionetas", slug: "carros" },
    { text: "Camiones", slug: "camiones" },
    { text: "Carros de coleccion", slug: "carros_coleccion" },
    { text: "Motos", slug: "motos" },
    { text: "Otros", slug: "otros" },
  ];
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
  const setInputVal = (input, value) => {
    setFilters({
      ...filters,
      [input]: value,
    });
  };
  const setKilometraje = () => {
    //console.log(">>>>>", filters);
    insertParam("kilometraje", filters.min_km + ":" + filters.max_km);
  };
  const setPrice = () => {
    insertParam("precio", filters.min_precio + ":" + filters.max_precio);
  };
  const [modalAll, setModalAll] = useState(false);
  const [tituloModal, setTituloModal] = useState("");
  const [paramModal, setParamModal] = useState("");
  const [listadoModal, setListadoModal] = useState([]);
  const openModal = (titulo, listado, param) => {
    setTituloModal(titulo);
    setParamModal(param);
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
  };

  const darkMode = useSelector(({ darkMode }) => darkMode.status);
  const colorText = darkMode === light ? dark : light;
  const colorTextFilters = darkMode === light ? undefined : light;

  return (
    <Grid.Column style={{ paddingLeft: "3%", backgroundColor: darkMode }} width={3}>
      <style>
        {`
          .ui.checkbox>label {
              color: ${colorText}
          }
          .ui.checkbox label:hover, .ui.checkbox+label:hover {
              color: ${colorText}
          }
        `}
      </style>
      <Header style={{ margin: 0, fontSize: '1.28571429rem', color: colorText }} as="h1">
        {title_page(params.categoria)}
      </Header>
      <Header style={{ marginTop: 15, fontSize: '1.3rem', color: colorText }} as="h2">
        {contadores.total_records} resultados
      </Header>
      <Container>
        <ActiveTagsVehiculos tags={params} />
      </Container>
      <Container style={{ padding: "20px 20px" }}>
        <List link>
          <List.Item>
            <List.Content>
              <List.Header>
                <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Ubicaciones</Header>
              </List.Header>
              <List.List style={{ paddingLeft: 15 }}>
                {mapping_contador(contadores.ubicacion).map((item, index) => (
                  <List.Item
                    key={index}
                    as="a"
                    style={{
                      textTransform: "capitalize",
                      color:
                        params.ubicacion === item.label ? "#2185d0" : colorTextFilters,
                    }}
                    onClick={() => insertParam("ubicacion", item.label)}
                  >
                    {item.label?.toLowerCase()}
                  </List.Item>
                ))}
                <List.Item
                  as="a"
                  style={{ color: colorText }}
                  onClick={() =>
                    openModal("Ubicaciones", contadores.ubicacion, "ubicacion")
                  }
                >
                  Ver Todos
                </List.Item>
              </List.List>
            </List.Content>
          </List.Item>
        </List>
        {params.ubicacion &&
          <List link>
            <List.Item>
              <List.Content>
                <List.Header>
                  <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Ciudades</Header>
                </List.Header>
                <List.List style={{ paddingLeft: 15 }}>
                  {mapping_contador(contadores.ciudad).map((item, index) => (
                    <List.Item
                      key={index}
                      as="a"
                      style={{
                        textTransform: "capitalize",
                        color:
                          params.ciudad === item.label ? "#2185d0" : colorTextFilters,
                      }}
                      onClick={() => insertParam("ciudad", item.label)}
                    >
                      {item.label?.toLowerCase()}
                    </List.Item>
                  ))}
                  <List.Item
                    as="a"
                    style={{ color: colorText }}
                    onClick={() =>
                      openModal("Ciudades", contadores.ciudad, "ciudad")
                    }
                  >
                    Ver Todos
                  </List.Item>
                </List.List>
              </List.Content>
            </List.Item>
          </List>
        }
        <List link>
          <List.Item>
            <List.Content>
              <List.Header>
                <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Categorias</Header>
              </List.Header>
              <List.List style={{ paddingLeft: 15 }}>
                {categorias_filter.map((item, index) => (
                  <List.Item
                    key={index}
                    style={{
                      textTransform: "capitalize",
                      color:
                        params.categoria === item.slug ? "#2185d0" : colorTextFilters,
                    }}
                    as="a"
                    onClick={() => insertParam("categoria", item.slug, true)}
                  >
                    {item.text}
                  </List.Item>
                ))}
              </List.List>
            </List.Content>
          </List.Item>
        </List>
        {params.categoria === "motos" && (
          <List link>
            <List.Item>
              <List.Content>
                <List.Header>
                  <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Tipos</Header>
                </List.Header>
                <List.List style={{ paddingLeft: 15 }}>
                  {mapping_contador(contadores.tipo).map((item, index) => (
                    <List.Item
                      key={index}
                      as="a"
                      style={{
                        textTransform: "capitalize",
                        color:
                          params.tipo === item.label ? "#2185d0" : colorTextFilters,
                      }}
                      onClick={() => insertParam("tipo", item.label)}
                    >
                      {item.label}
                    </List.Item>
                  ))}
                  <List.Item
                    as="a"
                    style={{ color: colorText }}
                    onClick={() => openModal("Tipos", contadores.tipo, "tipo")}
                  >
                    Ver Todos
                  </List.Item>
                </List.List>
              </List.Content>
            </List.Item>
          </List>
        )}
        <List link>
          <List.Item>
            <List.Content>
              <List.Header>
                <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Marcas</Header>
              </List.Header>
              <List.List style={{ paddingLeft: 15 }}>
                {mapping_contador(contadores.marcas).map((item, index) => (
                  <List.Item
                    key={index}
                    as="a"
                    style={{
                      textTransform: "capitalize",
                      color:
                        params.marca === item.label ? "#2185d0" : colorTextFilters,
                    }}
                    onClick={() =>
                      insertParam("marca", item.label, true, ["categoria", "ubicacion", "ciudad"])
                    }
                  >
                    {item.label}
                  </List.Item>
                ))}
                <List.Item
                  as="a"
                  style={{ color: colorText }}
                  onClick={() =>
                    openModal("Marcas", contadores.marcas, "marca")
                  }
                >
                  Ver Todos
                </List.Item>
              </List.List>
            </List.Content>
          </List.Item>
        </List>
        {params.marca && (
          <List link>
            <List.Item>
              <List.Content>
                <List.Header>
                  <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Modelos</Header>
                </List.Header>
                <List.List style={{ paddingLeft: 15 }}>
                  {mapping_contador(contadores.modelos).map((item, index) => (
                    <List.Item
                      key={index}
                      as="a"
                      style={{
                        textTransform: "capitalize",
                        color:
                          params.modelo === item.label ? "#2185d0" : colorTextFilters,
                      }}
                      onClick={() => insertParam("modelo", item.label)}
                    >
                      {item.label}
                    </List.Item>
                  ))}
                  <List.Item
                    as="a"
                    style={{ color: colorText }}
                    onClick={() =>
                      openModal("Modelos", contadores.modelos, "modelo")
                    }
                  >
                    Ver Todos
                  </List.Item>
                </List.List>
              </List.Content>
            </List.Item>
          </List>
        )}

        <List link>
          <List.Item>
            <List.Content>
              <List.Header>
                <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Tipo de Motor</Header>
              </List.Header>
              <List.List style={{ paddingLeft: 15 }}>
                {mapping_contador(contadores.combustible, true).map((item, index) => (
                  <List.Item
                    key={index}
                    as="a"
                    style={{
                      textTransform: "capitalize",
                      color:
                        params.combustible === item.label
                          ? "#2185d0"
                          : colorTextFilters,
                    }}
                    onClick={() => insertParam("combustible", item.label)}
                  >
                    {item.label}
                  </List.Item>
                ))}
              </List.List>
            </List.Content>
          </List.Item>
        </List>

        <List link>
          <List.Item>
            <List.Content>
              <List.Header>
                <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Año</Header>
              </List.Header>
              <List.List style={{ paddingLeft: 15 }}>
                {mapping_anios(contadores.anios).map((item, index) => (
                  <List.Item
                    key={index}
                    as="a"
                    style={{
                      textTransform: "capitalize",
                      color: params.ano == item.label ? "#2185d0" : colorTextFilters,
                    }}
                    onClick={() => insertParam("ano", item.label)}
                  >
                    {item.label}
                  </List.Item>
                ))}
                <List.Item
                  as="a"
                  style={{ color: colorText }}
                  onClick={() => openModal("Año", contadores.anios, "ano")}
                >
                  Ver Todos
                </List.Item>

              </List.List>
            </List.Content>
          </List.Item>
        </List>
        <Grid id="grid-range-km" style={{ marginTop: 4, marginBottom: 5 }}>
          <Grid.Column width={6}>
            <Input
              type="number"
              fluid
              placeholder="Mínimo"
              defaultValue={extractMinYearRange(params.anio)}
              onChange={(e, { value }) => setYear({ min: value })}
            />
          </Grid.Column>
          <Grid.Column
            width={1}
            style={{ textAlign: "center", marginTop: 3, fontSize: 16 }}
          >
            -
          </Grid.Column>
          <Grid.Column width={6}>
            <Input
              type="number"
              fluid
              placeholder="Máximo"
              defaultValue={extractMaxYearRange(params.anio)}
              max={new Date().getFullYear() + 1}
              onChange={(e, { value }) => setYear({ max: value })}
            />
          </Grid.Column>
          <Grid.Column width={3}>
            <Button
              style={{ marginLeft: 6 }}
              circular
              icon="angle right"
              onClick={submitYear}
            />
          </Grid.Column>
        </Grid>

        <List link>
          <List.Item>
            <List.Content>
              <List.Header>
                <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Estado</Header>
              </List.Header>
              <List.List style={{ paddingLeft: 15 }}>
                <List.Item
                  as="a"
                  style={{
                    textTransform: "capitalize",
                    color: params.estado === "Nuevo" ? "#2185d0" : colorTextFilters,
                  }}
                  onClick={() => insertParam("estado", "Nuevo")}
                >
                  Nuevo
                </List.Item>
                <List.Item
                  as="a"
                  style={{
                    textTransform: "capitalize",
                    color: params.estado === "Usado" ? "#2185d0" : colorTextFilters,
                  }}
                  onClick={() => insertParam("estado", "Usado")}
                >
                  Usado
                </List.Item>
              </List.List>
            </List.Content>
          </List.Item>
        </List>
        <List link>
          <List.Item>
            <List.Content>
              <List.Header>
                <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Transmision</Header>
              </List.Header>
              <List.List style={{ paddingLeft: 15 }}>
                {mapping_contador(contadores.caja).map((item, index) => (
                  <List.Item
                    key={index}
                    as="a"
                    style={{
                      textTransform: "capitalize",
                      color:
                        params.transmision == item.label
                          ? "#2185d0"
                          : colorTextFilters,
                    }}
                    onClick={() => insertParam("transmision", item.label)}
                  >
                    {item.label}
                  </List.Item>
                ))}
              </List.List>
            </List.Content>
          </List.Item>
        </List>
        <Checkbox
          name="promocion"
          label="Promoción"
          checked={Boolean(params.promocion)}
          defaultValue={Boolean(params.promocion)}
          onChange={({ value }) => insertParam("promocion", !value)}
        />
        <Checkbox
          name="permuta"
          label="Permuta"
          checked={Boolean(params.permuta)}
          defaultValue={Boolean(params.permuta)}
          onChange={({ value }) => insertParam("permuta", !value)}
        />
        <Checkbox
          name="blindaje"
          label="Blindaje"
          checked={Boolean(params.blindaje)}
          defaultValue={Boolean(params.blindaje)}
          onChange={({ value }) => insertParam("blindaje", !value)}
        />
        <>
          <List link style={{ marginBottom: 0 }}>
            <List.Item style={{ marginBottom: 0 }}>
              <List.Content>
                <List.Header>
                  <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Kilometraje</Header>
                </List.Header>
                <List.List>
                  {mapArray(KM_FILTER).map((item, index) => (
                    <List.Item
                      key={index}
                      as="a"
                      style={{
                        textTransform: "capitalize",
                        color:
                          params.kilometraje == item.slug
                            ? "#2185d0"
                            : colorTextFilters,
                      }}
                      onClick={() => insertParam("kilometraje", item.slug)}
                    >
                      {item.label}
                    </List.Item>
                  ))}
                  <List.Item
                    as="a"
                    style={{ color: colorText }}
                    onClick={() =>
                      openModal("Kilometraje", [...KM_FILTER], "kilometraje", true)
                    }
                  >
                    Ver Todos
                  </List.Item>
                </List.List>
              </List.Content>
            </List.Item>
          </List>
          <Grid id="grid-range-km" style={{ marginBottom: 10, marginTop: 5 }}>
            <Grid.Column width={6}>
              <Input
                type="number"
                fluid
                defaultValue={0}
                placeholder="Mínimo"
                onChange={(e, { value }) => setInputVal("min_km", value)}
              />
            </Grid.Column>
            <Grid.Column
              width={1}
              style={{ textAlign: "center", marginTop: 3, fontSize: 16 }}
            >
              -
            </Grid.Column>
            <Grid.Column width={6}>
              <Input
                type="number"
                fluid
                defaultValue={0}
                placeholder="Máximo"
                onChange={(e, { value }) => setInputVal("max_km", value)}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Button
                style={{ marginLeft: 6 }}
                circular
                icon="angle right"
                onClick={() => setKilometraje()}
              />
            </Grid.Column>
          </Grid>
        </>
        <>
          <List link style={{ marginBottom: 0 }}>
            <List.Item style={{ marginBottom: 0 }}>
              <List.Content>
                <List.Header>
                  <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Precio</Header>
                </List.Header>
                <List.List>
                  {mapArray(PRICES_FILTER).map((item, index) => (
                    <List.Item
                      key={index}
                      as="a"
                      style={{
                        textTransform: "capitalize",
                        color:
                          params.precio == item.slug ? "#2185d0" : colorTextFilters,
                      }}
                      onClick={() => insertParam("precio", item.slug)}
                    >
                      {item.label}
                    </List.Item>
                  ))}
                  <List.Item
                    as="a"
                    style={{ color: colorText }}
                    onClick={() =>
                      openModal("Precios", [...PRICES_FILTER].splice(5, PRICES_FILTER.length - 1), "precio", true)
                    }
                  >
                    Ver Todos
                  </List.Item>
                </List.List>
              </List.Content>
            </List.Item>
          </List>
          <Grid id="grid-range-km" style={{ marginTop: 4 }}>
            <Grid.Column width={6}>
              <Input
                type="number"
                fluid
                defaultValue={0}
                placeholder="Mínimo"
                onChange={(e, { value }) => setInputVal("min_precio", value)}
              />
            </Grid.Column>
            <Grid.Column
              width={1}
              style={{ textAlign: "center", marginTop: 3, fontSize: 16 }}
            >
              -
            </Grid.Column>
            <Grid.Column width={6}>
              <Input
                type="number"
                fluid
                defaultValue={0}
                placeholder="Máximo"
                onChange={(e, { value }) => setInputVal("max_precio", value)}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Button
                style={{ marginLeft: 6 }}
                circular
                icon="angle right"
                onClick={() => setPrice()}
              />
            </Grid.Column>
          </Grid>
        </>
      </Container>
      <ModalFiltersDesk
        showModal={modalAll}
        onClose={() => setModalAll(!modalAll)}
        titulo={tituloModal}
        param={paramModal}
        listado={listadoModal}
      />
    </Grid.Column>
  );
}
