import './App.css';
import * as React from 'react';
import { Container} from 'react-bootstrap';
import HeaderNav from './components/HeaderNav';
import FriendInput from './components/FriendInput';
import FriendTable from './components/FriendTable';
import { useState } from 'react';

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0)
  const [friendList, setFriendList] = useState([]);

  return (
    <div className="App">
    <Container>
      <HeaderNav></HeaderNav>
      <FriendInput name={name} setName={setName} age={age} setAge={setAge} friendList={friendList} setFriendList={setFriendList}></FriendInput>
      <FriendTable friendList={friendList} setFriendList={setFriendList}></FriendTable>
    </Container>
    </div>
  );
}

export default App;
