import React from "react";
import { crearNuevoProductoAction } from "../redux/productosDucks";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  mostrarAlertaAction,
  ocultarAlertaAction,
} from "../redux/alertasDucks";

const NuevoProducto = ({ history }) => {
  const [nombre, setNombre] = React.useState("");
  const [precio, setPrecio] = React.useState(0);

  const cargando = useSelector((store) => store.productos.loading);
  const error = useSelector((store) => store.productos.error);
  const alerta = useSelector((store) => store.alertas.alerta);
  const dispatch = useDispatch();

  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  const submitNuevoProducto = (e) => {
    e.preventDefault();

    if (!nombre.trim() || precio <= 0) {
      const alerta = {
        msg: "Todos los campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p-3",
      };

      dispatch(mostrarAlertaAction(alerta));

      return;
    }

    dispatch(ocultarAlertaAction());

    agregarProducto({
      nombre,
      precio,
      id: uuidv4(),
    });

    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <form onSubmit={(e) => submitNuevoProducto(e)}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio Producto</label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando ? (
              <p className="mt-4 p-2 text-center">Cargando...</p>
            ) : null}
            {error ? (
              <p className="alert alert-danger p-2 mt-4 text-center">
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
