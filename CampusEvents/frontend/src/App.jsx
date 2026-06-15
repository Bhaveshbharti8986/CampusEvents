import { BrowserRouter as Router } from "react-router-dom";
// import AppRoutes from "./routers/AppRoutes"
// import AuthRoutes from "./routers/AuthRoutes";
import AppRoutes from "./routers/AppRoutes";

function App() {
  return (
    <Router>
<AppRoutes />
    </Router>
  );
}

export default App;
