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

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 300,
        marginTop: "13%",
      }}
    >
      <Tabs
      height="200%"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 3, borderColor: "divider" }}
      >
        <Tab label="השקעות" {...a11yProps(0)} />
        <Tab label="הלוואות" {...a11yProps(1)} />
        <Tab label="פעילות העמותה" {...a11yProps(2)} />
        <Tab label="פעילות העמותה" {...a11yProps(3)} />
      </Tabs>
      
      <TabPanel  value={value} index={0} >
        <Deposits />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Loans />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Blog />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AboutUs />
      </TabPanel>
    </Box>
  );
}
