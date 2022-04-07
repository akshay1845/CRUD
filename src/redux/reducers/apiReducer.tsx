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

    default:
      return state;
  }
};

export default API_Data;
