import React from 'react'
import { Image, Card } from "semantic-ui-react";
export default function CardProductsDesk({item}) {
    const parseUrl = (url) => {
        let parse = url; 
        return parse;
    }
    const pathS3 = "https://d3bmp4azzreq60.cloudfront.net/fit-in/150x150/vendetunave/images/vehiculos/";
    return (
        <Card
        as="a"
        href={ "/vehiculo/" + parseUrl(item.url) + "-" + item.id }
        style={{
            boxShadow: "none",
            textDecoration: "none",
            padding: 10,
        }}
        >
        {item.new_image === 0 && (
            <Image
                priority={true}
                src={pathS3 + item.nameImage + "." + item.extension}
                alt={item.nameImage + "." + item.extension}
                style={{
                    marginBottom: 0,
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 0,
                }}
            />
        )}
        {item.new_image === 1 && (
            <Image
                priority={true}
                src={pathS3 + item.nameImage + "." + item.extension}
                alt={item.nameImage + "." + item.extension}
                style={{
                    marginBottom: 0,
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 0,
                }}
            />
        )}
        {item.new_image === 2 && (
            <Image
                priority={true}
                src={ pathS3.replace("vehiculos", "thumbnails") + item.nameImage + "300x300." + item.extension }
                alt={item.nameImage + "300x300." + item.extension}
                style={{
                    marginBottom: 0,
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 0,
                }}
            />
        )}
        <Card.Content style={{ textAlign: "left" }}>
            <Card.Meta>
                <span
                    style={{
                        fontFamily: "Montserrat-Regular",
                        fontSize: 16,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                    }}
                >
                    {item.title}
                </span>
            </Card.Meta>
            <Card.Header>
                <span style={{ fontFamily: "Montserrat-Bold" }}>
                    $
                    {" " +
                        new Intl.NumberFormat("de-DE").format(item.precio) +
                        " "}
                    COP
                </span>
            </Card.Header>
            <Card.Meta>
                <span
                    className="date"
                    style={{
                        fontFamily: "Montserrat-Regular",
                        fontSize: 14,
                    }}
                >
                    {item.ano} -{" "}
                    {new Intl.NumberFormat("de-DE").format(
                        item.kilometraje
                    )}{" "}
                    Km
                </span>
            </Card.Meta>
            <Card.Meta>
                <span
                    className="date"
                    style={{
                        fontFamily: "Montserrat-Regular",
                        fontSize: 14,
                    }}
                >
                    {item.labelCiudad}
                </span>
            </Card.Meta>
        </Card.Content>
    </Card>
    )
}
