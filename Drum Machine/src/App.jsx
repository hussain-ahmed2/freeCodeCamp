import { useState } from "react";
import "./App.css";
import { e, t } from './components/Data';

function App() {
  const [playList, setPlayList] = useState(e); 
  const [display, setDisplay] = useState('Heater Kit');
  const [isHeaterKit, setIsHeaterKit] = useState(true); 

  function handleBtnClick(event, id) {
    event.target.children[0].play();
    setDisplay(id);
  }

  function toggleBank() {
    if (isHeaterKit) {
      setPlayList(t); 
      setDisplay('Smooth Piano Kit');
    } else {
      setPlayList(e); 
      setDisplay('Heater Kit');
    }
    setIsHeaterKit(!isHeaterKit); 
  }

  return (
    <>
      <div id="drum-machine">
        <div className="toggle-container">
          <label className="toggle-label">Bank</label>
          <label className="switch">
            <input type="checkbox" onChange={toggleBank} checked={!isHeaterKit} />
            <span className="slider round"></span>
          </label>
        </div>

        <div id="drum-pad-container">
          {playList.map((el) => (
            <button key={el.keyCode} className="drum-pad" onClick={(event) => handleBtnClick(event, el.id)}>
              {el.keyTrigger}
              <audio className="clip" id={el.keyTrigger} src={el.url}></audio>
            </button>
          ))}
        </div>

        <div id="display">{display}</div>
        <div id="author">by hussain</div>
      </div>
    </>
  );
}

export default App;
