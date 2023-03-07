import { useEffect, useState } from 'react';
import './App.css';
import Board from './Boards/Board';
import { v4 as uuid } from 'uuid';

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
  const [board, setBoard] = useState([])
  const unique_id = uuid();
  const small_id = unique_id.slice(0,8)

  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      let boards = localStorage.key(i)
      let jsonBoard = JSON.parse(boards)
      console.log(boards)

      // setBoard((board) => [...board, {
        // id: board.id,
        // link: board.link,
        // title: board.title,
        // background: board.background
      // }])
      // console.log(board)
    }
  }, [])
  
  const createNewBoard = () => {
    const color = rndColor()
    const newBoard = {
      id: small_id,
      link: small_id,
      title: inputBoardName,
      background: color
    }
    const jsonBoard = JSON.stringify(newBoard)
    setBoard([...board, {
      id: newBoard.id,
      link: newBoard.link,
      title: newBoard.title,
      background: newBoard.background,
    }])

    localStorage.setItem(newBoard.id, jsonBoard)
    setInputBoardName('')
  }

  /// ***** Доделать правильную сортировку после обновления стр ***** ///

  const onDeleteHandler = (id) => {
    setTimeout(() => {
      setBoard(board.filter(board => {
        return board.title !== localStorage.getItem(localStorage.key(id))
      }))
      localStorage.removeItem(localStorage.key(id))
    }, 200)
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
                    id={item.id}
                    link={item.link}
                    title={item.title}
                    background={item.background}
                    onXClickHandler={() => onDeleteHandler(value)}
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
