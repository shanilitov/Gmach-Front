import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../HelpingComponent/Header';
import MainFeaturedPost from '../HelpingComponent/MainFeaturedPost';
import FeaturedPost from '../HelpingComponent/FeaturedPost';
import Main from '../HelpingComponent/Main';
import Sidebar from '../HelpingComponent/Sidebar';
import Footer from '../HelpingComponent/Footer';
import post1 from '../HelpingComponent/blog-post.1.md';
import post2 from '../HelpingComponent/blog-post.2.md';
import post3 from '../HelpingComponent/blog-post.3.md';
import Bar from '../HelpingComponent/Bar';
import CustomBar from '../HelpingComponent/CustomBar';
import Slider from '../HelpingComponent/Slider';
import { useState, useEffect } from 'react';


const sections = [
  { title: 'About us', url: '/AboutUs' },//Blog1- talking about the company.
  { title: 'Activity', url: '/Graphes' }, //Grafes- show the activity in company in grafs.
  //{ title: 'Searches', url: '/Searches' }, //Blog2- talking about searches in economy.
  // { title: 'Our services', url: '/Services' },//Blog3- talking about the services that we give.
  { title: 'Contact us', url: '/ContactUs' },//Blog4- details how to contact us.
  { title: 'Articles', url: '/Articles' },//Articles that talking about economy etc.
];

const mainFeaturedPost = {
  title: 'PlusMinus - Empowering Through Compassion!',
  description:
    "At PlusMinus, we are dedicated to the principles of gemilut chasadim, acts of loving-kindness, and our mission revolves around managing an interest-free loan system. As a gemach (short for gemilut chasadim), we operate as a benevolent association committed to fostering a sense of community and mutual support. ",
  image: 'https://www.afekbiz.co.il/img/files/%D7%94%D7%9C%D7%95%D7%95%D7%90%D7%94%20%D7%91%D7%A2%D7%A8%D7%91%D7%95%D7%AA%20%D7%94%D7%9E%D7%93%D7%99%D7%A0%D7%94%20%D7%9C%D7%94%D7%A7%D7%9E%D7%AA%20%D7%A2%D7%A1%D7%A7.jpg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: '8 simple ways to save money. ',
    date: 'Nov 12',
    description:
      'Saving is easier when you have a plan—follow these steps to create one',
    image: 'https://www.creditunion.co.il/wp-content/uploads/2015/12/shutterstock_237828910.jpg',
    imageLabel: 'Image Text',
    link: '/Articles'
  },
  {
    title: 'In second thought...',
    date: 'Nov 11',
    description:
      'Thinking of opening a savings plan? Maybe think about it again...',
    image: 'https://pic1.calcalist.co.il/PicServer2/20122005/486719/shutterstock_130189253.jpgLM.jpg',
    imageLabel: 'Image Text',
    link: '/AboutUs'
  },
];

const posts = [post1, post2];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function Blog() {
  const [readme1Content, setReadme1Content] = useState('');
  const [readme2Content, setReadme2Content] = useState('');
  localStorage.removeItem("admin");
  useEffect(() => {
    fetch('blog-post.1.md')
      .then(response => response.text())
      .then(content => setReadme1Content(content))
      .catch(error => console.error(error));
    fetch('blog-post.2.md')
      .then(response => response.text())
      .then(content => setReadme2Content(content))
      .catch(error => console.error(error));
  }, []);
  return (
    <>
      <CustomBar />
      <div style={{ marginTop: '22%' }}>
      <div style={{height:"50%"}}>
      {/*<Slider/>*/}
      </div>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <Header title="Blog" sections={sections} />

            <main>
              <a href='./AboutUs' style={{ textDecoration: "none" }}><MainFeaturedPost post={mainFeaturedPost} link={'./AboutUs'} /></a>
              <Grid container spacing={4}>
                {featuredPosts && featuredPosts.map((post) => (
                  <FeaturedPost key={post.title} post={post} link={post.link} />
                ))}
              </Grid>
              <Grid container spacing={5} sx={{ mt: 3 }}>
                  {readme1Content && <Main title="AA" content={readme1Content} />}
                  {readme2Content && <Main title="BB" content={readme2Content} />}

               <Main title="From the firehose" posts={posts} />
           {/*   <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />*/}
              </Grid>
            </main>
          </Container>
          <Footer
            title="Plus Minus"
            description="Created by Sara Daum and Shani Litov"
          />
        </ThemeProvider>
      </div>
    </>

  );
}