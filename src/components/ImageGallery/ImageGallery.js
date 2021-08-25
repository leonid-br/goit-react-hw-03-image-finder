import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import ErrorQuery from '../ErrorQuery';
import Loader from '../Loader';
import Idle from '../Idle';
import imgAPI from '../../services/img-api';

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
                .then(query => {
                    if (query.hits.length !== 0) {
                        return this.setState({
                            query,
                            status: 'resolved',
                        });
                    }
                    return this.setState({
                        status: 'rejected',
                        error: `Картинок по запросу ${searchQuery} нет`,
                    });
                })
                .catch(error =>
                    this.setState({
                        error,
                    }),
                );
        }
    }
    render() {
        const { error, query, status } = this.state;

        if (status === 'idle') {
            return <Idle />;
        }

        if (status === 'pending') {
            return <Loader />;
        }

        if (status === 'rejected') {
            return <ErrorQuery message={error} />;
        }

        if (status === 'resolved') {
            return (
                <ul className="ImageGallery">
                    <ImageGalleryItem query={query} />
                </ul>
            );
        }
    }
}

export default ImageGallery;
