const LoadMoreBtn = ({ onClick, disabled}) => {
    return (
        <button onClick={onClick} disabled={disabled}>Load more</button>
    );
}

export default LoadMoreBtn;