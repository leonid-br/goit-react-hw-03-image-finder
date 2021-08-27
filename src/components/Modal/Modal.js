import { Component } from 'react';
import { overlay, modal } from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener(
            'keydown',
            this.handleKeyDown,
        );
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    };

    render() {
        const { url, tag } = this.props;
        const { handleOverlayClick } = this;
        return createPortal(
            <div
                className={overlay}
                onClick={handleOverlayClick}
            >
                <div className={modal}>
                    <img src={url} alt={tag} />
                </div>
            </div>,
            modalRoot,
        );
    }
}
