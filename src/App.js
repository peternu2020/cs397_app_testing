import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Column, Container, Navbar, Button, Icon, Modal, Box } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Product from './Components/Card';
import Cart from './Components/Cart';

const App = () => {
  const [data, setData] = useState({});
  const [cartActive, setCart] = useState(false);
  const [cartInfo, setCartInfo] = useState([]);
  const [inventory, setInventory] = useState({});

  useEffect(() => {
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
        'S': 0,
        'M': 0,
        'L': 0,
        'XL': 0,
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
        'S': 0,
        'M': 0,
        'L': 0,
        'XL': 0,
      });
      cartInfo[index][size] = cartInfo[index][size] > 0 ? cartInfo[index][size] - 1 : 0;
    }
    setCartInfo(cartInfo);
    renderUpdate();
  };

  const computeRemaining = (productId) => {
    const index = inCart(productId);
    const remaining = {
      'S': inventory[productId] ? (index === -1 ? (inventory[productId]['S']) : (inventory[productId]['S'] - cartInfo[index]['S'])) : 0,
      'M': inventory[productId] ? (index === -1 ? (inventory[productId]['M']) : (inventory[productId]['M'] - cartInfo[index]['M'])) : 0,
      'L': inventory[productId] ? (index === -1 ? (inventory[productId]['L']) : (inventory[productId]['L'] - cartInfo[index]['L'])) : 0,
      'XL': inventory[productId] ? (index === -1 ? (inventory[productId]['XL']) : (inventory[productId]['XL'] - cartInfo[index]['XL'])) : 0,
    };
    return remaining;
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
        {products.map(product =>
          <Column size='one-third'>
            <Product product={product} addToCart={addCartItem} remaining={ computeRemaining(product.sku) } />
          </Column>
        )}
      </Column.Group>
    </Container>
  );
};
export default App;