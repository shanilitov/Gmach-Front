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
import WaitComponent from "../HelpingComponent/WaitComponent";
import Alert from "./Alert";
import { useParams } from 'react-router-dom';


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
  //console.log("Data is: " + RequestId + " " + Sum + " " + date + " " + userId);
  return [RequestId, Sum, date, userId];
}

export default function DataTable(props) {
  const { id } = useParams();
  const { name } = useParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [wait, setWait] = React.useState(false); //If true, show the wait component
  const [currentLoanId, setCurrentLoanId] = React.useState(0); //The id of the loan that the user clicked on
  const [currentRequest, setCurrentRequest] = React.useState([]); //The loan that the user clicked on
  const [moreDetails, setMoreDetails] = React.useState({}); //If true, show the more details component
  const [answer, setAnswer] = React.useState(false); //If true, show the alert component
  const [message, setMessage] = React.useState(""); //The message that will be shown in the alert component
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  let data = props.data || [];
  console.log("data is: ", data)
  if(data && data.array){
    console.log("data.array is: ", data.array);
  }
  let loanRequests = props.data;  //It can't be const because we need to change it's value
  let deposits = props.deposits;  //It can't be const because we need to change it's value

  //Functions to open the dialog
  const handleClickOpen = (row) => {
    console.log("Row is: ", row);
    console.log("Open dialog");
    setCurrentRequest(row)
    setCurrentLoanId(row[0]);
    if(data && data.array){
      console.log("data.array is: ", data.array);
    const match = data.array.forEach(element => {
      if (element.loanId === row[0]) {
        console.log("match is: ", element, " 😂");
        setMoreDetails(element);
      }
      else{
        console.log("No match 😪")
      }
    });
  }
    setOpen(true);
  };
  const handleClose = () => {
    console.log("Close dialog");
    setAnswer(false);
    setWait(false);
    setOpen(false);
  };
  if (deposits != null || deposits != undefined) {
    data = deposits.map((deposit) => createData(deposit));
  }
  if (loanRequests != null || loanRequests != undefined) {
    data = loanRequests.map((loan) => createData2(loan));
  }
  //console.log("deposit data is: ", deposits, "loan data is: ", loanRequests)
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
                  return (
                    <>
                      <TableRow hover role="button" onClick={() => handleClickOpen(row)} tabIndex={-1} key={index}>                      {columns.map((column) => {
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
                            User number {currentRequest[3]} wants to take a loan. Do you agree?
                            {console.log(currentRequest)}
                          </DialogContentText>
                          <div>
                            <h4>Loan details:</h4>
                            <p>Loan id: {currentRequest[0]}</p>
                            <p>Sum: {currentRequest[1]}</p>
                            <p>Return date: {currentRequest[2]}</p>
                            <p>Deed of guarantee:
                              <img src={`${currentRequest[4]}`} alt="Deed of guarantee" />
                            </p>
                          </div>
                        </DialogContent>
                        {wait ? <div style={{ marginLeft: "45%", paddingBottom: "2%" }}><WaitComponent /> </div> : <div style={{ padding: "2%", height: "3%" }}></div>}
                        {answer ? <div style={{ paddingBottom: "2%" }}><Alert type="info" msg={message} /> </div> : <div style={{ padding: "2%", height: "3%" }}></div>}
                        <DialogActions>
                          <Button autoFocus onClick={() => {
                            setAnswer(false);
                            console.log("current loan id is: ", currentLoanId + ";  fetch started");
                            setWait(true);
                            const fetchData = async () => {
                              try {
                                try {
                                  const URL = `https://localhost:7275/api/User/GetUserPassword/${id}`;
                                  const response = await fetch(URL, {
                                    method: 'GET',
                                    headers: {
                                      'Content-Type': 'application/json',
                                    },
                                  });
                                  if (response == null) {
                                    setWait(false)
                                    setMessage("Soory, server response with NULL")
                                    setAnswer(true);
                                    console.log("response is null");
                                  }
                                  const password = await response.json();
                                  console.log("Password of user is: ", password);

                                  //If server returned null, that means that the user doesn't exist or that something went wrong:
                                  if (password == null || password == undefined || password == "") {
                                    setWait(false)
                                    setMessage("Sorry, but there is a problem. Server doesn't new you... ");
                                    setAnswer(true);
                                  }
                                  //If server returned the user password:
                                  else {
                                    const url = `https://localhost:7275/api/LoanDetails/AdminGetLoanForApproval`;
                                    const response = await fetch(url, {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'confirmation': password
                                      },
                                      body: JSON.stringify({
                                        //  loanId: currentLoanId,
                                      })
                                    });
                                    const data = await response.json();
                                    console.log("data from server is: ", data);
                                    console.log("current loan id is: ", currentLoanId);
                                    console.log("data.includes(currentLoanId)", data.includes(currentLoanId));
                                    if (data.includes(currentLoanId)) {
                                      setTimeout(() => {
                                        setWait(false)
                                        setMessage("The algorithm recommends approving this loan request. \nThe approvaled loans are: " + data + ".");
                                        setAnswer(true);
                                      }, 2500);

                                    } else {
                                      setTimeout(() => {
                                        setWait(false)
                                        setMessage("The algorithm recommends rejecting this loan request. ");
                                        setAnswer(true)
                                      }, 2500);
                                    }

                                    if (data == null || data == undefined || data == "") {
                                      setWait(false)
                                      setMessage("Sorry, something went wrong.");
                                      setAnswer(true);
                                    }

                                  }
                                }
                                catch (error) {
                                  setWait(false);
                                  setMessage("Sorry, but there is a problem.  ", error);
                                  setAnswer(true);
                                }

                              }
                              catch (error) {
                                console.log("Error is: ", error);
                                setMessage("Sorry, but there is a problem. ", error);
                              }
                            }
                            fetchData().catch((error) => {
                              console.error("Error fetching data:", error);
                              setMessage("Error fetching data:", error);
                            });

                          }}>
                            Check feasibility
                          </Button>
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
