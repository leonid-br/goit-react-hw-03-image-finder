import style from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
    id,
    largeImageURL,
    webformatURL,
    tags,
    toggleModal,
    onImgClick,
}) {
    return (
        <li
            className={style.imageGalleryItem}
            key={id}
            onClick={onImgClick}
            data-action={largeImageURL}
        >
            <img
                src={webformatURL}
                alt={tags}
                className={style.imageGalleryItemImage}
                onClick={toggleModal}
            />
        </li>
    );
}
