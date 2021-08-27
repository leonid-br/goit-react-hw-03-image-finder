import { Component } from 'react';

import ImageGalleryItem from '../ImageGalleryItem';
import ErrorQuery from '../ErrorQuery';
import Loaded from '../Loader';
import Idle from '../Idle';
import imgAPI from '../../services/img-api';
import Button from '../Button';
import { options } from '../../services/img-api';

import { imageGallery } from './ImageGallery.module.css';

class ImageGallery extends Component {
    state = {
        query: null,
        error: null,
        status: 'idle',
    };

    componentDidUpdate(prevProps, prevState) {
        const { searchQuery } = this.props;

        if (prevProps.searchQuery !== searchQuery) {
            this.setState({ status: 'pending' });

            imgAPI
                .fetchImg(searchQuery)
                .then(query =>
                    this.checkedEmptyArr(query, searchQuery),
                )
                .catch(error =>
                    this.setState({
                        error,
                    }),
                );
        }
    }

    checkedEmptyArr = (query, search) => {
        if (query.hits.length !== 0) {
            return this.setState({
                query: query.hits,
                status: 'resolved',
            });
        }
        return this.setState({
            status: 'rejected',
            error: `Картинок по запросу ${search} нет`,
        });
    };

    onLoadMore = () => {
        const { searchQuery } = this.props;

        options.pageNumber += 1;
        imgAPI
            .fetchImg(searchQuery)
            .then(query => {
                return this.setState(prevState => ({
                    query: [...prevState.query, ...query.hits],
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

    render() {
        const { error, query, status } = this.state;
        const { toggleModal, onImgClick } = this.props;
        const { onLoadMore } = this;

        if (status === 'idle') {
            return <Idle />;
        }

        if (status === 'pending') {
            return <Loaded />;
        }

        if (status === 'rejected') {
            return <ErrorQuery message={error} />;
        }

        if (status === 'resolved') {
            return (
                <>
                    <ul className={imageGallery}>
                        {query.map(
                            ({
                                id,
                                webformatURL,
                                largeImageURL,
                                tags,
                            }) => (
                                <ImageGalleryItem
                                    toggleModal={toggleModal}
                                    onImgClick={onImgClick}
                                    id={id}
                                    webformatURL={webformatURL}
                                    largeImageURL={largeImageURL}
                                    tags={tags}
                                />
                            ),
                        )}
                    </ul>
                    <Button onLoadMore={onLoadMore} />
                </>
            );
        }
    }
}

export default ImageGallery;
