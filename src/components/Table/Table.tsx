import React, { useEffect, useState } from "react";
import { fetchEmployees } from "../../services/fetchAPI";
import { Employees } from "../../types/Employees";
import ellipse from "../../assets/ellipse.svg";
import aDown from "../../assets/arrow-down.svg";
import aUp from "../../assets/arrow-up.svg";
import { formatDate, formatPhoneNumber } from "../../utils/formatFunctions";
import "./Table.scss";
import SearchBar from "../SearchBar/SearchBar";

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
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([id]);
    }
  };

  return (
    <div className='table-wrapper'>
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
          {(filteredEmployees.length > 0
            ? filteredEmployees
            : allEmployees
          ).map((employee) => (
            <React.Fragment key={employee.id}>
              <tr>
                <td>
                  <img src={employee.image} alt={employee.name} />
                </td>
                <td>{employee.name}</td>
                {isDesktop && (
                  <>
                    <td>{employee.job}</td>
                    <td>{formatDate(employee.admission_date)}</td>
                    <td>{formatPhoneNumber(employee.phone)}</td>
                  </>
                )}
                {!isDesktop && (
                  <td>
                    <button onClick={() => toggleRow(Number(employee.id))}>
                      {expandedRows.includes(Number(employee.id)) ? (
                        <img src={aDown} alt='arrow-down' />
                      ) : (
                        <img src={aUp} alt='arrow-up' />
                      )}
                    </button>
                  </td>
                )}
              </tr>
              {!isDesktop && expandedRows.includes(Number(employee.id)) && (
                <tr className='expanded-items expanded'>
                  <td colSpan={5}>
                    <div className='details'>
                      <p>
                        <strong>Cargo</strong>
                        <span className='right-align'>{employee.job}</span>
                      </p>
                      <p>
                        <strong>Data de admissão</strong>{" "}
                        <span className='right-align'>
                          {formatDate(employee.admission_date)}
                        </span>
                      </p>
                      <p>
                        <strong>Telefone</strong>
                        <span className='right-align'>
                          {formatPhoneNumber(employee.phone)}
                        </span>
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
