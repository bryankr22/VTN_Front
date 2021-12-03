import { Card } from "semantic-ui-react";
import VehicleThumbnail from '../../VehicleThumbnail';
export default function CardProductsDesk({ item }) {
    const pathS3 = "https://d3bmp4azzreq60.cloudfront.net/fit-in/500x500/vendetunave/images/vehiculos/";
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
        <Card
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
                boxShadow: "none",
                textDecoration: "none",
                padding: 10,
            }}
        >
            {item.new_image === 0 && (
                <VehicleThumbnail item={item} src={pathS3 + item.nameImage + "." + item.extension} compact />
            )}
            {item.new_image === 1 && (
                <VehicleThumbnail item={item} src={pathS3 + item.nameImage + "." + item.extension} compact />
            )}
            {item.new_image === 2 && (
                <VehicleThumbnail item={item} src={pathS3 + item.nameImage + ".webp"} compact />
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
