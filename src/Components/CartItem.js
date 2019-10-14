import React from 'react';
import 'rbx/index.css';
import { Card, Button, Content, Media, Title } from 'rbx';

const CartItem = ({ product, going, amount, removeFromCart }) => {
  return (
    <Card>
      <Card.Image>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <img src={`./data/events/${product.id}.jpg`} alt='' />
        </div>
      </Card.Image>
      <Card.Content>
        <Media>
          <Media.Item as="figure" align="left">
            <Button>
              <span>{going}</span>
            </Button>
          </Media.Item>
          <Media.Item>
            <Title as="p" size={6}>
              {product.name}
            </Title>
            <Title as="p" subtitle size={6}>
              {product.date}
            </Title>
          </Media.Item>
        </Media>
        <Content>
          {(amount===1) ? amount+" person is going" : amount+" people are going"}
        </Content>
        <Content>
          {product.location}
        </Content>
        <Button onClick={() => { removeFromCart(product.sku, going); }
        } rounded>
          Remove
          </Button>
      </Card.Content>
    </Card>
  )
}

export default CartItem;
