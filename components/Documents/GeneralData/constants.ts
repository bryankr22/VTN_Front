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

export const validateAsNumber = (value: string) => {
  const reg = /^\d+$/;
  return !reg.test(value) ? "Campo debe ser solo números" : undefined;
};

export const guardOptional =
  (...args: Function[]) =>
  (value: string) => {
    if (!value) return true;
    for (const validate of args) {
      const result = validate(value);
      if (typeof result === "string") {
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
