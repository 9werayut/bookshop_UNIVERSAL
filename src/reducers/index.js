import { combineReducers} from 'redux';

//here import reducers to be combine
import { booksReducers } from './booksRecuders';
import { cartReducers } from './cartReducers';

//here combine the reducers
export default combineReducers({
    books: booksReducers,
    cart: cartReducers
});
