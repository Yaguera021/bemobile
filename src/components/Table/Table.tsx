import React, { useEffect, useState } from "react";

import { fetchEmployees } from "../../services/fetchAPI";
import { Employees } from "../../types/Employees";

import ellipse from "../../assets/ellipse.svg";

import "./Table.scss";
import SearchBar from "../SearchBar/SearchBar";
import TableRow from "../TableRow/TableRow";

const Table: React.FC = () => {
  const [allEmployees, setAllEmployees] = useState<Employees[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employees[]>([]);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const getEmployees = async () => {
      const data = await fetchEmployees();
      setAllEmployees(data);
    };
    getEmployees();
  }, []);

  const toggleRow = (id: number) => {
    if (expandedRows.includes(id)) {
      setExpandedRows([]);
    } else {
      setExpandedRows([id]);
    }
  };

  return (
    <div>
      <div className='top-wrapper'>
        <h4>Funcionários</h4>
        <SearchBar
          employees={allEmployees}
          setFilteredEmployees={setFilteredEmployees}
        />
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            {isDesktop ? (
              <>
                <th>Cargo</th>
                <th>Data de admissão</th>
                <th>Telefone</th>
              </>
            ) : (
              <th>
                <img className='ellipse' src={ellipse} alt='' />
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0
            ? filteredEmployees.map((employee) => (
                <TableRow
                  key={employee.id}
                  employee={employee}
                  expandedRows={expandedRows}
                  toggleRow={toggleRow}
                  isDesktop={isDesktop}
                />
              ))
            : allEmployees.map((employee) => (
                <TableRow
                  key={employee.id}
                  employee={employee}
                  expandedRows={expandedRows}
                  toggleRow={toggleRow}
                  isDesktop={isDesktop}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
