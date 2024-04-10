import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoSearch } from 'react-icons/io5';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
    const [query, setQuery] = useState("")
    
    const handleChange = (evt) => {
        setQuery(evt.target.value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!query.trim()) {
            return toast ("Please, enter search term!");
        }
        onSubmit(query);
        setQuery("");
    };

    return (
        <div className={css.container}>
        <form className={css.form} onSubmit={handleSubmit}>
            <button className={css.btnForm} type="submit"><IoSearch /></button>
            <input className={css.inputForm} type="text"
            name="query"
            value={query}
            autoFocus  
            placeholder="Search images and photos"
            onChange={handleChange} />
            <Toaster/>
        </form>
        </div>
    );
}

export default SearchBar;