import React from 'react';
import { useTable, useExpanded, useBlockLayout } from 'react-table';
import paymentsSample from '../data/paymentsSample.json';

// SubTable for when rows expand to expose Payors, Payor info, and Invoice info per Client
function SubTable({ visibleColumns: subColumns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      width: 200
    }),
    []
  );
  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable(
    {
      visibleColumns: subColumns,
      data,
      defaultColumn
    },
    useBlockLayout
  );
  return (
    <table className="subRowTable" {...getTableProps()}>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// SubRowComponent is to create react SubTable
// -- currently malfunctioning :(
function SubRowComponent() {
  const visibleColumns = React.useMemo(
    () => [
      {
        id: 'subRows',
        Header: () => null
      },
      {
        Header: () => null,
        visibleColumns: [
          {
            Header: 'Payor',
            // width: ,
            accessor: d => d.Remittance.PayorName
          },
          {
            Header: 'Payor ID',
            // width: ,
            accessor: d => d.Remittance.PayorId
          },
          {
            Header: 'Invoice #',
            // width: ,
            accessor: d => d.Remittance.InvoiceNo
          },
          {
            Header: 'Amount',
            // width: ,
            accessor: d => d.Remittance.Amount
          },
          {
            Header: 'Description',
            // width: ,
            accessor: d => d.Remittance.Description
          }
        ]
      }
    ],
    []
  );
  const data = paymentsSample;

  return (
    <SubTable>
      visibleColumns={visibleColumns}
      data={data}
    </SubTable>
  );
}

// Create main DataTable with Clients and their info
function DataTable({ columns: userColumns, data, renderRowSubComponent }) {
  const defaultColumn = React.useMemo(
    () => ({
      width: 200
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded }
  } = useTable(
    {
      columns: userColumns,
      data,
      defaultColumn
    },
    useExpanded,
    useBlockLayout
  );

  return (
    <>
      <pre>
        <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
      </pre>
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr className="headerRows" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            return (
              <React.Fragment key={rowProps.key}>
                <tr {...rowProps}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

// Formulate the main DataTable of Clients
function ExpandTableComponent() {
  const columns = React.useMemo(
    () => [
      {
        id: 'expander',
        Header: () => null,
        width: 25,
        Cell: ({ row }) =>
          row.canExpand ? (
            <span {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? (
                <ion-icon name="chevron-down-outline"></ion-icon>
              ) : (
                <ion-icon name="chevron-forward-outline"></ion-icon>
              )}
            </span>
          ) : (
            <ion-icon name="remove-outline"></ion-icon>
          )
      },
      {
        Header: 'Payments',
        columns: [
          {
            Header: 'Client',
            width: 110,
            accessor: d => d.Payee.Name
          },
          {
            Header: 'Phone Number',
            width: 140,
            accessor: d => d.Payee.Phone
          },
          {
            Header: 'Fax Number',
            width: 140,
            accessor: d => d.Payee.Fax
          },
          {
            Header: 'PAN',
            width: 160,
            accessor: d => d.Payment.PAN
          },
          {
            Header: 'CVV',
            width: 50,
            accessor: d => d.Payment.CVV
          },
          {
            Header: 'Exp',
            width: 70,
            accessor: d => d.Payment.Exp
          },
          {
            Header: 'Address',
            width: 415,
            accessor: d =>
              d.Payee.Address.Address1 +
              '' +
              d.Payee.Address.Address2 +
              ', ' +
              d.Payee.Address.City +
              ', ' +
              d.Payee.Address.StateOrProvince +
              ' ' +
              d.Payee.Address.PostalCode +
              ' ' +
              d.Payee.Address.Country
          }
        ]
      }
    ],
    []
  );

  const data = paymentsSample;

  const renderRowSubComponent =
    (({ row, rowProps, visibleColumns, data }) => (
      <React.Fragment>
        <pre>
          <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
        </pre>
        <SubRowComponent>
          row={row}
          rowProps={rowProps}
          visibleColumns={visibleColumns}
          data={data}
        </SubRowComponent>
      </React.Fragment>
    ),
    []);

  return (
    <DataTable
      columns={columns}
      data={data}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
}

export default ExpandTableComponent;
