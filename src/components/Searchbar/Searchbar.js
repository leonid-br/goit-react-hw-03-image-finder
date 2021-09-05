import style from './Searchbar.module.css';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const onCanhgeQuery = e => {
        setQuery(e.currentTarget.value);
    };

    const handelSubmit = e => {
        e.preventDefault();

        onSubmit(query);
        setQuery('');
    };
    return (
        <header className={style.searchbar}>
            <form
                className={style.searchForm}
                onSubmit={handelSubmit}
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
                    onChange={onCanhgeQuery}
                    value={query}
                />
            </form>
        </header>
    );
};

export default Searchbar;
