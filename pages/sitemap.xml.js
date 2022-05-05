import axios from 'axios';
import { API_URL } from "../helpers/constants";

const Sitemap = () => { };

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
        return ret.join("").split(" ").join("-").split("%").join("").split("?").join("").split("/").join("").split("&").join("");
    };
})();

export const getServerSideProps = async ({ res }) => {
    const baseUrl = 'https://www.vendetunave.co';

    const staticPages = [
        `/comparar-fichas`,
        `/comparar-vehiculos`,
        `/comparar`,
        `/concesionarios`,
        `/crear-pregunta`,
        `/financiacion`,
        `/index`,
        `/login`,
        `/servicios`,
        `/terminos-y-condiciones`,
        `/restablecer`,
        `/usuario/crear_producto`,
        `/usuario/favoritos`,
        `/usuario/mis_busquedas`,
        `/usuario/mis_publicaciones`,
        `/usuario/perfil`,
        `/vehiculos`,
        `/ficha-tecnica`,
        `/comunidad`,
        `/documentos`
    ];

    const dynamicPages = [];
    const response = await axios.get(`${API_URL}/sitemap`);
    const { vehiculos, ficha_tecnica, preguntas, users } = await response.data;
    vehiculos.forEach((vehiculo) => {
        dynamicPages.push(`/vehiculos/detalle/${normalize(vehiculo.title)}-${vehiculo.id}`)
    });
    users.forEach((user) => {
        dynamicPages.push(`/vehiculos?vendedor=${normalize(user.nombre)}-${user.id}`)
    });
    ficha_tecnica.forEach((ficha) => {
        dynamicPages.push(`/ficha-tecnica/detalle/${normalize(ficha.title)}-${ficha.id}`)
    });
    preguntas.forEach((pregunta) => {
        dynamicPages.push(`/comunidad/detalle/${normalize(pregunta.titulo)}-${pregunta.id}`)
    });

    const pages = [...staticPages, ...dynamicPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
            .map((url) => {
                return `
            <url>
              <loc>${baseUrl}${url.replace(".js", "")}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
            })
            .join("")}
    </urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;