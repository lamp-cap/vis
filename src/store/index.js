import { configureStore } from '@reduxjs/toolkit'

import referImgReducer from './referImgUrl'
import data1Reducer from './data1'
import data2Reducer from './data2'

export default configureStore({
  reducer: {
    // 注册子模块
    counter: referImgReducer,
    data1: data1Reducer,
    data2: data2Reducer
  }
})
