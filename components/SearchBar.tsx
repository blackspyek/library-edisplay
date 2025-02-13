import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
    return (
        <div className="flex items-center bg-white rounded-full p-2 shadow-md w-1/4">
            <Search className="text-gray-400 h-5 w-5" />

            <input
                type="text"
                placeholder="Wyszukaj wystawę po nazwie..."
                className="ml-2 outline-none flex-1 bg-transparent placeholder-gray-400 text-gray-700"
            />


        </div>
    );
};

export default SearchBar;