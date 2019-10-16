import React from 'react';
import 'rbx/index.css';
import { Card, Dropdown, Button, Content, Media, Title, Level } from 'rbx';


const displayTime = (time) => {
    console.log(time)
    const times = time.split(":");
    let hours = times[0] > 12 ? times[0] - 12 : times[0];
    hours = (hours == '00') ? 12 : hours
    const minutes = times[1];
    const suffix = times[0] >= 12 ? 'PM' : 'AM';
    console.log(hours)
    return hours + ":" + minutes + " " + suffix;
}



const Product = ({ singleEvent, addToCart }) => {
    return (
        <Card id="eventcard" style = {{height: '720px'}}>
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
                            <b>Cost: </b> {singleEvent.cost}
                          </Level.Item>
                      </Level>
                      <Level>
                        <Level.Item align="left">
                          <b>Date: </b>  {singleEvent.day_of_week},  {(singleEvent.date).toString().replace(/_/g,"/")}
                        </Level.Item>
                      </Level>
                      <Level>
                        <Level.Item align="left">
                          <b>Time: </b> {displayTime(singleEvent.time_start)} - {displayTime(singleEvent.time_end)}
                        </Level.Item>
                      </Level>
                      <Content align="left" style = {{overflowY : 'auto', height:'72px', width: '100%'}}>
                          <b>Location:</b> {singleEvent.location}
                      </Content>
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
                <Content style = {{overflowY : 'auto', height:'70px'}}>
                    {singleEvent.description}
                </Content>
            </Card.Content>
        </Card>
    )
}

export default Product;
