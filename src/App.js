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
    const items = { ...localStorage };
    // console.log(board)
    console.log(items)
    // board.map((i, v) => {
    //   return (
    //     <Board key={v} title={items.value} background={items.key} />
    //   )
    // })
    setBoard([{title: 'items.value', background: 'items.key'}])
  }, [])
  const createNewBoard = (e) => {
    let color = rndColor()
    setBoard([...board, {title: inputBoardName, background: color}])
    localStorage.setItem(color, inputBoardName)
  }

  const [inputBoardName, setInputBoardName] = useState('')
  const [board, setBoard] = useState([
    {
      title: 'Mia 224',
      background: '515482',
    },
    {
      title: 'Asa 101',
      background: '872490',
    }
  ])

  return (
    <div className="App">
      <div className="main">
        <div className='container'>
          <img src='logo192.png' className="App-logo my-4" alt="logo" />
          <div className='d-flex mt-4'>
            <input className='form-control form-control-lg w-50 me-2' defaultValue={inputBoardName} onChange={e => setInputBoardName(e.target.value)} type="text" placeholder='Введите название доски' />
            <button className='btn btn-success btn-lg' onClick={() => createNewBoard()}>Создать доску</button>
          </div>
          <div className='d-flex mt-3 flex-wrap'>
            {
              board.map((i, v) => {
                return (
                  <Board key={v} title={i.title} background={i.background} />
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
