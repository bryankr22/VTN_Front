import React, { useEffect } from "react";
import { Label, Card, Button, Container, Pagination } from "semantic-ui-react";
import HeaderVehiculo from "../../components/comparadores/HeaderVehiculo";
import { useLocalStorage } from "../../helpers/hooks/useLocalStorage";
import { useSelector, useDispatch } from "react-redux";
import { addVehiculo } from "../../store/comparadorSlice";
import dynamic from "next/dynamic";
import VehicleThumbnail from '../VehicleThumbnail';
import { dark, light } from "../../helpers/colors";
const ZoneAd = dynamic(() => import("../ZoneAd"));

export default function ListadoVehiculosMobile({
    params,
    vehiculos,
    page,
    totalRecords,
}) {
    const compareList = useSelector(({ comparador }) => comparador.vehiculos);
    const dispatch = useDispatch();
    const [compare, setCompare] = useLocalStorage("compareVehiculos", "0");
    const [isComparing, setIsComparing] = useLocalStorage("isComparing", "0");
    // const pathS3 = "https://d3bmp4azzreq60.cloudfront.net/fit-in/200x200/vendetunave/images/vehiculos/";
    const pathS3 =
        "https://vendetunave.s3.amazonaws.com/vendetunave/images/thumbnails/";
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

    useEffect(() => {
        if (compareList.length <= 0 && isComparing == "0") {
            setCompare("0");
        }
    }, [compareList]);

    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? undefined : light;
    const colorBorder = darkMode === light ? "#d4d4d5" : "#414141";

    return (
        <>
            <HeaderVehiculo />
            {!params.vendedor &&
                <ZoneAd slug={params.categoria} />
            }
            <style>{`
                .ui.card, .ui.cards>.card {
                -webkit-box-shadow: 0 1px 3px 0 ${colorBorder}, 0 0 0 1px ${colorBorder};
                box-shadow: 0 1px 3px 0 ${colorBorder}, 0 0 0 1px ${colorBorder};
                }
                
                .label-premium {
                background-color: rgb(198, 168, 29) !important;
                border-color: #78621c !important;
                }
            `}</style>
            {vehiculos.length === 0 && (
                <p
                    style={{
                        textAlign: "center",
                        margin: "25px 0",
                        fontSize: 24,
                    }}
                >
                    No encontramos resultados
                </p>
            )}
            {vehiculos.length > 0 && (
                <Card.Group
                    itemsPerRow={2}
                    left="true"
                    style={{ width: "100%", marginRight: 0, marginLeft: 0 }}
                >
                    {vehiculos.map((item, index) => (
                        <Card
                            key={"vehiculo2" + index}
                            as="a"
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
                            style={{
                                width: "calc(50% - 1em)",
                                marginRight: 6,
                                marginLeft: 6,
                                textDecoration: "none",
                                backgroundColor: darkMode
                            }}
                        >
                            {item.premium === 1 &&
                                <Label as='a' size="mini" className="label-premium" ribbon style={{
                                    position: 'absolute',
                                    zIndex: 10,
                                    marginLeft: 14,
                                    marginTop: 5,
                                    color: light
                                }}>
                                    Premium
                                </Label>
                            }
                            <VehicleThumbnail item={item} src={pathS3 + item.nameImage + "300x300.webp"} />
                            <Card.Content>
                                <Card.Description
                                    style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        marginBottom: 7,
                                        color: colorText
                                    }}
                                >
                                    {item.title}
                                </Card.Description>
                                <Card.Header style={{ color: colorText }}>
                                    $ {new Intl.NumberFormat("de-DE").format(item.precio)} COP
                                </Card.Header>
                                <Card.Description style={{ color: colorText }}>
                                    {item.ano} -{" "}
                                    {new Intl.NumberFormat("de-DE").format(item.kilometraje)} KM
                                </Card.Description>
                                <Card.Description style={{ color: colorText }}>
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
                    {darkMode === dark &&
                        <style>{`
                            .ui.secondary.pointing.menu .active.item {
                                color: ${colorText}
                            }
                            .ui.secondary.pointing.menu .item {
                                border-color: ${colorText};
                                color: ${colorText}
                            }
                        `}</style>
                    }
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
        </>
    );
}
