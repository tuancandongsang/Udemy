import { AllPages } from "./routes/index";
import { useRoutes } from "react-router-dom";
import "./App.css";
function App() {
  const allPages = useRoutes(AllPages());
  console.log("tuancan");

  return <>{allPages}</>;
}

export default App;
