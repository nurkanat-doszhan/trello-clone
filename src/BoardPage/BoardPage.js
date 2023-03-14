import { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid'

const BoardPage = (props) => {
  const [addListBtn, setAddListBtn] = useState(false)
  const [inpVal, setInpVal] = useState('')
  const [list, setList] = useState([])
  const unique_id = uuid()
  const small_id = unique_id.slice(0,8)

  useEffect(() => {
    const loc = JSON.parse(localStorage.getItem(props.id))
    // console.log(loc)
  })

  const addList = () => {
    const data = JSON.parse(localStorage.getItem(props.id))
    const newList = {
      id: small_id,
      title: inpVal,
      tasks: [],
    }
    setList([...list, {
      newList: {
        id: newList.id,
        title: newList.title,
        tasks: newList.tasks,
        addNewTask: false
      }
    }])
    let n = data.card;
    n = new Array;
    n.join(newList)
    // data.card = newList;
    // console.log(n)
    // console.log(newList)
    // for(let i=0; i<data.card.length; i++) {
    //   console.log(i)
    // }
    // console.log(data)
    // localStorage.setItem(data.id, JSON.stringify(data))
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
              setInpVal('')}}>Добавить список</button>
            <span onClick={() => {setAddListBtn(false); setInpVal('')}} style={{ cursor: 'pointer' }}>
              <i className="bi-x fs-4 text-dark" />
            </span>
          </div>
        </div>
      )
    }
  }

  const Card = (props) => {
    console.log(props)
    return (
      <div className="d-flex flex-column align-items-start p-1 bg-light border border-success border-opacity-50 rounded">
        <h3 className="text-dark">{list.id}</h3>
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
                title={i.title}
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