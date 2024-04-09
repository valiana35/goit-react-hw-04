import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoSearch } from 'react-icons/io5';

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
        <form onSubmit={handleSubmit}>
            <button type="submit"><IoSearch /></button>
            <input type="text"
            name="query"
            value={query}
            autoFocus  
            placeholder="Search images and photos"
            onChange={handleChange} />
            <Toaster/>
        </form>
    );
}

export default SearchBar;