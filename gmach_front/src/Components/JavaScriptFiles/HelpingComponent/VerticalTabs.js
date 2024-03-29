import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AlignItemsList from "../HelpingComponent/AlignItemsList";
import Deposits from "../MaimComponent/Deposits";
import Loans from "../MaimComponent/Loans";
import Blog from "../HelpingComponent/Blog"
import ActionAreaCard from "./ActionAreaCard";
import AboutUs from "./AboutUs";
import AllUsersDeposits from "./AllUsersDeposits";
import AllUsersLoans from "./AllUsersLoansReqests";
import AllUsersLoansV from "./AllUsersLoansV";
import Donations from "./Donations";
import Messages from "./Messages";
import { useParams } from "react-router-dom";
import AllUserMessages from "./AllUserMessages";
import AllUserContactRequest from "./AllUserContactRequests";
import AllUsers from "./AllUsers";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 6 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function getCookie(name) {
  return localStorage.getItem(name);
  /*
  let cookieArray = document.cookie.split('; ');
  let cookie = cookieArray.find(row => row.startsWith(name + '='));
  if (cookie) {
    let value = cookie.split('=')[1];
    return value;
  }
  return null;*/
}




export default function VerticalTabs(props) {
  const [value, setValue] = React.useState(0);
  const userId = props.userId;
  const userName = props.userName;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  React.useEffect(() => {
    console.log("Cookie value is: ", getCookie('admin'));
  })

  return (

    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "auto",
        marginTop: "",
        width: "100%",
      }}
    >
      <Tabs
        height="600%"
        width="100%"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 3, borderColor: "divider" }}
      >
        <Tab label="Deposits" {...a11yProps(0)} />
        <Tab label="Loans" {...a11yProps(1)} />
        <Tab label="User messages" {...a11yProps(2)} />
        {getCookie('admin') ? <Tab label="User Deposits"  {...a11yProps(3)} /> : null}
        {/*getCookie('admin') ? <Tab label="Donations"  {...a11yProps(4)} /> : null*/}
        {getCookie('admin') ? <Tab label="User Loans" {...a11yProps(4)} /> : null}
        {getCookie('admin') ? <Tab label="Loan requests" {...a11yProps(5)} /> : null}
        {getCookie('admin') ? <Tab label="Website messages" {...a11yProps(6)} /> : null}
        {/* {getCookie('admin') ? <Tab label="All Users" {...a11yProps(7)} /> : null} */}



      </Tabs>

      <TabPanel value={value} index={0} >
        <Deposits id={userId} name={userName} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Loans id={userId} name={userName} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AllUserMessages id={userId} style={{
          width:"369px"
        }}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AllUsersDeposits admin={getCookie('admin')} />
      </TabPanel>
      {/*<TabPanel value={value} index={4}>
        <Donations admin={getCookie('admin')} />
    </TabPanel>*/}
      <TabPanel value={value} index={4}>
        <AllUsersLoansV />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <AllUsersLoans admin={getCookie('admin')} />
      </TabPanel>



      <TabPanel value={value} index={6}>
        <AllUserContactRequest />
      </TabPanel>

{/*       
      <TabPanel value={value} index={7}>
        <AllUsers />
      </TabPanel> */}

    </Box>
  );
}
