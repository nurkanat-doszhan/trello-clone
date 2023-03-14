import { useEffect, useState } from 'react';
import './App.css';
import Board from './Boards/Board';
import { v4 as uuid } from 'uuid';
import 'animate.css';
import { Link, Route, Routes } from "react-router-dom";
import BoardPage from './BoardPage/BoardPage';

const rndColor = () => {
  let newColor = '';
  const rndWords = [ 'a', 'b', 'c', 'd', '4', '5', '6', '7', '8', '9' ]
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
      let boards = localStorage.getItem(localStorage.key(i))
      let jsonBoard = JSON.parse(boards)

      setBoard((board) => [...board, {
        id: jsonBoard.id,
        title: jsonBoard.title,
        background: jsonBoard.background,
        createdDate: jsonBoard.createdDate
      }])
      // jsonBoard.sort((a, b) => a.createdDate - b.createdDate)
    }
  }, [])

  const createNewBoard = () => {
    const color = rndColor()
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const mon = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()
    const h = String(today.getHours()).padStart(2, '0')
    const m = String(today.getMinutes()).padStart(2, '0')
    const s = String(today.getSeconds()).padStart(2, '0')
    const ms = String(today.getMilliseconds()).padStart(3, '0')
    const fullDate = day+'.'+mon+'.'+year+' '+h+':'+m+':'+s+'.'+ms
    const newBoard = {
      title: inputBoardName,
      id: small_id,
      background: color,
      createdDate: fullDate
    }
    const jsonBoard = JSON.stringify(newBoard)
    setBoard([...board, {
      id: newBoard.id,
      title: newBoard.title,
      background: newBoard.background,
      createdDate: newBoard.createdDate
    }])

    localStorage.setItem(newBoard.id, jsonBoard)
    setInputBoardName('')
  }

  const onDeleteHandler = (e, id) => {
    setTimeout(() => {
      for(let i = 0; i < localStorage.length; i++) {
        let boards = localStorage.getItem(localStorage.key(i))
        let jsonBoard = JSON.parse(boards)
        if(jsonBoard.id === id) {
          localStorage.removeItem(localStorage.key(i))
          setBoard(board.filter(board => {
            return board.id !== jsonBoard.id
          }))
        }
      }
    }, 200)
    e.preventDefault();
  }

  const Home = () => {
    return (
      <div className='container'>
        <div className='d-flex mt-4'>
          <input className='form-control form-control-lg w-50 me-2'
            type="text" defaultValue={ inputBoardName }
            onChange={ e => setInputBoardName(e.target.value) }
            placeholder='Введите название доски' />
          <button className='btn btn-success btn-lg' onClick={(e) => createNewBoard(e)}
            disabled={ inputBoardName !== inputBoardName.trim() || inputBoardName === ''
            ? true : false }>Создать доску</button>
        </div>
        <div className='d-flex mt-4 flex-wrap'>
          {
            board.length === 0 ? <span className='text-empty'>empty</span> :
            board.map((item, value) => {
              return (
                <Link key={value} to={item.id} className="card-link me-3 mb-3">
                  <Board
                    id={item.id}
                    title={item.title}
                    background={item.background}
                    createdDate={item.createdDate}
                    onXClickHandler={(e) => onDeleteHandler(e, item.id)}
                  />
                </Link>
              )
            })
          }
        </div>
      </div>
    )
  }

  /// ***** Доделать правильную сортировку после обновления стр ***** ///

  return (
    <div className="App">
      <div className="main">
        <Link to="/">
          <img src='logo192.png' className="App-logo m-4" alt="logo" />
        </Link>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="about" element={<AboutPage />} /> */}
          {
            board.map((item, value) => {
              return (
                <Route key={value} path={item.id} element={
                  <BoardPage
                    id={item.id}
                    title={item.title}
                    background={item.background}
                    createdDate={item.createdDate}
                  />
                } />
              )
            })
          }
        </Routes>
      </div>
    </div>
  );
}

export default App;
