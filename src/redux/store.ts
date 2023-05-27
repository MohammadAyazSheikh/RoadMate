import { combineReducers, configureStore, } from '@reduxjs/toolkit'

import userReducer from './features/user/userSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
  },
  //added this line because when passing Date object to the reducer it is throwing error 
  //"A non-serializable value was detected in an action,"
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

export default store;


//have to add below 2 lines in typescript


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


