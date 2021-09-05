import { Component } from 'react';
import { Style } from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import { toast } from 'react-toastify';

import imgAPI, { options } from '../services/img-api';

class App extends Component {
    state = {
        searchQuery: '',
        showModal: false,
        targetImg: null,
        imgName: null,
        status: 'idle',
        imgArr: [],
        error: null,
    };

    componentDidUpdate(prevProps, prevState) {
        const { searchQuery } = this.state;
        if (searchQuery.trim() === '') {
            toast.warn('Введите ваш запрос');
            return;
        }
        if (prevState.searchQuery !== searchQuery) {
            this.setState({ imgArr: [] });
            this.imgFetch();
        }
    }

    handleFormSubmit = query => {
        this.setState({ searchQuery: query });
    };

    imgFetch = () => {
        const { searchQuery } = this.state;
        this.setState({ status: 'pending' });

        imgAPI
            .fetchImg(searchQuery)
            .then(imgArr =>
                this.setState(prevState => {
                    if (imgArr.hits.length !== 0) {
                        options.pageNumber += 1;

                        return this.setState({
                            imgArr: [
                                ...prevState.imgArr,
                                ...imgArr.hits,
                            ],
                            status: 'resolved',
                        });
                    }
                    return this.setState({
                        status: 'rejected',
                        error: `Картинок по запросу ${searchQuery} нет`,
                    });
                }),
            )
            .catch(error =>
                this.setState({
                    error,
                }),
            )
            .finally(() => {
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                });
            });
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
        const {
            showModal,
            targetImg,
            imgName,
            status,
            imgArr,
            error,
        } = this.state;
        const {
            handleFormSubmit,
            toggleModal,
            onImgClick,
            imgFetch,
        } = this;

        return (
            <div className={Style}>
                <Searchbar onSubmit={handleFormSubmit} />

                <ImageGallery
                    error={error}
                    status={status}
                    imgArr={imgArr}
                    toggleModal={toggleModal}
                    onImgClick={onImgClick}
                />

                {status === 'resolved' && (
                    <Button onLoadMore={imgFetch} />
                )}

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
