import React from "react";
import fs from "fs";
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

    const staticFiles = fs
        .readdirSync({
            development: 'pages',
            production: './',
        }[process.env.NODE_ENV], { withFileTypes: true })
        .filter((staticPage) => {
            return ![
                "404.js",
                "_app.js",
                "_document.js",
                "_error.js",
                "sitemap.xml.js",
            ].includes(staticPage.name);
        })
        .filter(dirent => !dirent.isDirectory())
        .map((staticPagePath) => {
            return `${baseUrl}/${staticPagePath.name}`;
        });

    const staticSecondFolders = fs
        .readdirSync({
            development: 'pages',
            production: './',
        }[process.env.NODE_ENV], { withFileTypes: true })
        .filter((staticPage) => {
            return ![
                "_app.js",
                "_document.js",
                "_error.js",
                "sitemap.xml.js",
            ].includes(staticPage);
        }).filter(dirent => dirent.isDirectory());

    let staticFolders = [`${baseUrl}/vehiculos`, `${baseUrl}/ficha-tecnica`];
    staticSecondFolders.forEach(file => {
        fs.readdirSync({
            development: `pages/${file.name}`,
            production: './',
        }[process.env.NODE_ENV], { withFileTypes: true })
            .map((staticPagePath) => {
                if (staticPagePath.name !== 'index.js' && staticPagePath.name !== 'detalle' && staticPagePath.name !== 'auth' && staticPagePath.name !== '[id].js') {
                    staticFolders.push(`${baseUrl}/${file.name}/${staticPagePath.name}`);
                }
            });
    });

    const dynamicPages = [];
    const response = await axios.get(`${API_URL}/sitemap`);
    const { vehiculos, ficha_tecnica, preguntas } = await response.data;
    vehiculos.forEach((vehiculo) => {
        dynamicPages.push(`${baseUrl}/vehiculos/detalle/${normalize(vehiculo.title)}-${vehiculo.id}`)
        dynamicPages.push(`${baseUrl}/editar-vehiculo/${vehiculo.id}`)
    });
    ficha_tecnica.forEach((ficha) => {
        dynamicPages.push(`${baseUrl}/ficha-tecnica/detalle/${normalize(ficha.title)}-${ficha.id}`)
    });
    preguntas.forEach((pregunta) => {
        dynamicPages.push(`${baseUrl}/comunidad/detalle/${normalize(pregunta.titulo)}-${pregunta.id}`)
    });

    const staticPages = [...staticFiles, ...staticFolders, ...dynamicPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
            .map((url) => {
                return `
            <url>
              <loc>${url.replace(".js", "")}</loc>
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