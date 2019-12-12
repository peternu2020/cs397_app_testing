import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Column, Container, Navbar, Button, Icon, Modal, Box, Dropdown, Tag } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import Product from './Components/Card';
import Cart from './Components/Cart';
import firebase from 'firebase/app';
import MyEvents from './Components/MyEvents';
import SignInPrompt from './Components/SignInPrompt';
import 'firebase/database';
import {db} from './Components/EventTemplate';

var firebaseConfig = {
  apiKey: "AIzaSyBWH38HPQ857TYu82B8wzufC8sK4yMOTco",
  authDomain: "hungrycats-ad46c.firebaseapp.com",
  databaseURL: "https://hungrycats-ad46c.firebaseio.com",
  projectId: "hungrycats-ad46c",
  storageBucket: "hungrycats-ad46c.appspot.com",
  messagingSenderId: "684059161523",
  appId: "1:684059161523:web:225ae9c7b51eaf653b51c6"
};
//firebase.initializeApp(firebaseConfig);


const App = () => {
  const [data, setData] = useState({});
  const [cartActive, setCart] = useState(false);
  const [eventsActive, setMyEvents] = useState(false);
  const [cartInfo, setCartInfo] = useState([]);
  const [inventory, setInventory] = useState({});
  const [eventList, setEvents] = useState({});
  const [filteredList, setFilter] = useState({});
  const [activeDay, setDay] = useState('All Days');
  const [activeCost, setCost] = useState('All Costs');
  const [activeTime, setTime] = useState('All Times');
  const [userName, setUserName] = useState("");
  const db = firebase.database();
  const datetonum = (date, time) => {
    return Number(date[0])*10000 + Number(date[1])*100 + (Number(date[2])-2018)*1000000 + Number(time[0])*4 + Number(time[1])/10
  }

  useEffect(() => {
    const ref = db.ref('/')
    console.log(ref)
    ref.on('value', (snapshot) =>
    {
      if (snapshot.val()) {
        const data = snapshot.val()
        console.log('data')
        console.log(data)
        const date = ""
        const time = ""
        const timesorter = []
        const keys = Object.keys(data)
        for (i in keys){
          console.log(keys[i])
          console.log(data[keys[i]])
        }
        for (i in keys){
          const date = data[keys[i]].date.split('/');
          const time = data[keys[i]].time_start.split(':');
          timesorter.push([data[keys[i]], datetonum(date, time)]);
        }
        timesorter.sort((a,b) => a[1] - b[1])
        console.log('timesorter')
        console.log(timesorter)
        const currentDate = new Date();

        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        const dateString = (month + 1) + "/" + day + "/" + year;
        console.log(dateString)
        const today = datetonum(dateString.split('/'),["0","0"])
        const nopastevents = timesorter.filter(a => a[1] > today)
        const sorteddata = nopastevents.map(event => event[0])
        console.log(today)
        console.log(sorteddata)
        setEvents(sorteddata);
        setFilter(sorteddata);
      }
      else
        console.log("no data.")

    });
    // const fetchInventory = async () => {
    //   const response = await fetch('./data/items.json');
    //   const json = await response.json();
    //   setInventory(json);
    // };
    //
    // fetchInventory();
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

  const events = Object.values(eventList)

  const filteredEvents = Object.values(filteredList)

  const id2product = {}
  let i;
  for (i = 0; i < events.length; i += 1) {
    id2product[events[i].id] = events[i];
  }

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const response = await fetch('./data/products.json');
  //     const json = await response.json();
  //     setData(json);
  //   };
  //   fetchProducts();
  // }, []);

  const addCartItem = (productId, size) => {
    const index = inCart(productId);
    if (index !== -1) {
      cartInfo[index][size] += 1;
    }
    else {
      cartInfo.push({
        productId: productId,
        product: id2product[productId],
        'Going': 0,
        'Not Going': 0
      });
      cartInfo[cartInfo.length - 1][size] += 1;
    }
    setCartInfo(cartInfo);
    setCart(true);
    renderUpdate();
    {console.log(cartInfo)}
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
        'Going': 0,
        'Not Going': 0
      });
      cartInfo[index][size] = cartInfo[index][size] > 0 ? cartInfo[index][size] - 1 : 0;
    }
    setCartInfo(cartInfo);
    renderUpdate();
  };

  const timeToMins = (time) => {
    const hrnmins = time.split(":")
    return Number(hrnmins[0])*60+Number(hrnmins[1])
  }

  const meal = (time) => {
    if (timeToMins(time) <= timeToMins("10:00"))
      return 'Breakfast'
    else if (timeToMins(time) >= timeToMins("16:00"))
      return 'Dinner'
    else {
      return 'Lunch'
    }
  }

  const filterItems = (day, cost, time) => {
    if(day === 'All Days' && cost === 'All Costs' && time == 'All Times')
      setFilter(events)
    else if (cost === 'All Costs' && time === 'All Times') {
      setFilter(events.filter(event => {
        return event.day_of_week === day
        }))
    }
    else if (day === 'All Days' && time == 'All Times') {
      setFilter(events.filter(event => {
        if (cost === 'Free')
          return event.cost === 'Free'
        else
          return event.cost !== 'Free'
      }))
    }
    else if (day === 'All Days' && cost === 'All Costs') {
      setFilter(events.filter(event => {
        return meal(event.time_start) === time
      }))
    }
    else if (time == 'All Times'){
      setFilter(events.filter(event => {
        if (cost === 'Free')
          return event.day_of_week === day && event.cost === 'Free'
        else
          return event.day_of_week === day && event.cost !== 'Free'
      }))
    }
    else if (day == 'All Days'){
      setFilter(events.filter(event => {
        if (cost === 'Free')
          return meal(event.time_start) === time && event.cost === 'Free'
        else
          return meal(event.time_start) === time && event.cost !== 'Free'
      }))
    }
    else if (cost == 'All Costs'){
      setFilter(events.filter(event => {
        return meal(event.time_start) === time && event.day_of_week === day
      }))
    }
    else {
      setFilter(events.filter(event => {
        if (cost === 'Free')
          return meal(event.time_start) === time && event.cost === 'Free' && event.day_of_week === day
        else
          return meal(event.time_start) === time && event.cost !== 'Free' && event.day_of_week === day
      }))
    }
    }


  const DayFilter = ({ state }) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'All Days']
    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button data-cy="day_filter">
            <span>{activeDay}</span>
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Content>
            {days.map(day =>
              <Dropdown.Item
                onClick={() => {
                  setDay(day)
                  filterItems(day, activeCost, activeTime)
                }}
              >
                {day}
              </Dropdown.Item>
            )}
          </Dropdown.Content>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  const CostFilter = ({ state }) => {
    const costs = ['Free', 'Not Free', 'All Costs']
    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button>
            <span>{activeCost}</span>
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Content>
            {costs.map(cost =>
              <Dropdown.Item
                onClick={() => {
                  setCost(cost)
                  filterItems(activeDay, cost, activeTime)
                }}
              >
                {cost}
              </Dropdown.Item>
            )}
          </Dropdown.Content>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  const TimeFilter = ({ state }) => {
    const times = ['Breakfast', 'Lunch', 'Dinner', 'All Times']
    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button>
            <span>{activeTime}</span>
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Content>
            {times.map(time =>
              <Dropdown.Item
                onClick={() => {
                  setTime(time)
                  filterItems(activeDay, activeCost, time)
                }}
              >
                {time}
              </Dropdown.Item>
            )}
          </Dropdown.Content>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  return (
    <Container as='div' style={{ width: '100%', paddingTop: '20px' }}>
      <Navbar fixed='top' as='div' style={{ paddingLeft: '60px', paddingRight: '50px', paddingTop: '10px', width: '80%', }}>
        <Navbar.Brand>
          <Navbar.Item>
            <h1 style={{ fontSize: '24px' }}><strong>Events</strong></h1>
          </Navbar.Item>
          <Navbar.Item>
            <Button color='black' onClick={() => setCart(true)}>
              <Icon>
                <FontAwesomeIcon icon={faUtensils} />
              </Icon>
            </Button>
          </Navbar.Item>
          <Navbar.Item>
            <Button color='black' onClick={() => setMyEvents(true)}>
              <Icon>
                <FontAwesomeIcon icon={faCalendarPlus} />
              </Icon>
            </Button>
          </Navbar.Item>
        </Navbar.Brand>
        <DayFilter />
        <CostFilter />
        <TimeFilter />
        <Navbar.Item>
        <SignInPrompt userName={userName} onButtonClick={setUserName} />
        </Navbar.Item>
        <Navbar.Item>
        <Tag>{userName ? "Logged in as user:" + userName : "Guest User"}</Tag>
        </Navbar.Item>
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
      <Modal active={eventsActive}>
        <Modal.Background />
        <Modal.Content>
          <Box>
            <MyEvents></MyEvents>
          </Box>
        </Modal.Content>
        <Modal.Close onClick={() => setMyEvents(false)} />
      </Modal>
      <Column.Group multiline>
        <Column size='full'>
        </Column>
        {filteredEvents.map(singleEvent =>
          <Column size='one-third'>
            <Product singleEvent={singleEvent} addToCart={addCartItem} />
          </Column>
        )}
      </Column.Group>
    </Container>
  );
};
export default App;
