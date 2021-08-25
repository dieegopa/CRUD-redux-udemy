//data inicial
const initialState = {
  alerta: null,
};

//types
const MOSTRAR_ALERTA = "MOSTRAR_ALERTA";
const OCULTAR_ALERTA = "OCULTAR_ALERTA";

//reducer
export default function alertasReducer(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        alerta: action.payload,
      };
    case OCULTAR_ALERTA:
      return {
        ...state,
        alerta: null, 
      };
    default:
      return state;
  }
}

//acciones
export const mostrarAlertaAction = (alerta) => (dispatch) => {
  dispatch({
    type: MOSTRAR_ALERTA,
    payload: alerta,
  });
};

export const ocultarAlertaAction = () => (dispatch) => {
  dispatch({
    type: OCULTAR_ALERTA,
  });
};
