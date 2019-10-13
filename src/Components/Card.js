import React from 'react';
import 'rbx/index.css';
import { Card, Dropdown, Button, Content, Media, Title } from 'rbx';

const Product = ({ product, addToCart }) => {
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
                        <Dropdown>
                            <Dropdown.Trigger>
                                <Button>
                                    <span>Going?</span>
                                </Button>
                            </Dropdown.Trigger>
                            <Dropdown.Menu>
                                <Dropdown.Content>
                                <Dropdown.Item onClick={ () => addToCart(product.sku, 'Going') }> Going </Dropdown.Item> 
                                <Dropdown.Item> Not Going </Dropdown.Item> 
                                </Dropdown.Content>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Media.Item>
                    <Media.Item>
                        <Title as="p" size={6}>
                            {product.title}
                        </Title>
                        <Title as="p" subtitle size={6}>
                            {'$' + product.price}
                        </Title>
                    </Media.Item>
                </Media>
                <Content>
                    {product.style}
                </Content>
            </Card.Content>
        </Card>
    )
}

export default Product;