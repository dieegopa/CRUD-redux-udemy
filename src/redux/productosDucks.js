import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//constantes
const initialState = {
  productos: [],
  error: null,
  loading: false,
  productoEliminar: null,
  productoEditar: null,
};

//types
const AGREGAR_PRODUCTO = "AGREGAR_PRODUCTO";
const AGREGAR_PRODUCTO_EXITO = "AGREGAR_PRODUCTO_EXITO";
const AGREGAR_PRODUCTO_ERROR = "AGREGAR_PRODUCTO_ERROR";

const COMENZAR_DESCARGA_PRODUCTOS = "COMENZAR_DESCARGA_PRODUCTOS";
const DESCARGA_PRODUCTOS_EXITO = "DESCARGA_PRODUCTOS_EXITO";
const DESCARGA_PRODUCTOS_ERROR = "DESCARGA_PRODUCTOS_ERROR";

const OBTENER_PRODUCTO_ELIMINAR = "OBTENER_PRODUCTO_ELIMINAR";
const ELIMINAR_PRODUCTO_EXITO = "ELIMINAR_PRODUCTO_EXITO";
const ELIMINAR_PRODUCTO_ERROR = "ELIMINAR_PRODUCTO_ERROR";

const OBTENER_PRODUCTO_EDITADO = "OBTENER_PRODUCTO_EDITADO";
const COMENZAR_EDICION_PRODUCTO = "COMENZAR_EDICION_PRODUCTO";
const EDITAR_PRODUCTO_EXITO = "EDITAR_PRODUCTO_EXITO";
const EDITAR_PRODUCTO_ERROR = "EDITAR_PRODUCTO_ERROR";

//reducer
export default function productosReducer(state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_PRODUCTOS:
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: action.payload,
        productoEliminar: null,
        productoEditar: null,
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        productos: [...state.productos, action.payload],
        error: null,
        productoEliminar: null,
        productoEditar: null,
      };
    case EDITAR_PRODUCTO_ERROR:
    case ELIMINAR_PRODUCTO_ERROR:
    case DESCARGA_PRODUCTOS_ERROR:
    case AGREGAR_PRODUCTO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        productoEliminar: null,
        productoEditar: null,
      };
    case DESCARGA_PRODUCTOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        productos: action.payload,
        productoEliminar: null,
        productoEditar: null,
      };

    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        productoEliminar: action.payload,
      };
    case ELIMINAR_PRODUCTO_EXITO:
      return {
        ...state,
        productos: state.productos.filter(
          (producto) => producto.id !== state.productoEliminar
        ),
        productoEliminar: null,
        productoEditar: null,
      };
    case OBTENER_PRODUCTO_EDITADO:
      return {
        ...state,
        productoEditar: action.payload,
      };
    case EDITAR_PRODUCTO_EXITO:
      return {
        ...state,
        productos: state.productos.map((item) =>
          item.id === action.payload.id ? (item = action.payload) : item
        ),
        productoEditar: null,
        productoEliminar: null,
      };
    default:
      return state;
  }
}

//acciones

//CREAR NUEVOS PRODUCTOS
export const crearNuevoProductoAction =
  (producto) => async (dispatch, getState) => {
    dispatch({
      type: AGREGAR_PRODUCTO,
      payload: true,
    });

    try {
      const { productos } = getState().productos;

      productos.push(producto);

      await clienteAxios.post("/productos", producto);

      dispatch({
        type: AGREGAR_PRODUCTO_EXITO,
        payload: producto,
      });

      Swal.fire("Correcto", "El producto se agrego correctamente", "success");
    } catch (error) {
      //console.log(error);
      dispatch({
        type: AGREGAR_PRODUCTO_ERROR,
        payload: true,
      });

      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };

//descargar los productos de la base de datos
export const obtenerProductosAction = () => async (dispatch) => {
  dispatch({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true,
  });

  try {
    const respuesta = await clienteAxios.get("/productos");
    dispatch({
      type: DESCARGA_PRODUCTOS_EXITO,
      payload: respuesta.data,
    });
  } catch (error) {
    dispatch({
      type: DESCARGA_PRODUCTOS_ERROR,
      payload: true,
    });
  }
};

//eliminar los productos
export const borrarProductoAction = (id) => async (dispatch) => {
  dispatch({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id,
  });

  try {
    await clienteAxios.delete(`/productos/${id}`);

    dispatch({
      type: ELIMINAR_PRODUCTO_EXITO,
    });

    Swal.fire("Eliminado!", "El producto se elimino correctamente", "success");
  } catch (error) {
    dispatch({
      type: ELIMINAR_PRODUCTO_ERROR,
      payload: true,
    });
  }
};

//editar producto
export const obtenerProductoEditar = (producto) => (dispatch) => {
  dispatch({
    type: OBTENER_PRODUCTO_EDITADO,
    payload: producto,
  });
};

export const editarProductoAction = (producto) => async (dispatch) => {
  dispatch({
    type: COMENZAR_EDICION_PRODUCTO,
  });

  try {
    await clienteAxios.put(
      `/productos/${producto.id}`,
      producto
    );
    dispatch({
      type: EDITAR_PRODUCTO_EXITO,
      payload: producto,
    });
  } catch (error) {
    dispatch({
      type: EDITAR_PRODUCTO_ERROR,
      payload: true,
    });
  }
};
