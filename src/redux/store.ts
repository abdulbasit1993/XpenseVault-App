import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {persistStore, persistReducer} from 'redux-persist';
import {apiService} from './services';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authState', 'theme'],
};

const rootReducer = combineReducers({
  [apiService.reducerPath]: apiService.reducer,
  authState: authReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(apiService.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
