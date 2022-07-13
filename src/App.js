import "./App.css";
import { NavSection } from "./components/NavSection";
import { MainRoutes } from "./routes";

function App() {
  return (
    <div>
      <NavSection />
      <div className="container">
        <MainRoutes />
      </div>
    </div>
  );
}

export default App;
