import style from './Searchbar.module.css';

const Searchbar = ({ onSubmit, onChange }) => {
    return (
        <header className={style.searchbar}>
            <form
                className={style.searchForm}
                onSubmit={onSubmit}
            >
                <button
                    type="submit"
                    className={style.searchFormButton}
                >
                    <span
                        className={style.searchFormButtonLabel}
                    >
                        Search
                    </span>
                </button>

                <input
                    className={style.searchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={onChange}
                />
            </form>
        </header>
    );
};

export default Searchbar;
