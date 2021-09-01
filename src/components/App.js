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
        imgArr: null,
        error: null,
    };

    handleInputChange = e => {
        this.setState({
            searchQuery: e.target.value.toLowerCase(),
        });
    };

    handleFormSubmit = e => {
        e.preventDefault();

        const { searchQuery } = this.state;

        if (searchQuery.trim() === '') {
            toast.warn('Введите ваш запрос');
            return;
        }
        this.setState({ status: 'pending' });
        imgAPI
            .fetchImg(searchQuery)
            .then(imgArr =>
                this.checkedEmptyArr(imgArr, searchQuery),
            )
            .catch(error =>
                this.setState({
                    error,
                }),
            );
    };

    onLoadMore = () => {
        const { searchQuery } = this.state;

        options.pageNumber += 1;
        imgAPI
            .fetchImg(searchQuery)
            .then(imgArr => {
                return this.setState(prevState => ({
                    imgArr: [
                        ...prevState.imgArr,
                        ...imgArr.hits,
                    ],
                    status: 'resolved',
                }));
            })
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

    checkedEmptyArr = (imgArr, search) => {
        if (imgArr.hits.length !== 0) {
            return this.setState({
                imgArr: imgArr.hits,
                status: 'resolved',
            });
        }
        return this.setState({
            status: 'rejected',
            error: `Картинок по запросу ${search} нет`,
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
            onLoadMore,
            handleInputChange,
        } = this;

        return (
            <div className={Style}>
                <Searchbar
                    onSubmit={handleFormSubmit}
                    onChange={handleInputChange}
                />

                <ImageGallery
                    error={error}
                    status={status}
                    imgArr={imgArr}
                    toggleModal={toggleModal}
                    onImgClick={onImgClick}
                />

                {status === 'resolved' && (
                    <Button onLoadMore={onLoadMore} />
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
