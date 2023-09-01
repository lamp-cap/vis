import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counterStore'
import urlReducer from './imgUrl'

export default configureStore({
  reducer: {
    // 注册子模块
    counter: counterReducer,
    url: urlReducer
  }
})