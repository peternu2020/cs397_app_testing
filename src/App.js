import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Column, Container, Navbar, Button, Icon, Modal, Box } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Product from './Components/Card';
import Cart from './Components/Cart';
import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyBWH38HPQ857TYu82B8wzufC8sK4yMOTco",
  authDomain: "hungrycats-ad46c.firebaseapp.com",
  databaseURL: "https://hungrycats-ad46c.firebaseio.com",
  projectId: "hungrycats-ad46c",
  storageBucket: "hungrycats-ad46c.appspot.com",
  messagingSenderId: "684059161523",
  appId: "1:684059161523:web:225ae9c7b51eaf653b51c6"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const App = () => {
  const [data, setData] = useState({});
  const [cartActive, setCart] = useState(false);
  const [cartInfo, setCartInfo] = useState([]);
  const [inventory, setInventory] = useState({});
  const [eventList, setEvents] = useState({});

  useEffect(() => {
    const ref = firebase.database().ref('/')
    console.log(ref)
    ref.on('value', (snapshot) =>
    {
      if (snapshot.val())
        setEvents(snapshot.val());
      else
        console.log("no data.")

    });
    const fetchInventory = async () => {
      const response = await fetch('./data/items.json');
      const json = await response.json();
      setInventory(json);
    };

    fetchInventory();
  }, []);

  const inCart = (productId) => {
    for (i = 0; i < cartInfo.length; i += 1) {
      if (cartInfo[i].productId === productId) {
        return i;
      }
    }
    return -1;
  }

  const useRenderUpdate = () => {
    const [value, set] = useState(true);
    return () => set(value => !value);
  }
  const renderUpdate = useRenderUpdate();

  const products = Object.values(data);

  const events = Object.values(eventList)

  const id2product = {}
  let i;
  for (i = 0; i < products.length; i += 1) {
    id2product[products[i].sku] = products[i];
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  const addCartItem = (productId, size) => {
    const index = inCart(productId);
    if (index !== -1) {
      cartInfo[index][size] += 1;
    }
    else {
      cartInfo.push({
        productId: productId,
        product: id2product[productId],
        'Going': 0,
        'Not Going': 0
      });
      cartInfo[cartInfo.length - 1][size] += 1;
    }
    setCartInfo(cartInfo);
    setCart(true);
    renderUpdate();
  };

  const removeCartItem = (productId, size) => {
    const index = inCart(productId);
    if (index !== -1) {
      cartInfo[index][size] = cartInfo[index][size] > 0 ? cartInfo[index][size] - 1 : 0;
    }
    else {
      cartInfo.push({
        productId: productId,
        product: id2product[productId],
        'Going': 0,
        'Not Going': 0
      });
      cartInfo[index][size] = cartInfo[index][size] > 0 ? cartInfo[index][size] - 1 : 0;
    }
    setCartInfo(cartInfo);
    renderUpdate();
  };

  return (
    <Container as='div' style={{ width: '100%', paddingTop: '20px' }}>
      <Navbar fixed='top' as='div' style={{ paddingLeft: '60px', paddingRight: '50px', paddingTop: '10px' }}>
        <Navbar.Brand>
          <Navbar.Item>
            <h1 style={{ fontSize: '24px' }}><strong>Catalog</strong></h1>
          </Navbar.Item>
          <Navbar.Item>
            <Button color='black' onClick={() => setCart(true)}>
              <Icon>
                <FontAwesomeIcon icon={faShoppingCart} />
              </Icon>
            </Button>
          </Navbar.Item>
        </Navbar.Brand>
      </Navbar>
      <Modal active={cartActive}>
        <Modal.Background />
        <Modal.Content>
          <Box>
            <Cart cartInfoContent={cartInfo} removeFromCart={removeCartItem} />
          </Box>
        </Modal.Content>
        <Modal.Close onClick={() => setCart(false)} />
      </Modal>
      <Column.Group multiline>
        <Column size='full'>
        </Column>
        {console.log("hello")}
        {console.log(events)}
        {events.map(singleEvent =>
          <Column size='one-third'>
            {console.log(singleEvent)}
            <Product singleEvent={singleEvent} addToCart={addCartItem} />
          </Column>
        )}
      </Column.Group>
    </Container>
  );
};
export default App;
