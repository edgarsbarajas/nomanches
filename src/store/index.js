import { createStore, applyMiddleware, } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers';

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

export const store = createStore(persistReducer(persistConfig, rootReducer), applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);
