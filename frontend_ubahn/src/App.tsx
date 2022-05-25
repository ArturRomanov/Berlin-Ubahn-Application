import GlobalStyle from "./styles/global"
import LinesContainer from "./components/LinesContainer/LinesContainer";
import LinesState from "./context/Lines/LinesState";

function App() {
  return (
    <LinesState>
    <div className="App">
      <GlobalStyle />
        <LinesContainer />
    </div>
    </LinesState>
  );
}

export default App;
