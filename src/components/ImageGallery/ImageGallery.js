import ImageGalleryItem from '../ImageGalleryItem';
import ErrorQuery from '../ErrorQuery';
import Loaded from '../Loader';
import Idle from '../Idle';
import shortid from 'shortid';

import { imageGallery } from './ImageGallery.module.css';

export default function ImageGallery({
    status,
    imgArr,
    toggleModal,
    onImgClick,
    error,
}) {
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
                    {imgArr.map(
                        ({
                            webformatURL,
                            largeImageURL,
                            tags,
                        }) => (
                            <ImageGalleryItem
                                toggleModal={toggleModal}
                                onImgClick={onImgClick}
                                id={shortid.generate()}
                                webformatURL={webformatURL}
                                largeImageURL={largeImageURL}
                                tags={tags}
                            />
                        ),
                    )}
                </ul>
            </>
        );
    }
}
