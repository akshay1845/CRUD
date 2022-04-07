export const callApi = {
    type: "FETCH_DATA"
 }
 
 export const  setApi = (data:any) => {
     return {
         type:"API_DATA",
         payload: data
     } 
 }