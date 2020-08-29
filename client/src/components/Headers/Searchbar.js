import React from 'react';
import { ReactComponent as SearchIcon } from '../../imgs/search.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchTerm, selectedItem } from '../../actions';
import { Link, useHistory } from 'react-router-dom';

const Searchbar = () => {
  const searchResults = useSelector((state) => state.searchTerm);
  const [searchBarTerm, setSearchBarTerm] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(searchTerm(searchBarTerm));
  }, [searchBarTerm]);

  const goToItem = (value) => {
    setSearchBarTerm('');
    dispatch(selectedItem(value));
    history.push(`/product/${value}`);
  };

  const SearchbarItem = (searchResults) => {
    if (searchResults.length < 1) {
      return null;
    }

    return Array.from(searchResults).map((item) => {
      return (
        <li
          className="homeHeader__search--item"
          key={item.name}
          onClick={() => goToItem(item.routeID)}
        >
          {item.name}
        </li>
      );
    });
  };

  return (
    <div className="homeHeader__search">
      <input
        type="text"
        placeholder="Search..."
        className="homeHeader__search--input"
        onChange={(e) => setSearchBarTerm(e.target.value)}
        value={searchBarTerm}
      />
      <SearchIcon className="homeHeader__search--img" />

      <div className="homeHeader__search--dropdown">
        <ul className="homeHeader__search--list">
          {SearchbarItem(searchResults)}
        </ul>
      </div>
    </div>
  );
};

export default Searchbar;
