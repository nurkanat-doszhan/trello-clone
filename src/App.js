import { useEffect, useState } from 'react';
import './App.css';
import Board from './Boards/Board';

const rndColor = () => {
  let newColor = '';
  for(let i = 0; i < 6; i++) {
    newColor += Math.floor(Math.random() * 9)
  }
  return newColor;
}

function App() {

  useEffect(() => {
    for(let i=0; i<localStorage.length; i++) {
      setBoard([...board, {
        title: localStorage.getItem(localStorage.key(i)),
        background: localStorage.key(i)
      }])
      console.log(localStorage.getItem(localStorage.key(i)), localStorage.key(i))
    }
    
    // setBoard([...board, {
    //   title: localStorage.getItem(localStorage.key(v)),
    //   background: localStorage.key(v)
    // }])
  }, [])

  const items = { ...localStorage };

  const createNewBoard = (e) => {
    let color = rndColor()
    setBoard([...board, {title: inputBoardName, background: color}])
    localStorage.setItem(color, inputBoardName)
  }

  const [inputBoardName, setInputBoardName] = useState('')
  const [board, setBoard] = useState([])

  return (
    <div className="App">
      <div className="main">
        <div className='container'>
          <img src='logo192.png' className="App-logo my-4" alt="logo" />
          <div className='d-flex mt-4'>
            <input className='form-control form-control-lg w-50 me-2' defaultValue={inputBoardName}
              onChange={e => setInputBoardName(e.target.value)} type="text"
              placeholder='Введите название доски' />
            <button className='btn btn-success btn-lg' onClick={() => createNewBoard()}
              disabled={
              inputBoardName !== inputBoardName.trim() || inputBoardName == ''
              ? true : false}>Создать доску</button>
          </div>
          <div className='d-flex mt-4 flex-wrap'>
            {
              board.length == 0 ?
                <h1 className='fs-1 fw-light text-black-50 mx-auto text-dark'>
                  Empty <i className="bi-x-lg fs-3"></i>
                </h1> :
              board.map((i, v) => {
                return (
                  <Board key={v}
                    title={localStorage.getItem(localStorage.key(v))}
                    background={localStorage.key(v)}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
