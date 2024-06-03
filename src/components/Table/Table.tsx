import React, { useEffect, useState } from "react";

import { fetchEmployees } from "../../services/api";
import { Employees } from "../../types/Employees";

import aDown from "../../assets/arrow-down.svg";
import aUp from "../../assets/arrow-up.svg";
import ellipse from "../../assets/ellipse.svg";

import "./Table.scss";
import { formatDate, formatPhoneNumber } from "../../utils/formatFunctions";

const Table = () => {
  const [allEmployees, setAllEmployees] = useState<Employees[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

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
        <div>SearchBar</div>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>
              <img className='ellipse' src={ellipse} alt='' />
            </th>
          </tr>
        </thead>
        <tbody>
          {allEmployees.map((employee) => (
            <React.Fragment key={employee.id}>
              <tr>
                <td>
                  <img src={employee.image} alt={employee.name} />
                </td>
                <td>{employee.name}</td>
                <td>
                  <button onClick={() => toggleRow(Number(employee.id))}>
                    {expandedRows.includes(Number(employee.id)) ? (
                      <img src={aDown} alt='arrow-down' />
                    ) : (
                      <img src={aUp} alt='arrow-up' />
                    )}
                  </button>
                </td>
              </tr>
              {expandedRows.includes(Number(employee.id)) && (
                <tr className='expanded-items'>
                  <td>
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
