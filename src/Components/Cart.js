import React from 'react';
import 'rbx/index.css';
import { Title, Column, Container } from 'rbx';
import CartItem from './CartItem';

const ShoppingCart = ({ cartInfoContent, removeFromCart }) => {
    const contents = [];
    let i;
    for (i = 0; i < cartInfoContent.length; i += 1) {
        const content = cartInfoContent[i];
        const product = content.product;
        if (content['S'] !== 0) {
            contents.push([product, 'S', content['S']]);
        }
        if (content['M'] !== 0) {
            contents.push([product, 'M', content['M']]);
        }
        if (content['L'] !== 0) {
            contents.push([product, 'L', content['L']]);
        }
        if (content['XL'] !== 0) {
            contents.push([product, 'XL', content['XL']]);
        }
    }

    return (
        <Container>
            <Title>Shopping Cart</Title>
            <Column.Group multiline>
                <Column size='full'>
                </Column>
                {contents.map(content =>
                    <Column size='full' key={content[0].sku}>
                        <CartItem product={content[0]} size={content[1]} amount={content[2]} removeFromCart={removeFromCart} />
                    </Column>
                )}
            </Column.Group>
        </Container>
    );
};

export default ShoppingCart;