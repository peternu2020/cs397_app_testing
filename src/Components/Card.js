import React from 'react';
import 'rbx/index.css';
import { Card, Dropdown, Button, Content, Media, Title, Level } from 'rbx';

const Product = ({ singleEvent, addToCart }) => {
    return (
        <Card>
            <Card.Image>
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <img src={`./data/events/${singleEvent.id}.jpg`} alt='' id="eventpic" />
                </div>
            </Card.Image>
            <Card.Content>
                <Media>
                    <Media.Item>
                        <Title as="p" size={6}>
                            {singleEvent.name}
                        </Title>
                        <Level>
                          <Level.Item align="left">
                            cost: {singleEvent.cost}
                          </Level.Item>
                      </Level>
                      <Level>
                        <Level.Item align="left">
                          date: {singleEvent.day_of_week},  {singleEvent.date}
                        </Level.Item>
                      </Level>
                      <Level>
                        <Level.Item align="left">
                          time: {singleEvent.time_start} - {singleEvent.time_end}
                        </Level.Item>
                      </Level>
                    </Media.Item>

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
                </Media>
                <Content>
                    {singleEvent.description}
                </Content>
            </Card.Content>
        </Card>
    )
}

export default Product;
