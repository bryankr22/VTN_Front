import { createSlice } from "@reduxjs/toolkit";

const productoSlice = createSlice({
  name: "producto",
  initialState: {
    images: [],
    vehiculo: {
      anio: "",
      blindado_vehiculo: "",
      cilindraje_vehiculo: "",
      ciudad_vehiculo: "",
      color_vehiculo: "",
      combustible_vehiculo: "",
      contacto_vehiculo: "",
      departamento_vehiculo: "",
      descripcion_vehiculo: "",
      estado_vehiculo: "",
      financiacion: false,
      kilometraje_vehiculo: "",
      marca: "",
      modelo: "",
      permuta: false,
      placa_vehiculo: "",
      precio_vehiculo: "",
      promocion: false,
      tipo_precio_vehiculo: "",
      titulo_vehiculo: "",
      tipo_vehiculo: 0,
      tipo_moto: 0,
    },
    imagesAcc: [],
  },
  reducers: {
    addImage(state, action) {
      state.images[action.payload.index] = action.payload.image;
    },
    removeImage(state, action) {
      state.images = [
        ...state.images.slice(0, action.payload),
        ...state.images.slice(action.payload + 1),
      ];
    },
    addImageAcc(state, action) {
      state.imagesAcc[action.payload.index] = action.payload.image;
    },
    updateVehiculo(state, action) {
      state.vehiculo[action.payload.input] = action.payload.value;
    },
    clearForm(state, action) {
      state.vehiculo = {
        anio: "",
        blindado_vehiculo: "",
        cilindraje_vehiculo: "",
        ciudad_vehiculo: "",
        color_vehiculo: "",
        combustible_vehiculo: "",
        contacto_vehiculo: "",
        departamento_vehiculo: "",
        descripcion_vehiculo: "",
        estado_vehiculo: "",
        financiacion: false,
        kilometraje_vehiculo: "",
        marca: "",
        modelo: "",
        permuta: false,
        placa_vehiculo: "",
        precio_vehiculo: "",
        promocion: false,
        tipo_precio_vehiculo: "",
        titulo_vehiculo: "",
        tipo_vehiculo: 0,
        tipo_moto: 0,
      };
      state.images = [];
    },
    setVehicle(state, action) {
      state.vehiculo = {
        ...action.payload,
        marca: action.payload?.marcaId,
        modelo: action.payload?.modelo_id,
        anio: action.payload?.ano,
        descripcion_vehiculo: action.payload?.descripcion,
        titulo_vehiculo: action.payload?.title,
        estado_vehiculo: action.payload?.condicion,
        precio_vehiculo: action.payload?.precio,
        tipo_precio_vehiculo: action.payload?.tipo_precio,
        kilometraje_vehiculo: action.payload?.kilometraje,
        combustible_vehiculo: action.payload?.combustible,
        blindado_vehiculo: action.payload?.blindado,
        color_vehiculo: action.payload?.color,
        transmision_vehiculo: action.payload?.transmision,
        departamento_vehiculo: action.payload?.departamento,
        contacto_vehiculo: action.payload?.contacto,
        ciudad_vehiculo: action.payload?.ciudad_id,
        cilindraje_vehiculo: action.payload?.cilindraje
      };
    },
  },
});
export const {
  addImage,
  addImageAcc,
  removeImage,
  updateVehiculo,
  clearForm,
  setVehicle,
} = productoSlice.actions;
export default productoSlice.reducer;
