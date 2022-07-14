import { NavSection } from "./components/NavSection";
import { MainRoutes } from "./routes";
import "./App.css";

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
