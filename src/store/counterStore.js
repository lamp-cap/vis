import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({

  name: "counter",  // 模块名称独一无二
  // 初始数据
  initialState: {
    taskList: ['/static/media/img5.c9196758d1ded4b635f4.png']
  },
  // 修改数据的同步方法
  reducers: {
    addTaskList(state, action) {
      state.taskList.push(action.payload)
    },
    changeTaskList(state, action) {
      state.taskList.pop()
      state.taskList.push(action.payload)
    }
  },
});


const { addTaskList } = counterStore.actions;
// 导出修改数据的函数
export { addTaskList };

const { changeTaskList } = counterStore.actions;
// 导出修改数据的函数
export { changeTaskList };

const counterReducer = counterStore.reducer;
// 导出reducer
export default counterReducer;

