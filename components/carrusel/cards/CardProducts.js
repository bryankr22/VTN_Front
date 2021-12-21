import { Card } from "semantic-ui-react";
import VehicleThumbnail from '../../VehicleThumbnail';
export default function CardProducts({ item }) {
    const pathS3 = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x300/vendetunave/images/vehiculos/";
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
    return (
        <Card as="a" style={{ margin: 5, height: "auto" }}>
            <Card.Content style={{ padding: "0 2px 0 0" }}>
                <a
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
                    style={{ textDecoration: "none" }}
                >
                    <VehicleThumbnail item={item} src={pathS3 + item.nameImage + "." + item.extension} compact small />
                </a>
                <Card.Header style={{ fontSize: 12, marginTop: 30 }}>
                    <a
                        href={"/vehiculo/" + item.url + "-" + item.id}
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
                        href={"/vehiculo/" + item.url + "-" + item.id}
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
                        href={"/vehiculo/" + item.url + "-" + item.id}
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
                        href={"/vehiculo/" + item.url + "-" + item.id}
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
