import { Component } from 'react';
import style from './Searchbar.module.css';
import { toast } from 'react-toastify';

class Searchbar extends Component {
    state = {
        searchQuery: '',
    };

    handlImageChange = e => {
        this.setState({
            searchQuery: e.currentTarget.value.toLowerCase(),
        });
    };

    handleSubmit = e => {
        const { searchQuery } = this.state;
        e.preventDefault();

        if (searchQuery.trim() === '') {
            toast.warn('Введите ваш запрос');
            return;
        }

        this.props.onSubmit(searchQuery);
        this.setState({ searchQuery: '' });
    };
    render() {
        const { handlImageChange } = this;
        const { searchQuery } = this.state;
        return (
            <header className={style.searchbar}>
                <form
                    className={style.searchForm}
                    onSubmit={this.handleSubmit}
                >
                    <button
                        type="submit"
                        className={style.searchFormButton}
                    >
                        <span
                            className={
                                style.searchFormButtonLabel
                            }
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
                        onChange={handlImageChange}
                        value={searchQuery}
                    />
                </form>
            </header>
        );
    }
}

export default Searchbar;
