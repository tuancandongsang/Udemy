import AddItemOfListTodo from "./component/AddItemOfListTodo.jsx";
import ListTodoList from "./component/ListTodoList.jsx";

function Home() {
  return (
    <>
      <div className="outlet-home">
        <AddItemOfListTodo />
        <ListTodoList />
      </div>
    </>
  );
}

export default Home;
