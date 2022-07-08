import './App.css';
import Routes from "./routes/routes.js";
import  StoresProvider  from "./stores/StoreProvider";
function App() {
  return (
      <div className="App">
          <StoresProvider>
              <Routes />
          </StoresProvider>
      </div>
  );
}

export default App;
