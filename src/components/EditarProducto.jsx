import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../redux/productosDucks";
import { useHistory } from "react-router-dom";

const EditarProducto = () => {
  const producto = useSelector((store) => store.productos.productoEditar);
  const dispatch = useDispatch();
  const history = useHistory();

  const [productoEditar, setProductoEditar] = React.useState({
    nombre: "",
    precio: "",
  });

  React.useEffect(() => {
    setProductoEditar(producto);
  }, [producto]);

  if (!producto) history.push("/");
  const { nombre, precio } = productoEditar;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || precio <= 0) {
      return;
    }

    dispatch(editarProductoAction(productoEditar));
    history.push("/");
  };

  

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={(e) =>
                    setProductoEditar({
                      ...productoEditar,
                      [e.target.name]: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setProductoEditar({
                      ...productoEditar,
                      [e.target.name]: Number(e.target.value),
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
