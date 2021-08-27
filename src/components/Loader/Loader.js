import Loader from 'react-loader-spinner';
import { loader } from './Loader.module.css';
const Loaded = () => {
    return (
        <div className={loader}>
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000}
            />
        </div>
    );
};
export default Loaded;
