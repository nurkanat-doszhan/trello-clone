import { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid'

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
        <button className='btn btn-primary text-center' style={{ width: '200px' }}
          onClick={() => {setAddListBtn(true)}}>
          <i className="bi-plus fs-6"/> Создать список
        </button>
      )
    } else {
      return (
        <div className="d-flex flex-column align-items-start
          p-1 bg-light border border-success border-opacity-50 rounded">
          <input required autoFocus onChange={e => setInpVal(e.target.value)}
            className="form-control" defaultValue={inpVal} type='text' style={{ width: '200px' }} />
          <div className="mt-2 w-100 d-flex align-items-start">
            <button className="btn btn-primary btn-md me-2" onClick={() => {
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

  const deleteCard = (id) => {
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

  const Card = (props) => {
    return (
      <div className="d-flex flex-column align-items-start p-1 bg-light border border-success border-opacity-50 mb-2 me-2 rounded">
        <div className="w-100 d-flex justify-content-between">
          <h4 className="text-dark">{props.title}</h4>
          <span onClick={() => {deleteCard(props.id)}} style={{ cursor: 'pointer' }}>
            <i className="bi-x fs-4 text-dark" />
          </span>
        </div>
        <textarea required autoFocus className="form-control" type='text' style={{ width: '200px' }} />
      </div>
    )
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