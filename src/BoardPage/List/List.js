const List = () => {
    const Item = () => {
        return (
            <li className="list-group-item" style={{ cursor: 'pointer', userSelect: 'none' }}>An item</li>
        )
    }
    return (
        <ul className="list-group mt-2 w-100">
            <Item />
        </ul>
    )
}

export default List