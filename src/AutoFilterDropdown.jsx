
import React, { useState, useEffect, useRef } from 'react';
import './AutoFilterDropdown.css';

const AutoFilterDropdown = ({data, filterKey, valueChange}) => {
    const [searchWord, setSearchWord] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    // handle search input and filter data
    const handleSearch = (e) => {
        const word = e.target.value;
        setSearchWord(word); // update the search word 
        setIsDropdownVisible(true);
    };

    // Filter data whener searchWord or data changes
    useEffect(() => {
        const filtered = data.filter(item =>
             item[filterKey].toLowerCase().includes(searchWord.toLowerCase())
            );
            setFilteredData(filtered);
    }, [searchWord, data]);

    //highlight matching part in the text
    const highlightText = (text) => {
        const regex = new RegExp(`(${searchWord})`, 'gi');
        const textParts = text.split(regex);
        return textParts.map((part, index) => 
            part.toLowerCase() === searchWord.toLocaleLowerCase() ? (
                <strong key={index}>{part}</strong>
            ) : (part)
        );
    };

    // handle selected dropdown item
    const handleSelect = (item) => {
        valueChange(item);
        setSearchWord(item[filterKey]); // clear search word
        setFilteredData(data);   
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsDropdownVisible(false);
        }
      };

      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);


  return (
    <div className='auto-filter'  ref={dropdownRef}>
        <input
          type="text"
          className='dropdown-search'
          value={searchWord}
          onChange={handleSearch}
          placeholder="Search..."
          onFocus={() => setIsDropdownVisible(true)}
          />
        {isDropdownVisible && searchWord && (
            <ul className="dropdown-filtered-data">
                {filteredData.length > 0 ? ( filteredData.map((item) => (
                    <li 
                      key={item[filterKey]}
                      onClick={() =>handleSelect(item)}
                      className='list-item'
                    >
                        {highlightText(item[filterKey])}
                    </li>
                ))
            ) : (
                <li className="list-item">No results</li>
            )
            }
            </ul>
        )}
    </div>
  )
}

export default AutoFilterDropdown;