import errorImg from './sadcat.jpg';

export default function ErrorQuery({ message }) {
    return (
        <div role="alert">
            <p>{message}</p>
            <img src={errorImg} width="240" alt="bad query" />
        </div>
    );
}
