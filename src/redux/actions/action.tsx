export const callApi = {
    type: "FETCH_DATA"
 }
 
 export const  setApi = (data:any) => {
     return {
         type:"API_DATA",
         payload: data
     } 
 }

 export const addData = (newData:object) =>{
     
     return {
         type:"ADD_DATA",
         payload : newData
     }
 }

 export const addUpdatedData = (newData:object) =>{
     
    return {
        type:"DATA_ADDED",
        payload : newData
    }
}