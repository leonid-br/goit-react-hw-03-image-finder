import { error, text } from './ErrorQuery.module.css';
import errorImg from './sadcat.jpg';

export default function ErrorQuery({ message }) {
    return (
        <div role="alert" className={error}>
            <p className={text}>{message}</p>
            <img src={errorImg} width="240" alt="bad query" />
        </div>
    );
}
