import "./Home.css";
import Header from "../../component/header/Header";
import AddItemOfListTodo from "../../component/AddItemOfListTodo.jsx";
import ListTodoList from "../../component/ListTodoList.jsx";

function Home() {
  return (
    <div className="App home">
      <div className="background"></div>
      <div className="container">
        <Header />
        <AddItemOfListTodo />
        <ListTodoList />
      </div>
    </div>
  );
}

export default Home;
