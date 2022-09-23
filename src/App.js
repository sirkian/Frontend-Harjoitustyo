import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Topbar from "./components/Topbar";
import "./style.css";

function App() {
  return (
    <div className="appContainer">
      <Topbar />
      <div className="appContainer-inner">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
