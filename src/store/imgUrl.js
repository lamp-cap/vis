import { createSlice } from "@reduxjs/toolkit";

const urlStore = createSlice({

  name: "url",  // 模块名称独一无二
  // 初始数据
  initialState: {
    taskList: ['URL']
  },
  // 修改数据的同步方法
  reducers: {
    add(state, action) {
      state.taskList.push(action.payload)
    },
    change(state, action) {
      state.taskList.pop()
      state.taskList.push(action.payload)
    }
  },
});


const { addTaskList } = urlStore.actions;
// 导出修改数据的函数
export { addTaskList };

const { change } = urlStore.actions;
// 导出修改数据的函数
export { change };

const urlReducer = urlStore.reducer;
// 导出reducer
export default urlReducer;

