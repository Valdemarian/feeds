import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducers';


// удалили "начальное состояние = initial state"
// так как теперь наш редьюсер составной,
// и нам нужны initialState каждого редьюсера.
// Это будет сделано автоматически.
export const store = createStore(rootReducer, applyMiddleware(thunk, logger))

//первым параметром принимается корневой редюсер, вторым middleware, 
//для отслеживания состояния хранилища в консоли.