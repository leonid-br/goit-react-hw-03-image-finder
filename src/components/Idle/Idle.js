import { ReactComponent as Up } from './up.svg';
import { text, icon } from './Idel.module.css';
const Idle = () => {
    return (
        <div>
            <Up width="40" fill="red" className={icon} />
            <p className={text}>Please, enter your search</p>
        </div>
    );
};
export default Idle;
