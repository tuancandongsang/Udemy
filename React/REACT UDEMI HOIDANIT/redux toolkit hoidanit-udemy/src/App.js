import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import {increment, decrement} from "./redux/slice/counterSlice"
import { useEffect } from 'react';
import { fetchAlllUser } from './redux/slice/userSlice';

function App() {
  const dispatch = useDispatch()
  const count = useSelector(state => state.counter.value)
  const listuser = useSelector(state => state.user.listuser)
  const isloading = useSelector(state => state.user.isloading)
  const iserror = useSelector(state => state.user.iserror)


  useEffect(() =>{
    dispatch(fetchAlllUser())
  }, [])

  if(iserror === true && isloading === false) {
    return (
      <div> something wrong pleasrt try again</div>
    )
  }

  if(iserror === false && isloading === true) {
    return (
      <div> data loading.... </div>
    )
  }
  

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello world with React and Hoi Dan IT!</h1>
        <div>
          <button onClick={() => dispatch(increment())}>increment</button>
          <button onClick={() => dispatch(decrement())}>decrement</button>
        </div>
        <br />
        <div>
          Count = {count}
        </div>
        <div>
        {listuser && listuser.length >0 &&
        listuser.map((item, i) => {
          return (
            <li key={i}>{item.name}</li>
          )
        })
        }
        </div>
      </header>
    </div>
  );
}

export default App;
