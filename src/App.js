import { useEffect, useState } from "react";
import useClippy from "use-clippy";

import "./App.css";
import Trash from "./assets/ic-trash.png";
import Copy from "./assets/ic-copy.png";
import Clipboard from "./assets/ic-clipboard.png";

function App() {
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState("");
  const [clipboard, setClipboard] = useClippy();

  useEffect(() => {
    loadList();
  }, []);

  useEffect(() => {
    saveList(list);
  }, [list]);

  const loadList = () => {
    const loaded = JSON.parse(localStorage.getItem("clipboard"));
    setList(Array.isArray(loaded) ? loaded : []);
  };

  const saveList = (_list) => {
    localStorage.setItem("clipboard", JSON.stringify(_list));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!!current) {
      setList([...list, current]);
      setCurrent("");
    }
  };

  const onRemoveElement = (e, item) => {
    e.preventDefault();
    setList(list.filter((el) => el !== item));
  };

  const onSelectItem = (el) => {
    setClipboard(el);
    // alert(`Coppied: ${clipboard}`);
  };

  return (
    <div className="container">
      <div className="frame">
        <form onSubmit={onSubmit}>
          <div className="header">
            <input
              placeholder=" Save something..."
              className="input"
              value={current}
              onChange={({ target: { value } }) => setCurrent(value)}
            />
          </div>
        </form>

        <div>
          {list.length > 0 ? (
            list.map((el, i) => (
              <div key={i} className="item">
                <div
                  className="clickable"
                  onClick={() => {
                    onSelectItem(el);
                  }}
                >
                  <img src={Copy} width="24" alt="copy" /> {el}
                </div>
                <button
                  className="delete"
                  onClick={(e) => onRemoveElement(e, el)}
                >
                  <img src={Trash} width="24" alt="delete" />
                </button>
              </div>
            ))
          ) : (
            <div className="empty">
              <img src={Clipboard} alt="cliboard" />
              <div>Your clipboard is empty !</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
