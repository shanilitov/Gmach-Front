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


function createData(deposit) {
  const DepositId = deposit.depositId;
  const amount = deposit.sum.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const date = new Date(deposit.dateToPull).toLocaleDateString('en-US');
  const userId = deposit.userId;
  return [DepositId, amount, date, userId];
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
  //data is loans or deposits
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
      const response = await fetch(`your-api-endpoint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loanId: currentLoanId,
          problem: _problem,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      else {
        const data = await response.json();
        console.log("Reported problem successfully:", data);
        return data;
      }
    } catch (error) {
      console.error("Error reporting problem:", error);
    }
  };


  const ClickOnDeposit = (row) => {
    setOpen(true);
    console.log("Row is: ", row);
    console.log("Open dialog");
    setCurrentRequest(row)
    setCurrentLoanId(row[0]);
  }

  const ReleaseDeposit = () => {
    console.log("Release deposit start. currentRequest is: ", currentRequest);
    setWait(true);
    fetch(``, {
      method: "POST",
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json"
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

        setTimeout(() => {
          setWait(false);
          setMessage("Deposit released successfully");
          setAnswer(true);
        }, 3000);
      })
      .catch((error) => {
        console.log("Error in ReleaseDeposit(): ", error);
      });
  }

  const handleCloseReport = () => {
    console.log("Problem is: ", problem);
    var ans = reportAProblem();
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
      setMessage("Sorry, something went wrong. Please try again later.");
      setAnswer(true);
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
    // Create an array for deposits that haven't returned yet (dateToPull < today)
    const depositsNotReturned = deposits.filter(deposit => new Date(deposit.dateToPull) < new Date());
    // Create an array for deposits that return today (dateToPull = today)
    const depositsReturnToday = deposits.filter(deposit => {
      const today = new Date();
      const depositDate = new Date(deposit.dateToPull);
      return depositDate.getFullYear() === today.getFullYear() &&
        depositDate.getMonth() === today.getMonth() &&
        depositDate.getDate() === today.getDate();
    });
    // Create an array for deposits that have already returned (dateToPull > today)
    const depositsReturned = deposits.filter(deposit => new Date(deposit.dateToPull) > new Date());
    console.log("🚴‍♂️  depositsNotReturned is: ", depositsNotReturned);
    console.log("🚴‍♂️🚴‍♂️  depositsReturnToday is: ", depositsReturnToday);
    console.log("🚴‍♂️🚴‍♂️🚴‍♂️  depositsReturned is: ", depositsReturned);
    data = [
      depositsNotReturned.map(deposit => {
        const depositDate = new Date(deposit.dateToPull);
        const formattedDate = depositDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return { ...deposit, dateToPull: formattedDate };
      }),
      depositsReturnToday.map(deposit => {
        const depositDate = new Date(deposit.dateToPull);
        const formattedDate = depositDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return { ...deposit, dateToPull: formattedDate };
      }),
      depositsReturned.map(deposit => {
        const depositDate = new Date(deposit.dateToPull);
        const formattedDate = depositDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return { ...deposit, dateToPull: formattedDate };
      })
    ];
    console.log("🚴‍♂️🚴‍♂️🚴‍♂️🚴‍♂️  data is: ", data);
    //data = [depositsNotReturned, depositsReturnToday, depositsReturned];
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
    <div>
      {
        loanRequests !== undefined ?

          //If it's a loan requests table
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

                  {data.map((row, index) => {
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
                          {thereProblem ? <div>
                            <TextField type="text"  onChange={(ev) => setProblem(ev.target.value)} />
                            <Button onClick={handleCloseReport}>Report</Button>
                            {wait ? <div style={{ marginLeft: "45%", paddingBottom: "2%" }}><WaitComponent /> </div> : <div style={{ padding: "2%", height: "3%" }}></div>}
                            {answer ? <div style={{ paddingBottom: "2%" }}><Alert type="info" msg={message} /> </div> : <div style={{ padding: "2%", height: "3%" }}></div>}
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
                            <Button autoFocus onClick={handleClose}>
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


            {data[0] && data[0].length > 0 &&
              (<Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                      {data[0] && data[0].length > 0 && (

                        data[0].map((row, index) => {
                          return (
                            <>
                              <TableRow hover role="checkbox" tabIndex={-1} key={index}>{/*onClick={() => ClickOnDeposit(row)} */}
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
                              <Dialog fullScreen={fullScreen}
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
              </Paper>)}


            {data[1] && data[1].length > 0 &&
              (<Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                              <Dialog fullScreen={fullScreen}
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
              </Paper>)}


            {data[2] && data[2].length > 0 &&
              (<Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                      {data[2] && data[2].length > 0 && (

                        data[2].map((row, index) => {
                          return (
                            <>
                              <TableRow hover role="checkbox" tabIndex={-1} key={index}>{/*onClick={() => ClickOnDeposit(row)} */}
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
                              <Dialog fullScreen={fullScreen}
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
              </Paper>)}
          </div>

      }

    </div>
  );
}
