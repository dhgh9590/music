import { configureStore, createSlice } from '@reduxjs/toolkit'

let data = createSlice({
  name: "data",
  initialState: {},
  reducers : {
      detailData(state,action){
          state.data = action.payload
      }
  }
})
export let {detailData} = data.actions

export default configureStore({
  reducer: { data : data.reducer }
}) 