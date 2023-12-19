import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';




function createData(deposit) {
  const DepositId = deposit.depositId;
  const amount = deposit.sum.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const date = new Date(deposit.dateToPull).toLocaleDateString('en-US');
  const userId = deposit.userId;
  console.log("Data is: " + DepositId + " " + amount + " " + date + " " + userId);
  return [DepositId, amount, date, userId];
}

function createData2(loan) {

}

export default function DataTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const deposits = props.deposits.map((deposit) => createData(deposit));

  const columns = [
    { id: 0, label: 'DepositId', minWidth: 80, format: (value) => value.toString() },
    { id: 1, label: 'Amount', minWidth: 100 },
    {
      id: 2,
      label: 'Return date',
      minWidth: 80,
     },
    {
      id: 3,
      label: 'UserId',
      minWidth: 70,
      align: 'right',
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
    const year = date.getFullYear();
    console.log("day: ", day);
    console.log("month: ", month);
    console.log("year: ", year);

    return `${day}/${month}/${year}`;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: "rgba(223, 221, 53, 0.5)" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {deposits.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : column.id === 2  // Check if it's the 'Return date' column
                            ? formatDate(value) // Call the formatDate function
                            : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={deposits.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
