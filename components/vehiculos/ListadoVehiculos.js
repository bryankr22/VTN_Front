import { useState, useEffect } from "react";
import {
  Image,
  Container,
  Input,
  Card,
  Select,
  Grid,
  Pagination,
  Button,
} from "semantic-ui-react";
import { useLocalStorage } from "../../helpers/hooks/useLocalStorage";
import HeaderVehiculo from "../../components/comparadores/HeaderVehiculo";
import { useSelector, useDispatch } from "react-redux";
import { addVehiculo } from "../../store/comparadorSlice";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
const ZoneAd = dynamic(() => import("../ZoneAd"));

export default function ListadoVehiculos({
  params,
  vehiculos,
  page,
  totalRecords,
}) {
  const compareList = useSelector(({ comparador }) => comparador.vehiculos);
  const dispatch = useDispatch();
  const [compare, setCompare] = useLocalStorage("compareVehiculos", "0");
  const [isComparing, setIsComparing] = useLocalStorage("isComparing", "0");
  const pathS3 =
    "https://vendetunave.s3.amazonaws.com/vendetunave/images/thumbnails/";
  const filter = [
    { key: 0, value: 0, text: "Más reciente" },
    { key: 1, value: 1, text: "Nuevo" },
    { key: 2, value: 2, text: "Usado" },
    { key: 3, value: 3, text: "Precio más bajo" },
    { key: 4, value: 4, text: "Precio más alto" },
  ];
  const normalize = (function () {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
      mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
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
    document.location.search = params;
  };
  const handlePaginationChange = (e, { activePage }) => {
    insertParam("page", activePage);
  };
  const handleChangeFilter = (e, { value }) => {
    insertParam("orden", value);
  };
  const isOnStorage = (item) => {
    return compareList.some((element) => element.id === item.id);
  };
  const addComparar = (item) => {
    //console.log(">>>>", item);
    if (compareList.length < 3) {
      dispatch(addVehiculo(item));
      setIsComparing("0");
    } else {
      setCompare("0");
    }
    return;
  };
  const router = useRouter();
  const [query, setQuery] = useState("");
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    router.push("/vehiculos?q=" + query);
  };
  useEffect(() => {
    setQuery(params.q);
  }, []);

  useEffect(() => {
    if (compareList.length <= 0 && isComparing == "0") {
      setCompare("0");
    }
  }, [compareList]);
  //useEffect
  return (
    <Grid.Column width={13}>
      <Container fluid style={{ textAlign: "center", margin: 10 }}>
        <Grid>
          <Grid.Column width={12}>
            <Input
              style={{ width: "100%" }}
              onChange={(e, { value }) => setQuery(value)}
              defaultValue={query}
              onKeyDown={(e) => handleKeyDown(e)}
              action={{
                icon: "search",
                onClick: () => handleSubmit(),
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
      <HeaderVehiculo />
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

      <ZoneAd slug={params.categoria} />

      {vehiculos.length > 0 && (
        <Card.Group itemsPerRow={4}>
          {vehiculos.map((item, index) => (
            <Card
              key={index}
              as="a"
              style={{ textDecoration: "none" }}
              href={
                "/vehiculos/detalle/" +
                normalize(item.title)
                  .split(" ")
                  .join("-")
                  .split("%")
                  .join("")
                  .split("?")
                  .join("")
                  .split("/")
                  .join("") +
                "-" +
                item.id
              }
            >
              <Image
                src={pathS3 + item.nameImage + "300x300.webp"}
                wrapped
                ui={false}
                alt={item.title}
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
                  <h2 className="fnt-size-inherit">
                    {item.title}
                  </h2>
                </Card.Description>
                <Card.Header>
                  <h3 className="fnt-size-inherit">
                    $ {new Intl.NumberFormat("de-DE").format(item.precio)} COP
                  </h3>
                </Card.Header>
                <Card.Description>
                  <h5 className="fnt-size-inherit">
                    {item.ano} -{" "}
                    {new Intl.NumberFormat("de-DE").format(item.kilometraje)} KM
                  </h5>
                </Card.Description>
                <Card.Description>
                  {item.labelCiudad.toLowerCase().charAt(0).toUpperCase() +
                    item.labelCiudad.toLowerCase().slice(1)}
                  {compare === 1 &&
                    compareList.length < 3 &&
                    !isOnStorage(item) && (
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          addComparar(item);
                        }}
                        primary
                        floated="right"
                        compact
                        style={{ fontSize: 13 }}
                      >
                        Comparar
                      </Button>
                    )}
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
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
  );
}
