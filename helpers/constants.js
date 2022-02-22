export const API_URL = 'https://api.vendetunave.co/api';
//export const API_URL = 'http://vendetunave_api.test/api';
export const AUTH_URL = 'https://api.vendetunave.co/auth';
export const home = '/home';
export const config = '/config';

export const validateRecaptcha = '/api/auth/recaptcha'


export const vehiculos = '/vehiculos';
export const fichas_tecnicas = '/fichas_tecnicas';
export const accesorios = '/accesorios';

export const servicios_api = '/servicios';
export const concesionarios_api = '/concesionarios';
export const comunidad_api = '/comunidad';
export const get_modelos = '/modelos/';
export const GET_BRANDS = `${API_URL}/marcas/:id`
export const login_api = '/login';
export const register_api = '/register';

export const download_ficha = '/comparar_ficha_pdf';
export const download_vehiculo = '/comparar_vehiculo_pdf';

export const perfil_api = '/profile/';
export const publicaciones_api = '/publicaciones/';
export const favoritos_api = '/favoritos/';
export const busquedas_api = '/busquedas/';
export const busquedas_remove = '/busqueda_remove';
export const comment_api = '/comment';
export const newsletter_api = '/newsletter';
export const favoritos_add = '/favoritos';
export const favoritos_add_vehiculo = '/favoritos_vehiculo';

export const favoritos_remove_vehiculo = '/remove_favorito_vehiculo';
export const favoritos_remove_ficha = '/remove_favorito_ficha';
export const perfil_update = '/profile_update';

export const PRICES_FILTER = [
  { label: "Hasta $10.000.000", slug: "0:10000000" },
  { label: "$10.000.000 a $20.000.000", slug: "10000000:20000000" },
  { label: "$20.000.000 a $35.000.000", slug: "20000000:35000000" },
  { label: "$35.000.000 a $50.000.000", slug: "35000000:50000000" },
  { label: "$50.000.000 a $100.000.000", slug: "50000000:100000000" },
  { label: "$100.000.000 a $125.000.000", slug: "100000000:125000000" },
  { label: "$125.000.000 a $150.000.000", slug: "125000000:150000000" },
  { label: "$150.000.000 a $175.000.000", slug: "150000000:175000000" },
  { label: "$175.000.000 a $200.000.000", slug: "175000000:200000000" },
  { label: "$200.000.000 a $250.000.000", slug: "200000000:250000000" },
  { label: "$250.000.000 a $300.000.000", slug: "250000000:300000000" },
  { label: "$300.000.000 a $350.000.000", slug: "300000000:350000000" },
  { label: "$350.000.000 a $400.000.000", slug: "350000000:400000000" },
  { label: "Más de $400.000.000", slug: "400000000:0" },
];

export const KM_FILTER = [
  { label: "De 0 a 5.000", slug: "0:5000" },
  { label: "De 5.000 a 10.000", slug: "5000:10000" },
  { label: "De 10.000 a 20.000", slug: "10000:20000" },
  { label: "De 20.000 a 30.000", slug: "20000:30000" },
  { label: "De 30.000 a 45.000", slug: "30000:45000" },
  { label: "De 45.000 a 70.000", slug: "45000:70000" },
  { label: "De 70.000 a 100.000", slug: "70000:100000" },
  { label: "De 100.000 a 150.000", slug: "100000:150000" },
  { label: "Más de $150.000", slug: "150000:0" },
];


export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
export const RECAPTCHA_SECRET_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY
