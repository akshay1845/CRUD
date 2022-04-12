const intialize: any = {
  Apidata: [],
};
const API_Data = (state = intialize, action: any) => {
  switch (action.type) {
    case "API_DATA":
      // console.log(action.payload, "inside reducer")
      return {
        ...state,
        Apidata: action.payload,
      };

      // case "DATA_ADDED":
      //   console.log("action", action.payload);
      //   // console.log("hello reducer,", ...state.Apidata.pop().id);
          
      //   return { ...state, Apidata: [...state.Apidata, action.payload] }

    default:
      return state;
  }
};

export default API_Data;
