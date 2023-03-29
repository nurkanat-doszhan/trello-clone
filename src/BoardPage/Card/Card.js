import List from "../List/List"

const Card = (props) => {
    return (
        <div className="d-flex flex-column align-items-start p-1 mb-2 me-2 rounded
        bg-light border border-success border-opacity-50" style={{ width: '240px' }}>
            <div className="w-100 d-flex justify-content-between">
                <h4 className="text-dark">{props.title}</h4>
                <span onClick={ props.deleteCard } style={{ cursor: 'pointer' }}>
                    <i className="bi-x fs-4 text-dark" />
                </span>
            </div>
            <textarea required autoFocus className="form-control" type='text' />
            <button className="btn btn-secondary btn-sm mt-1 w-100">Добавить</button>
            <List />
        </div>
    )
}

export default Card