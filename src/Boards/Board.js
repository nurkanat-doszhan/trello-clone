import "./Board.css"

const Board = (props) => {
  return (
    <div className="n-card me-3 mb-3" style={{
      backgroundImage: `linear-gradient(45deg, #${props.background}, #${props.background}99)`,
      boxShadow: '0 0 15px #' + props.background }}>
      <div className="card-name">{props.title}</div>
      <span className="delete" onClick={props.onXClickHandler}>
        <i className="bi-x-lg fs-3"></i>
      </span>
    </div>
  )
}

export default Board