import { button } from './Button.module.css';
export default function Button({ onLoadMore }) {
    return (
        <button
            type="button"
            onClick={onLoadMore}
            className={button}
        >
            Load more
        </button>
    );
}
