import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ children, onClick, disabled }) => {
    return (
        <div className={css.loadMore}>
        <button type="button" onClick={onClick} disabled={disabled} className={css.loadMoreBtn}>{children}</button>
        </div>
    );
}

export default LoadMoreBtn;