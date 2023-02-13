import "./Board.css"

const Board = ({title, background}) => {
  return (
    <div className="n-card me-2 mb-2" style={{
      backgroundImage: `linear-gradient(45deg, #${background}, #${background}aa)`,
      boxShadow: '0 0 15px #' + background }}>
      <div className="card-name">{title}</div>
    </div>
  )
}

export default Board