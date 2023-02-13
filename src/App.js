import { useState } from 'react';
import './App.css';

function App() {

  const [board, setBoard] = useState([
    {

    }
  ])

  return (
    <div className="App">
      <div className="main">
        <div className='container'>
          <img src='Liquid-logos_transparent_2.png' className="App-logo my-4" alt="logo" />
          <div className='d-flex mt-4'>
            <input className='form-control form-control-lg w-75 me-2' type="text" placeholder='Введите название доски' />
            <button className='btn btn-warning btn-lg' onClick={}>Создать доску</button>
          </div>
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;
