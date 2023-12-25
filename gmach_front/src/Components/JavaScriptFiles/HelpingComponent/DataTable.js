import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


function createData(deposit) {
  const DepositId = deposit.depositId;
  const amount = deposit.sum.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const date = new Date(deposit.dateToPull).toLocaleDateString('en-US');
  const userId = deposit.userId;
  console.log("Data is: " + DepositId + " " + amount + " " + date + " " + userId);
  return [DepositId, amount, date, userId];
}

function createData2(loan) {
  const RequestId = loan.loanId;
  const Sum = loan.sum
  const date = new Date(loan.dateToGetBack).toLocaleDateString('en-US');
  const userId = loan.loanerId;
  console.log("Data is: " + RequestId + " " + Sum + " " + date + " " + userId);
  return [RequestId, Sum, date, userId];
}

export default function DataTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let data = props.data || [];
  let loanRequests = props.data;  //It can't be const because we need to change it's value
  let deposits = props.deposits;  //It can't be const because we need to change it's value
  const [open, setOpen] = React.useState(false);
  const [currentLoanId, setCurrentLoanId] = React.useState(0); //The id of the loan that the user clicked on
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  //Functions to open the dialog
  const handleClickOpen = (loanId) => {
    console.log("loanId is: ", loanId);
    console.log("Open dialog");
    setCurrentLoanId(loanId);
    setOpen(true);
  };
  const handleClose = () => {
    console.log("Close dialog");
    setOpen(false);
  };
  if (deposits != null || deposits != undefined) {
    data = deposits.map((deposit) => createData(deposit));
  }
  if (loanRequests != null || loanRequests != undefined) {
    data = loanRequests.map((loan) => createData2(loan));
  }
  console.log("deposit data is: ", deposits, "loan data is: ", loanRequests)
  const titles = props.titles;
  const columns = [
    { id: 0, label: titles[0], minWidth: 80, format: (value) => value.toString() },
    { id: 1, label: titles[1], minWidth: 100 },
    {
      id: 2,
      label: titles[2],
      minWidth: 80,
    },
    {
      id: 3,
      label: titles[3],
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
            {
              loanRequests == undefined ?
                //If it's a deposits table
                data.map((row, index) => {
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
                }) ://If it's a loan requests table
                data.map((row, index) => {
                  console.log("Row is: ", row, " index is: ", index);
                  return (
                    <>
                      <TableRow hover role="button" onClick={() => handleClickOpen(row[0])} tabIndex={-1} key={index}>                      {columns.map((column) => {
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

                      <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle id="responsive-dialog-title">{"Loan request"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button autoFocus onClick={handleClose}>
                            Disagree
                          </Button>
                          <Button onClick={handleClose} autoFocus>
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  );

                })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
