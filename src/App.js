import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./routes";

function App() {

  return (
    <div className="container-fluid px-0">
      <BrowserRouter>
        <MyRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
