import {all} from "redux-saga/effects"
import {ApiCalling, AddingData} from '../sagas/apiSaga'

export default function* rootSaga(){
    yield all([ApiCalling(), AddingData()])
}