const LoadMoreBtn = ({ children, onClick, disabled }) => {
    return (
        <>
        <button type="button" onClick={onClick} disabled={disabled}>{children}</button>
        </>
    );
}

export default LoadMoreBtn;