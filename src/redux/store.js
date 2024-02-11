import {configureStore} from '@reduxjs/toolkit'

import taskSlice from './features/taskSlice'

export const store = configureStore({
    reducer: {

        task:taskSlice
    },
  })