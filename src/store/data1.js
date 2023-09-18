import { createSlice } from "@reduxjs/toolkit";

const urlStore = createSlice({

  name: "data1",  // 模块名称独一无二
  // 初始数据
  initialState: {
    dataList1: ['URL']
  },
  // 修改数据的同步方法
  reducers: {
    add(state, action) {
      state.urlList.push(action.payload)
    },
    change1(state, action) {
      state.dataList1.pop()
      state.dataList1.push(action.payload)
    }
  },
});


const { add } = urlStore.actions;
// 导出修改数据的函数
export { add };

const { change1 } = urlStore.actions;
// 导出修改数据的函数
export { change1 };

const urlReducer = urlStore.reducer;
// 导出reducer
export default urlReducer;

