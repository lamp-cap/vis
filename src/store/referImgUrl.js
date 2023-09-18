import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({

  name: "UrlCounter",  // 模块名称独一无二
  // 初始数据
  initialState: {
    imgUrl: ['/static/media/img5.c9196758d1ded4b635f4.png']
  },
  // 修改数据的同步方法
  reducers: {
    addUrl(state, action) {
      state.Url.push(action.payload)
    },
    changeUrl(state, action) {
      state.imgUrl.pop()
      state.imgUrl.push(action.payload)
    }
  },
});

const { changeUrl } = counterStore.actions;
// 导出修改数据的函数
export { changeUrl };

const counterReducer = counterStore.reducer;
// 导出reducer
export default counterReducer;

