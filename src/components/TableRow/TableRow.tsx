import React from "react";
import { Employees } from "../../types/Employees";

import aDown from "../../assets/arrow-down.svg";
import aUp from "../../assets/arrow-up.svg";

import { formatDate, formatPhoneNumber } from "../../utils/formatFunctions";

interface TableRowProps {
  employee: Employees;
  expandedRows: number[];
  toggleRow: (id: number) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  employee,
  expandedRows,
  toggleRow,
}) => (
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
);

export default TableRow;
