import React from "react";
import styles from "./Table.module.css"; // Import the CSS module

// Define the Column interface with a generic type T
interface Column<T> {
  header: string; // Header for the column
  accessor: keyof T; // The key in the data object to display in this column
  renderCell?: (item: T) => React.ReactNode; // Optional custom cell rendering function
}

// Define the Table component props with a generic type T
interface TableProps<T> {
  columns: Column<T>[]; // Array of columns
  data: T[]; // Array of data
}

// Reusable Table component
const TableComponent = <T,>({ columns, data }: TableProps<T>) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.header} className={styles.header}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.noData}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className={styles.row}>
                {columns.map((col) => (
                  <td key={col.header} className={styles.cell}>
                    {/* Safely render cell content */}
                    {col.renderCell
                      ? col.renderCell(item) // Use custom cell renderer if provided
                      : String(item[col.accessor] as any)} {/* Convert value to string if necessary */}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
