import React, { useEffect, useState } from "react";
import { Employees } from "../../types/Employees";
import Lupa from "../../assets/images/Lupa.png";
import {
  cleanPhoneNumber,
  normalizeSearch,
  removeAccents,
} from "../../utils/formatFunctions";

import "./SearchBar.scss";

interface SearchBarProps {
  employees: Employees[];
  setFilteredEmployees: (employees: Employees[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  employees,
  setFilteredEmployees,
}) => {
  const [search, setSearch] = useState("");

  const normalizedSearch = normalizeSearch(search);
  const filteredEmployees = employees.filter((employee) => {
    const normalizedName = removeAccents(employee.name.toLowerCase());
    const normalizedRole = removeAccents(employee.job.toLowerCase());
    const formattedPhone = cleanPhoneNumber(employee.phone);
    return (
      normalizedName.includes(normalizedSearch) ||
      normalizedRole.includes(normalizedSearch) ||
      formattedPhone.includes(normalizedSearch)
    );
  });

  useEffect(() => {
    if (search) {
      setFilteredEmployees(filteredEmployees);
    } else {
      setFilteredEmployees([]);
    }
  }, [search]);

  return (
    <div className='input-container'>
      <input
        type='text'
        placeholder='Pesquisar'
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        name='search'
      />
      <button className='search-button'>
        <img src={Lupa} alt='search' />
      </button>
    </div>
  );
};
const memoizedSearchBar = React.memo(SearchBar);

export default memoizedSearchBar;
