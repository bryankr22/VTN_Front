export const required = "Campo requerido";
export const VEHICLE_CLASS = [
  "Automovil",
  "Camioneta",
  "Campero",
  "Motocicleta",
  "Motocarro",
  "Cuatrimoto",
  "Tractocamión",
  "Mototriciclo",
  "Camión",
  "Bus",
  "Buseta",
  "Microbus",
  "Volqueta",
  "Otro",
];

export const TYPE_ARMOR = {
  Automovil: [
    "Sedán",
    "Coupé",
    "Buggy",
    "Convertible",
    "Limosina",
    "Station Wagon",
    "Hatchback",
  ],
  Bus: ["Escalera - Chiva Abierta", "Cerrado", "Artiulado", "Biarticulado"],
  Buseta: ["Escalera - Chiva Abierta", "Cerrado"],
  ["Camión"]: [
    "Estacas",
    "Furgón",
    "Tanque",
    "Grúa",
    "Reparto",
    "Planchón Plataforma",
    "Recolector compactado",
    "Estibas",
    "Portacontenedor",
    "Estibas",
    "Bomba de concreto",
    "Casa rodante",
    "Tolva",
    "Niñera",
    "Bomberos",
    "Barredora",
    "Mixer",
    "Limpieza de alcantarillas",
    "Taladro",
    "Cañero",
    "Ambulancia",
  ],
  Camioneta: [
    "Estacas",
    "Furgón",
    "Reparto",
    "Estibas",
    "Panel",
    "Van",
    "Pico",
    "Doble Cabina",
    "Pico Cerrada",
    "Doble Cabina Cerrada",
    "Ambulancia",
    "Wagon",
  ],
  Campero: ["Cabinado", "Carpado", "Dual (cabinado - carpado)", "Wagon"],
  Microbus: ["Cerrado"],
  ["Tractocamión"]: ["Sin carroceria"],
  Motocicleta: ["Sin carroceria"],
  Motocarro: [
    "Estacas",
    "Furgón",
    "Reparto",
    "Panel",
    "Pico",
    "Cabinado",
    "Carpado",
  ],
  Mototriciclo: ["Sin carroceria"],
  Cuatrimoto: ["Sin carroceria"],
  Volqueta: ["Platón"],
};
export const SERVICES = ["", "Particular", "Público"];

export const validateAsNumber = (value?: any) => {
  if (!value) return;
  const reg = /^\d+$/;
  return !reg.test(value) ? "Campo debe ser solo números" : undefined;
};

export const guardOptional =
  (...args: Function[]) =>
  (value: string) => {
    if (!value) return;
    for (const validate of args) {
      const result = validate(value);
      if (typeof result !== "string") {
        continue;
      }
      return result;
    }
  };

export const getStatusError = (message?: string): any => {
  return {
    color: message ? "error" : "default",
    status: message ? "error" : "default",
    helperColor: "error",
    helperText: message,
  };
};
