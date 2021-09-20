import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { useEffect } from 'react';

import AppNavbar from './components/AppNavbar';
import OrderList from './components/OrderList';
import ProductModal from './components/ProductModal';

import { Provider } from 'react-redux'
import { Container } from 'reactstrap';
import store from './store'
import { loadUser } from './actions/authActions'

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <OrderList />
          <ProductModal />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
