import React from 'react'
import { Image, Card } from "semantic-ui-react";
export default function CardProducts({item}) {
    const pathS3 = "https://d3bmp4azzreq60.cloudfront.net/fit-in/150x150/vendetunave/images/vehiculos/";
    return (
        <Card as="a" style={{ margin: 5, height: "auto" }}>
            <Card.Content style={{ padding: "0 2px 0 0" }}>
                <a
                href={ "/vehiculo/" + item.url + "-" + item.id }
                style={{ textDecoration: "none" }}
                >
                    {item.new_image === 0 && (
                        <Image
                            floated="left"
                            size="small"
                            src={pathS3 + item.nameImage + ".webp"}
                            alt={item.nameImage + ".webp"}
                            style={{
                                marginBottom: 0,
                                height: 150,
                                objectFit: "cover",
                            }}
                        />
                    )}
                    {item.new_image === 1 && (
                        <Image
                            floated="left"
                            size="small"
                            src={pathS3 + item.nameImage + ".webp"}
                            alt={item.nameImage + ".webp"}
                            style={{
                                marginBottom: 0,
                                height: 150,
                                objectFit: "cover",
                            }}
                        />
                    )}
                    {item.new_image === 2 && (
                        <Image
                            floated="left"
                            size="small"
                            src={
                                pathS3.replace("vehiculos", "thumbnails") +
                                item.nameImage +
                                "300x300." + ".webp"
                            }
                            alt={item.nameImage + "300x300." + ".webp"}
                            style={{
                                marginBottom: 0,
                                height: 150,
                                objectFit: "cover",
                            }}
                        />
                    )}
                </a>
                <Card.Header style={{ fontSize: 12, marginTop: 30 }}>
                    <a
                    href={ "/vehiculo/" + item.url + "-" + item.id }
                    style={{
                        textDecoration: "none",
                        color: "rgba(0, 0, 0, 1)",
                        fontFamily: "Montserrat-Regular",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                    }}
                    >
                        {item.title}
                    </a>
                </Card.Header>
                <Card.Header style={{ fontSize: 13, marginTop: 7 }}>
                    <a
                    href={ "/vehiculo/" + item.url + "-" + item.id }
                    style={{
                        textDecoration: "none",
                        color: "black",
                        fontFamily: "Montserrat-Bold",
                    }}
                    >
                        $ {new Intl.NumberFormat("de-DE").format(item.precio)}{" "}COP
                    </a>
                </Card.Header>
                <Card.Meta>
                    <a
                    href={ "/vehiculo/" + item.url + "-" + item.id }
                    style={{
                        textDecoration: "none",
                        color: "rgba(0, 0, 0, 1)",
                        fontFamily: "Montserrat-Regular",
                    }}
                    >
                        {item.ano} -{" "}
                        {new Intl.NumberFormat("de-DE").format(
                            item.kilometraje
                        )}{" "}
                        Km
                    </a>
                </Card.Meta>
                <Card.Meta>
                    <a
                    href={ "/vehiculo/" + item.url + "-" + item.id }
                    style={{
                        textDecoration: "none",
                        color: "rgba(0, 0, 0, 1)",
                        fontFamily: "Montserrat-Regular",
                    }}
                    >
                        {item.labelCiudad}
                    </a>
                </Card.Meta>
            </Card.Content>
        </Card>
    )
}
