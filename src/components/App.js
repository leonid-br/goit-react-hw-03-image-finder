import { Component } from 'react';
import { Style } from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

class App extends Component {
    state = {
        searchQuery: '',
        showModal: false,
        targetImg: null,
        imgName: null,
    };

    handleFormSubmit = searchQuery => {
        this.setState({ searchQuery });
    };

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    };

    onImgClick = e => {
        const imgURL = e.currentTarget.dataset.action;
        const imgTag = e.target.alt;
        this.setState({ targetImg: imgURL });
        this.setState({ imgName: imgTag });
    };

    render() {
        const { searchQuery, showModal, targetImg, imgName } =
            this.state;
        const { handleFormSubmit, toggleModal, onImgClick } =
            this;

        return (
            <div className={Style}>
                <Searchbar onSubmit={handleFormSubmit} />

                <ImageGallery
                    searchQuery={searchQuery}
                    toggleModal={toggleModal}
                    onImgClick={onImgClick}
                />

                {showModal && (
                    <Modal
                        url={targetImg}
                        tag={imgName}
                        onClose={toggleModal}
                    />
                )}

                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                />
            </div>
        );
    }
}

export default App;
