import React from 'react';
import 'rbx/index.css';
import { Card, Dropdown, Button, Content, Media, Title } from 'rbx';

const Product = ({ singleEvent, addToCart }) => {
    return (
        <Card>
            <Card.Image>
                <div style={{ textAlign: 'center', width: '100%' }}>
                    {console.log("in card")}
                    {console.log(singleEvent)}
                    <img src={`./data/events/${singleEvent.id}.jpg`} alt='' />
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
                                <Dropdown.Item onClick={ () => addToCart(singleEvent.id, 'Going') }> Going </Dropdown.Item>
                                <Dropdown.Item> Not Going </Dropdown.Item>
                                </Dropdown.Content>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Media.Item>
                    <Media.Item>
                        <Title as="p" size={6}>
                            {singleEvent.name}
                        </Title>
                        <Title as="p" subtitle size={6}>
                            {singleEvent.cost}
                        </Title>
                    </Media.Item>
                </Media>
                <Content>
                    {singleEvent.description}
                </Content>
            </Card.Content>
        </Card>
    )
}

export default Product;
