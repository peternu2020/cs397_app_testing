import React from 'react';
import 'rbx/index.css';
import { Card, Button, Content, Media, Title } from 'rbx';

const CartItem = ({ product, size, amount, removeFromCart }) => {
  return (
    <Card>
      <Card.Image>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <img src={`./data/products/${product.sku}_2.jpg`} alt='' />
        </div>
      </Card.Image>
      <Card.Content>
        <Media>
          <Media.Item as="figure" align="left">
            <Button>
              <span>{'Size: ' + size}</span>
            </Button>
          </Media.Item>
          <Media.Item>
            <Title as="p" size={6}>
              {product.title}
            </Title>
            <Title as="p" subtitle size={6}>
              {'$' + amount * product.price}
            </Title>
          </Media.Item>
        </Media>
        <Content>
          {"Quantity: " + amount}
        </Content>
        <Content>
          {'$' + product.price + ' per item'}
        </Content>
        <Button onClick={() => { removeFromCart(product.sku, size); }
        } rounded>
          Remove
          </Button>
      </Card.Content>
    </Card>
  )
}

export default CartItem;