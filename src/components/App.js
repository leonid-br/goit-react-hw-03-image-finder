import { Component } from 'react';
import { Style } from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
// import Button from './Button';

// import Loader from './Loader';
// import Modal from './Modal';

class App extends Component {
    state = { searchQuery: '' };

    handleFormSubmit = searchQuery => {
        this.setState({ searchQuery });
    };

    render() {
        const { searchQuery } = this.state;
        const { handleFormSubmit } = this;
        return (
            <div className={Style}>
                <Searchbar onSubmit={handleFormSubmit} />
                <ImageGallery searchQuery={searchQuery} />
                {/* <ImageGalleryItem /> */}
                {/* <Loader />
                <Button />
                <Modal /> */}
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                />
            </div>
        );
    }
}

export default App;
