import { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid'
import Card from './Card/Card'

const BoardPage = (props) => {
  const [addListBtn, setAddListBtn] = useState(false)
  const [inpVal, setInpVal] = useState('')
  const [list, setList] = useState([])
  const unique_id = uuid()
  const small_id = unique_id.slice(0,8)
  const data = JSON.parse(localStorage.getItem(props.id))
  
  useEffect(() => {
    for (let i = 0; i < data.card.length; i++) {
      setList((list) => [...list, {
        id: data.card[i].id,
        title: data.card[i].title,
        tasks: data.card[i].tasks
      }])
    }
  }, [])

  const addList = () => {
    const newList = {
      id: small_id,
      title: inpVal,
      tasks: []
    }
    setList([...list, {
      id: newList.id,
      title: newList.title,
      tasks: newList.tasks
    }])
    data.card.push(newList)
    localStorage.setItem(data.id, JSON.stringify(data))
    setInpVal('')
  }
  
  const AddNewCard = () => {
    if(!addListBtn) {
      return (
        <button className='btn btn-primary text-center' style={{ width: '240px' }}
          onClick={() => {setAddListBtn(true)}}>
          <i className="bi-plus fs-6"/> Создать список
        </button>
      )
    } else {
      return (
        <div className="d-flex flex-column align-items-start rounded bg-light
          border border-success border-opacity-50 p-1" style={{ width: '240px' }}>
          <input required autoFocus onChange={e => setInpVal(e.target.value)}
            className="form-control" defaultValue={inpVal} type='text' />
          <div className="mt-2 w-100 d-flex align-items-start">
            <button className="btn btn-primary btn-md me-2 flex-grow-1"
              onClick={() => {
                addList();
                setAddListBtn(false);
                setInpVal('')}}
                disabled={ inpVal !== inpVal.trim() || inpVal === ''
              ? true : false }>Добавить список</button>
            <span onClick={() => {setAddListBtn(false); setInpVal('')}} style={{ cursor: 'pointer' }}>
              <i className="bi-x fs-4 text-dark" />
            </span>
          </div>
        </div>
      )
    }
  }

  const onDeleteClick = (id) => {
    for(let i = 0; i < data.card.length; i++) {
      if(data.card[i].id === id) {
        data.card.splice(i, i)
        localStorage.setItem(data.id, JSON.stringify(data))
        setList(list.filter(list => {
          return list.id != id
        }))
      }
    }
  }

  return (
    <div>
      <div style={{backgroundColor: "#" + props.background}}>
        <h2>{props.title}</h2>
        <small>{props.createdDate.slice(0, 10)}</small>
      </div>
      <div className='container d-flex align-items-start mt-2 flex-wrap'>
        {
          list.map((i, v) => {
            return (
              <Card
                key={v}
                id={i.id}
                title={i.title}
                tasks={i.tasks}
                deleteCard={id => onDeleteClick(i.id)}
              />
            )
          })
        }
        <AddNewCard />
      </div>
    </div>
  )
}

export default BoardPage