export const options = {
    pageNumber: 1,

    KEY: '22290426-07a1b6b21ce6d6b5919cefbe3',
    URL: 'https://pixabay.com/api/',
    TYPE_PIC: 'image_type=photo&orientation=horizontal',
};

function fetchImg(query) {
    return fetch(`${options.URL}?q=${query}&page=${options.pageNumber}&key=${options.KEY}&${options.TYPE_PIC}&per_page=12
`).then(res => res.json());
}

const api = { fetchImg };

export default api;
