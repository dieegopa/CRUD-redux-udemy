import React from "react";
import Producto from "./Producto";
import { obtenerProductosAction } from "../redux/productosDucks";
import { useDispatch, useSelector } from "react-redux";

const Productos = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const cargarProductos = () => dispatch(obtenerProductosAction());

    cargarProductos();
    // eslint-disable-next-line
  }, []);

  const productos = useSelector((store) => store.productos.productos);
  const error = useSelector((store) => store.productos.error);
  const cargando = useSelector((store) => store.productos.loading);

  return (
    <>
      <h2 className="text-center my-5">Listado de Productos</h2>
      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un error
        </p>
      ) : null}

      {cargando ? <p className="text-center">Cargando</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td col-span="3">No hay productos</td>
            </tr>
          ) : (
            productos.map((item) => <Producto key={item.id} producto={item} />)
          )}
        </tbody>
      </table>
    </>
  );
};

export default Productos;
