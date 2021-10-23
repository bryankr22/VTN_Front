export interface BuySellingFields {
  user_id: number;
  nombre_vendedor: string;
  documento_vendedor: string;
  direccion_vendedor: string;
  tel_vendedor: string;
  clase_vehiculo: string;
  marca: string;
  modelo: string;
  ano: number;
  tipo_carroceria: string;
  color: string;
  numero_motor: string;
  numero_chasis: string;
  placa: string;
  precio: number;
  nombre_comprador: string;
  documento_comprador: string;
  direccion_comprador: string;
  tel_comprador: string;
  numero_serie: string;
  numero_puertas: string;
  capacidad: string;
  servicio: string;
  clausulas: string;
}

export interface Marca {
  id: number;
  nombre: string;
  categoria_id: number;
  visibility: number;
  url: string;
}

export interface Modelo {
  id: number;
  marca_id: number;
  nombre: string;
  tipo_id: number;
}

export interface ClaseVehiculo {
  id: number;
  name: string;
}

export interface Carroceria {
  id: number;
  name: string;
  id_vehicle_class: number;
}

export interface ResponseLists {
  marcas: Marca[];
  modelos: Modelo[];
  clase_vehiculo: ClaseVehiculo[];
  carroceria: Carroceria[];
}
