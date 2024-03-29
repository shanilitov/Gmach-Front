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
import { TextField } from '@mui/material';
import "../../../CSSFiles/StylePage.css";
import Messages from './Messages';
import Checkbox from '@mui/material/Checkbox';


function createData(deposit) {
  const DepositId = deposit.depositId;
  const amount = deposit.sum.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const date = new Date(deposit.dateToPull).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const formattedDate = `${date.slice(3, 5)}/${date.slice(0, 2)}/${date.slice(6)}`;
  console.log("in createData, date is: ", formattedDate)
  const userId = deposit.userId;
  return [DepositId, amount, formattedDate, userId];
}

function createData2(loan) {
  const RequestId = loan.loanId;
  const Sum = loan.sum
  const date = new Date(loan.dateToGetBack).toLocaleDateString('en-US');
  const userId = loan.loanerId;
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
  const [currentUserPassword, setCurrentUserPassword] = React.useState(""); //The password of the user that the admin clicked on
  const [moreDetails, setMoreDetails] = React.useState({}); //If true, show the more details component
  const [answer, setAnswer] = React.useState(false); //If true, show the alert component
  const [message, setMessage] = React.useState(""); //The message that will be shown in the alert component
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [problem, setProblem] = React.useState(""); //The problem that the admin will report
  const [thereProblem, setThereProblem] = React.useState(false); //If true, show the text field for the problem
  const [error, setError] = React.useState(false); //If true, show the progress component
  const [errorMessage, setErrorMessage] = React.useState(""); //The message that will be shown in the alert component

  const token = localStorage.getItem('token')

  const depositsOrder = ['depositId', 'sum', 'dateToPull', 'userId'];
  //data is loans or deposits
  console.log("props.data is: ", props.data)
  let data = props.data || [];
  let loansDetails = props.data || [];
  let index = 0;

  console.log("data is: ", data)

  let loanRequests = props.data;  //It can't be const because we need to change it's value
  let deposits = props.deposits;  //It can't be const because we need to change it's value


  //Functions to open the dialog
  const handleClickOpen = (row) => {
    console.log("Row is: ", row);
    console.log("Open dialog");
    setCurrentRequest(row)
    setCurrentLoanId(row[0]);

    const match = loansDetails.find(element => {
      console.log("element is: ", element);
      console.log("row is: ", row);
      console.log("element.loanId is: ", element.loanId,);
      console.log("row[0] is: ", row[0]);
      console.log("element.loanId === row[0] is: ", element.loanId === row[0]);
      if (element.loanId === row[0]) {
        console.log("match is: ", element, " 😂");
        setMoreDetails(element);
        console.log("moreDetails is: ", moreDetails, " 😂");
      }
      else {
        console.log("No match 😪")
      }

    });

    setOpen(true);
  };

  const handleClose = () => {
    console.log("Close dialog");
    setAnswer(false);
    setWait(false);
    setOpen(false);
    setThereProblem(false);
  };


  const reportAProblem = async () => {
    console.log("Report a problem");
    const _problem = problem;
    try {
      const response = await fetch(`https://localhost:7275/api/Message/ReportLoan`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
          "accept": "*/*",

        },
        body: JSON.stringify({
          loanID: currentLoanId,
          problem: _problem,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      else {
        // const data = await response.json();
        console.log("Reported problem successfully:")//, data);
        //return data;
      }
    } catch (error) {
      console.error("Error reporting problem:", error);
    }
  };


  async function disagree() {
    console.log("Disagree(). currentLoanId is: ", currentLoanId, "  currentRequest: ", currentRequest, " userId: ", currentRequest[3], " name: ", name);
    setWait(true);
    try {
      //Send a message to the user that his request was rejected
      const response = await fetch(`https://localhost:7275/api/Message/ReportLoan`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
          "accept": "*/*",

        },
        body: JSON.stringify({
          loanID: currentLoanId,
          problem: `Dear ${name}, We would like to inform you that your loan request was rejected. We are sorry for the inconvenience. Please contact us for more details. PlusMinus team.`,
        }),
      });
      if (!response.ok) {
        setWait(false);
        setErrorMessage(`Email didn't send.`);
        setError(true);
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
          setOpen(false);
        }, 3000);
      }
      else {
        //Delete loan request from the database
        const response = await fetch(`https://localhost:7275/api/LoanDetails/${currentLoanId}`, { method: "DELETE" })
        if (!response) {
          //Delete failed
          setErrorMessage(`Request deleted failed.`);
          setError(true);
          setTimeout(() => {
            setError(false);
            setErrorMessage("");
          setOpen(false);
          }, 3000);

        }
        else {
          //Delete succeeded
          setWait(false);
          setMessage("Request deleted successfully.");
          setAnswer(true);
          setTimeout(() => {
            setAnswer(false);
            setMessage("");
            setOpen(false);
          }, 3000);
            console.log("all procces runned successfully:")
        }
        
      }     
      setWait(false);
      setOpen(false);
    } catch (error) {
      console.error("Error in deleting loan request:", error);
      setErrorMessage("Error in deleting loan request. ", error);
      setError(true);
      setTimeout(() => {
        setWait(false);
        setOpen(false);
        setError(false);
        setErrorMessage("");
      }, 3000);
    }
  }

  
  const ClickOnDeposit = (row) => {
    console.log("Row is: ", row);
    setOpen(true);
    console.log("Open dialog");
    setCurrentRequest(row)
    setCurrentLoanId(row[0]);
  }

  const ReleaseDeposit = (id) => {
    //setInProgress(true);
    console.log("Release deposit start. currentRequest is: ", currentRequest);
    setWait(true);
    fetch(`https://localhost:7275/api/Deposit/Return/${currentRequest.depositId}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        "accept": "text/plain",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.text();
      })
      .then((data) => {
        console.log("‼ In ReleaseDepsit(), data is: ", data);
        //setInProgress(false);
        setWait(false);
        setTimeout(() => {
          setWait(false);
          setAnswer(true);
          setOpen(false);
          setMessage("Deposit released successfully");
        }, 1000);

      })
      .catch((error) => {
        console.log("Error in ReleaseDeposit(): ", error);
      });
  }

  //Function to report a problem in the loan request. like: "The user didn't enter all the details"
  const handleCloseReport = () => {
    console.log("Problem is: ", problem);
    let ans = reportAProblem();
    if (ans) {
      setThereProblem(false);
      setWait(true);
      setTimeout(() => {
        setWait(false);
        setOpen(false);

      }, 2000);
    }
    else {
      setWait(false);
      alert("Sorry, something went wrong. Please try again later.");
      setOpen(false);
    }
    setProblem("");
    setThereProblem(false);
  }

  const CloseReleaseDeposit = () => {
    console.log("Close dialog");
    setAnswer(false);
    setWait(false);
    setOpen(false);
  };

  function ApprovalLoan() {
    setWait(true);
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7275/api/LoanDetails/LoanApproval', {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            "accept": "text/plain",
            'confirmation': '15987532',
            "Content-Type": "application/json"
          },
          body: JSON.stringify(currentRequest[0]),
        });
        const data = await response.text();
        console.log("‼ In ApprovalLoan(), data is: ", data);
        setTimeout(() => {
          setWait(false);
          handleClose();
        }, 3000);
      } catch (error) {
        console.log("Error in ApprovalLoan(): ", error);
      }
    };

    fetchData();
  }


  if (deposits != null || deposits != undefined) {
    data = deposits.map((deposit) => createData(deposit));
    // Create an array for deposits that haven't returned yet (dateToPull <= today)
    const depositsNotReturned = deposits.filter(deposit => !deposit.isReturned);

    // Create an array for deposits that have already returned (dateToPull > today)
    const depositsReturned = deposits.filter(deposit => deposit.isReturned);
    console.log("🚴‍♂️  depositsNotReturned is: ", depositsNotReturned);
    console.log("🚴‍♂️🚴‍♂️🚴‍♂️  depositsReturned is: ", depositsReturned);
    data = [depositsNotReturned, depositsReturned];
    console.log("🚴‍♂️🚴‍♂️🚴‍♂️🚴‍♂️  data is: ", data);
    //data = [depositsNotReturned, depositsReturned];
  }
  if (loanRequests != null || loanRequests != undefined) {
    data = loanRequests.map((loan) => createData2(loan));
    //console.log("22222")
  }

  function formatSum(sum) {
    if (sum) {
      return sum.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.\d{2}$/, '');
    }
    console.log("in formatSum, sum is: ", sum)
  }

  const titles = props.titles;
  const columns = [
    { id: 0, label: titles[0], minWidth: 80, format: (value) => value.toString() },
    { id: 1, label: titles[1], minWidth: 80 },
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


  const DepositsColumns = [
    { id: 0, label: titles[0], minWidth: 120, format: (value) => value.toString() },
    { id: 1, label: titles[1], minWidth: 120 },
    {
      id: 2,
      label: titles[2],
      minWidth: 120,
    },
    {
      id: 3,
      label: "Return today?",
      minWidth: -50,
      align: 'right',
    },
    {
      id: 4,
      label: titles[3],
      minWidth: 20,
      align: 'right',
    },

  ];

  const handleChangePage = (ev, newPage) => {
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
    <div>
      {
        loanRequests !== undefined ?

          //If it's a loan requests table
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }} >
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

                  {data.map((row, index) => {
                    return (
                      <>
                        <TableRow hover role="button" onClick={() => handleClickOpen(row)} tabIndex={-1} key={index}>                      {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align} >
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
                              <p>{moreDetails && moreDetails.loanFile ? "Deed of guarantee: ✔️" : "Deed of guarantee: ❌"}
                                <img src={`${moreDetails && moreDetails.loanFile}`} alt="Deed of guarantee unsupported." style={{ height: "20%", width: "20%" }} onClick={(event) => {
                                  event.target.style.height = "100%";
                                  event.target.style.width = "100%";
                                }} />
                              </p>
                              <p><strong>Guarantors:</strong> {moreDetails && moreDetails.guarantors && moreDetails.guarantors.map((guarantor, index) => {
                                return (
                                  <div key={index}>
                                    {guarantor.guarantorId}
                                    <p> {"Name: " + guarantor.name}</p>
                                    <p>
                                      <a href={`mailto:${guarantor.emailAddress}`}>Email: {guarantor.emailAddress}</a>
                                    </p>
                                    <p> {guarantor.check ? "Check: ✔️" : "Check: ❌"}
                                      <img src={`${guarantor.check}`} alt="Check unsupported " style={{ height: "20%", width: "20%" }} onClick={(event) => {
                                        event.target.style.height = "100%";
                                        event.target.style.width = "100%";
                                      }} />
                                    </p>
                                  </div>
                                );
                              })}</p>

                            </div>
                          </DialogContent>
                          {wait ? <div style={{ marginLeft: "45%", paddingBottom: "2%" }}><WaitComponent /> </div> : <div style={{ padding: "2%", height: "3%" }}></div>}
                          {answer ? <div style={{ paddingBottom: "2%" }}><Alert type="info" msg={message} /> </div> : <div style={{ padding: "2%", height: "3%" }}></div>}
                          {error ? <div style={{ paddingBottom: "2%" }}><Alert type="error" msg={errorMessage} /> </div> : <div style={{ padding: "2%", height: "3%" }}></div>}
                          {thereProblem ? <div>
                            <TextField type="text" onChange={(ev) => setProblem(ev.target.value)} sx={{ width: "70%", margin: "2%" }} />
                            <Button variant="contained" onClick={handleCloseReport} sx={{ marginTop: "2.5%", padding: "2.2%", width: "20%" }}>Report</Button>
                            {wait ? <div style={{ marginLeft: "45%", paddingBottom: "2%" }}><WaitComponent /> </div> : <div style={{ padding: "2%", height: "3%" }}></div>}
                          </div> : null}
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
                                        'Authorization': `Bearer ${token}`,
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
                                    setCurrentUserPassword(password)
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
                                          'Authorization': `Bearer ${token}`,
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
                            <Button autoFocus onClick={() => { setThereProblem(true) }}>
                              Report a problem
                            </Button>
                            <Button autoFocus onClick={disagree}>
                              Disagree
                            </Button>
                            <Button onClick={ApprovalLoan} autoFocus>
                              Agree
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    );

                  }
                  )}


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
          </Paper >
          :

          //If it's a deposits table

          <div>
            {
              (<div className='depositsTable'><h3 color='rgb(0, 32, 96)'>Deposits in PlusMinus account</h3><Paper sx={{ width: '85%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }} >
                  <Table stickyHeader aria-label="sticky table</Table>">
                    <TableHead>
                      <TableRow>

                        {DepositsColumns.map((column) => (

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
                      {data[0] && data[0].length > 0 && (

                        data[0].map((row, index) => {
                          return (
                            <>
                              <TableRow hover tabIndex={-1} key={index} onClick={() => ClickOnDeposit(row)} >
                                {DepositsColumns.map((column) => {
                                  console.log(column.id)
                                  let value = row[depositsOrder[column.id]];
                                  if (column.id === 3) {
                                    const today = new Date();
                                    const returnDate = new Date(row[depositsOrder[2]]);
                                    console.log("returnDate is: ", returnDate + "; today is: ", today + "today == returnDate is: ", today == returnDate)
                                    if (returnDate.toDateString() === today.toDateString()) {
                                      value = "Yes 🔴";
                                    }
                                    else {
                                      value = "No 🟢";
                                    }
                                  }
                                  if (column.id === 4) {
                                    value = row[depositsOrder[3]]
                                  }
                                  console.log(value)

                                  return (

                                    <TableCell key={column.id} align={column.align}>
                                      {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : column.id === 2  // Check if it's the 'Return date' column
                                          ? formatDate(value) // Call the formatDate function
                                          : column.id === 1 ?
                                            formatSum(value) : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                              <Dialog fullScreen={fullScreen}
                                open={open}
                                onClose={CloseReleaseDeposit}
                                aria-labelledby="responsive-dialog-title">

                                <DialogTitle id="responsive-dialog-title">{"Release deposit"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText>
                                    User needs to get his deposit back.
                                  </DialogContentText>
                                  <DialogContentText>
                                    Deposit sum is : {formatSum(row.sum)}.
                                  </DialogContentText>
                                  <DialogContentText>
                                    __________________________________
                                  </DialogContentText>
                                  <DialogContentText>
                                    <strong>Is this deposit returned to the depositor?</strong>
                                  </DialogContentText>
                                  {wait ? <div style={{ marginLeft: "45%", paddingBottom: "2%" }}><WaitComponent /> </div> : <div style={{ padding: "2%", height: "3%" }}></div>}
                                  <DialogActions>
                                    <Button autoFocus onClick={(ev) => { ReleaseDeposit(row.id) }}>Yes, returned</Button>
                                    <Button autoFocus onClick={CloseReleaseDeposit}>Not yet</Button>

                                  </DialogActions>
                                </DialogContent>
                              </Dialog>
                            </>
                          );
                        })
                      )}
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
              </Paper></div>)}


            {
              (<div className='depositsTable'><h3 color='rgb(0, 32, 96)'>Deposits already returned </h3><Paper sx={{ width: '85%', overflow: 'hidden' }}>
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
                      {data[1] && data[1].length > 0 && (

                        data[1].map((row, index) => {
                          return (
                            <>
                              <TableRow hover role="checkbox" tabIndex={-1} key={index}>{/*onClick={() => ClickOnDeposit(row)} */}
                                {columns.map((column) => {
                                  const value = row[depositsOrder[column.id]];
                                  return (
                                    <TableCell key={column.id} align={column.align}>
                                      {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : column.id === 2  // Check if it's the 'Return date' column
                                          ? formatDate(value) // Call the formatDate function
                                          : column.id == 1 ? formatSum(value) : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                              {/*<Dialog fullScreen={fullScreen}
                                open={open}
                                onClose={CloseReleaseDeposit}
                                aria-labelledby="responsive-dialog-title">

                                <DialogTitle id="responsive-dialog-title">{"Release deposit"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText>
                                    User number {currentRequest[3]} needs to get his deposit back.
                                  </DialogContentText>
                                  <DialogContentText>
                                    Deposit id: {currentRequest[0]}
                                  </DialogContentText>
                                  {wait ? <div style={{ marginLeft: "45%", paddingBottom: "2%" }}><WaitComponent /> </div> : <div style={{ padding: "2%", height: "3%" }}></div>}
                                  <DialogActions>
                                    <Button autoFocus onClick={ReleaseDeposit}>Release</Button>
                                    <Button autoFocus onClick={CloseReleaseDeposit}>Close</Button>

                                  </DialogActions>
                                </DialogContent>
                              </Dialog>*/}
                            </>
                          );
                        })
                      )}
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
              </Paper></div>)}

          </div>



      }

    </div>
  );
}
