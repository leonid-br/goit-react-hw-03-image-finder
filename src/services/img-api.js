function fetchImg(query) {
    let pageNumber = 1;
    const KEY = '22290426-07a1b6b21ce6d6b5919cefbe3';
    const URL = 'https://pixabay.com/api/';
    const TYPE_PIC = 'image_type=photo&orientation=horizontal';
    return fetch(`${URL}?q=${query}&page=${pageNumber}&key=${KEY}&${TYPE_PIC}&per_page=12
`).then(res => res.json());
}
const api = { fetchImg };
export default api;
