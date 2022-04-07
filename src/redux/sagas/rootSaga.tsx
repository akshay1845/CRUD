import {all} from "redux-saga/effects"
import {ApiCalling} from '../sagas/apiSaga'

export default function* rootSaga(){
    yield all([ApiCalling()])
}