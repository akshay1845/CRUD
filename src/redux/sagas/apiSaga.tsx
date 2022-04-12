import {  setApi } from "../actions/action";
import {call, takeEvery, put} from 'redux-saga/effects'
import axios from "axios";

const api = async () => {
    // const response = await fetch("https://jsonplaceholder.typicode.com/users")
    // const data  = await response.json();
    // return data

    const data = await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      return response.data;
    });
    // console.log("data from axois", data);
  return data;
}


const dataPost = async (action:any) => {
    const data = action.payload;

    console.log("data from post", data);
    
  return data;
  };

function* fetchApi():any{

    const data = yield call(api)
    
    yield put(setApi(data))

}
export function* ApiCalling(){
    
    yield takeEvery("FETCH_DATA",fetchApi)
}

// export function* AddingData(){

  
    
//     yield takeEvery("ADD_DATA", function* (data:any):any{
//         console.log("from adding data",data.payload);


//         const data1:any = yield call(dataPost, data);
        
//         yield put(addUpdatedData(data1))

//     })
// }