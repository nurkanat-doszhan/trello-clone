import { useState } from "react"

const BoardPage = (props) => {
  const [inp, setInp] = useState(false)
  let date = props.createdDate
  let btnText = `Создать список`
  return (
    <div style={{backgroundColor: "#" + props.background}}>
      <h2>{props.title}</h2>
      <small>{date.slice(0, 10)}</small>
      <div className='container d-flex'>
        <button className='btn btn-large btn-primary d-flex align-items-center'
        onClick={() => {setInp(true)}}>
        {
          inp ?
          <input type='text' />
          : btnText + <i className="bi-plus fs-4" />
        }
        </button>
      </div>
    </div>
  )
}

export default BoardPage