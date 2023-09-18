import { createSlice } from "@reduxjs/toolkit";

const urlStore = createSlice({

  name: "data2",  // 模块名称独一无二
  // 初始数据
  initialState: {
    dataList2: ['URL']
  },
  // 修改数据的同步方法
  reducers: {
    add(state, action) {
      state.urlList.push(action.payload)
    },
    change2(state, action) {
      state.dataList2.pop()
      state.dataList2.push(action.payload)
    }
  },
});


const { add } = urlStore.actions;
// 导出修改数据的函数
export { add };

const { change2 } = urlStore.actions;
// 导出修改数据的函数
export { change2 };

const urlReducer = urlStore.reducer;
// 导出reducer
export default urlReducer;

