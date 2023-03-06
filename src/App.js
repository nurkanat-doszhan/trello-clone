import { useEffect, useState } from 'react';
import './App.css';
import Board from './Boards/Board';

const rndColor = () => {
  let newColor = '';
  const rndWords = [ 'a', 'b', 'c', 'd', '2', '3', '4', '5', '6', '7', '8', '9' ]
  for(let i = 0; i < 6; i++) {
    newColor += rndWords[Math.floor(Math.random() * rndWords.length)];
  }
  return newColor
}
function App() {
  const [inputBoardName, setInputBoardName] = useState('')

  // const [n, setN] = useState([])

  const [board, setBoard] = useState([
    // { title: 'A1', background: '287ab7' },
    // { title: 'A2', background: 'db254c' },
  ])

  useEffect(() => {
    // let oldBoard = board;
    for (let i = 0; i < localStorage.length; i++) {
      setBoard((board) => [
        {
          title: localStorage.getItem(localStorage.key(i)), background: localStorage.key(i)
        },
        ...board
      ])
      console.log(localStorage.getItem(localStorage.key(i)))
      console.log(localStorage.key(i))
    }
    console.log('End')
  }, [])
  
  const createNewBoard = () => {
    setInputBoardName(inputBoardName);
    console.log(inputBoardName)
    let color = rndColor()
    setBoard([...board, {title: inputBoardName, background: color}])
    // JSON.parse(localStorage.getItem('inputBoardName'));
    // JSON.parse(this.getItem(key));
    localStorage.setItem(color, inputBoardName)
  }

  return (
    <div className="App">
      <div className="main">
        <div className='container'>
          <img src='logo192.png' className="App-logo my-4" alt="logo" />
          <div className='d-flex mt-4'>
            <input className='form-control form-control-lg w-50 me-2'
              type="text" defaultValue={inputBoardName}
              onChange={e => setInputBoardName(e.target.value)}
              placeholder='Введите название доски' />
            <button className='btn btn-success btn-lg' onClick={(e) => createNewBoard(e)}
              disabled={
              inputBoardName !== inputBoardName.trim() || inputBoardName === ''
              ? true : false}>Создать доску</button>
          </div>
          <div className='d-flex mt-4 flex-wrap'>
            {
              board.length === 0 ?
                <h1 className='fs-1 fw-light text-black-50 mx-auto text-dark'>
                  Empty <i className="bi-x-lg fs-3"></i>
                </h1> :
              board.map((item, value) => {
                return (
                  <Board key={value}
                    title={item.title}
                    background={item.background}
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
