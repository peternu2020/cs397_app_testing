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
        if (content['Going'] !== 0) {
            contents.push([product, 'Going', content['Going']]);
        }
    }

    return (
        <Container>
            <Title>Shopping Cart</Title>
            <Column.Group multiline>
                <Column size='full'>
                </Column>
                {contents.map(content =>
                    <Column size='full' key={content[0].id}>
                        <CartItem product={content[0]} going={content[1]} amount={content[2]} removeFromCart={removeFromCart} />
                    </Column>
                )}
            </Column.Group>
        </Container>
    );
};

export default ShoppingCart;
