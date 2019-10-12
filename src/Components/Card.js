import React from 'react';
import 'rbx/index.css';
import { Card, Dropdown, Button, Content, Media, Title } from 'rbx';

const Product = ({ product, addToCart, remaining }) => {
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
                                    <span>Size</span>
                                </Button>
                            </Dropdown.Trigger>
                            <Dropdown.Menu>
                                <Dropdown.Content>
                                { remaining['S'] !== 0 ? <Dropdown.Item disabled={ remaining['S'] !=- 0 } onClick={ () => addToCart(product.sku, 'S') }>Size: S - { remaining['S'] } Remaining</Dropdown.Item> : null }
                                { remaining['M'] !== 0 ? <Dropdown.Item disabled={ remaining['M'] !=- 0 } onClick={ () => addToCart(product.sku, 'M') }>Size: M - { remaining['M'] } Remaining</Dropdown.Item> : null }
                                { remaining['L'] !== 0 ? <Dropdown.Item disabled={ remaining['L'] !=- 0 } onClick={ () => addToCart(product.sku, 'L') }>Size: L - { remaining['L'] } Remaining</Dropdown.Item> : null }
                                { remaining['XL'] !== 0 ? <Dropdown.Item disabled={ remaining['XL'] !=- 0 } onClick={ () => addToCart(product.sku, 'XL') }>Size: XL - { remaining['XL'] } Remaining</Dropdown.Item> : null }
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