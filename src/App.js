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
  // useEffect(() => {
  //   console.log(localStorage.getItem(localStorage.key(0)));
  //   console.log(localStorage.getItem(localStorage.key(1)));
  //   console.log(localStorage.getItem(localStorage.key(2)));
  //   console.log(items)
  //   for(let i = 0; i < items.length; i++) {
  //     // setBoard([{title: localStorage[items], background: localStorage.getItem(items)}])
  //   }
  // }, [localStorage])
  const items = { ...localStorage };

  const createNewBoard = (e) => {
    let color = rndColor()
    setBoard([...board, {title: inputBoardName, background: color}])
    localStorage.setItem(color, inputBoardName)
  }

  // setBoard([{}])
  // console.log(localStorage.length)

  const [inputBoardName, setInputBoardName] = useState('')
  for(let i = 0; i < localStorage.length; i++) {
    console.log(localStorage.getItem(localStorage.key(i)))
  }
  const [board, setBoard] = useState([
    {
      title: 'Pfl', // localStorage.getItem(localStorage.key(0)),
      background: 589410 // localStorage.key(0),
    },
    {
      title: 'Vfa', // localStorage.getItem(localStorage.key(0)),
      background: 205198 // localStorage.key(0),
    },
  ])

  return (
    <div className="App">
      <div className="main">
        <div className='container'>
          <img src='logo192.png' className="App-logo my-4" alt="logo" />
          <div className='d-flex mt-4'>
            <input className='form-control form-control-lg w-50 me-2' defaultValue={inputBoardName} onChange={e => setInputBoardName(e.target.value)} type="text" placeholder='Введите название доски' />
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
                  <Board key={v} title={i} background={i} />
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
