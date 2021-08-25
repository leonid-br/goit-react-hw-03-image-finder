export default function ImageGalleryItem({ query: { hits } }) {
    console.log(hits);
    return (
        <li className="ImageGalleryItem">
            <img
                src={hits[0].webformatURL}
                alt={hits[0].tags}
                className="ImageGalleryItem-image"
            />
        </li>
    );
}
