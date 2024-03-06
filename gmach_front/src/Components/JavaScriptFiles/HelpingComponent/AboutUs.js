import "../../../CSSFiles/StylePage.css";
import Bar from "./Bar";
import { Toolbar } from "@mui/material";
import Link from '@mui/material/Link';
import Footer from "./Footer";


export default function AboutUs() {
    const sections = [
        { title: 'About us', url: '/AboutUs' },//Blog1- talking about the company.
        { title: 'Activity', url: '/Graphes' }, //Grafes- show the activity in company in grafs.
        //{ title: 'Searches', url: '/Searches' }, //Blog2- talking about searches in economy.
        //{ title: 'Our services', url: '/Services' },//Blog3- talking about the services that we give.
        { title: 'Contact us', url: '/ContactUs' },//Blog4- details how to contact us.
        { title: 'Articles', url: '/Articles' },//Articles that talking about economy etc.
    ];



    return (
        <div className="AboutUs">
            <Bar />
            <div style={{ zIndex: "99", height: "5%", backgroundColor: "rgba(0, 32, 96, 0.5)", marginTop: "10%", color: "rgb(223, 221, 53)", position: "fixed", width: "100%", padding: "1.5%" }}>
                <Toolbar
                    component="nav"
                    variant="dense"
                    sx={{ justifyContent: 'space-between', overflowX: 'auto'}}
                >
                    {sections.map((section) => (
                        <Link
                            color="inherit"
                            noWrap
                            key={section.title}
                            variant="body2"
                            href={section.url}
                            sx={{ p: 1, flexShrink: 0 }}
                        >
                            {section.title}
                        </Link>
                    ))}
                </Toolbar>
            </div>
                    {/*<div className="flexPictures">
                        <img className="AboutPicture" src="https://www.roseandcrownpa.com/wp-content/uploads/2023/01/%D7%94%D7%A9%D7%A7%D7%A2%D7%94-%D7%9B%D7%A1%D7%A4%D7%99%D7%AA-1.png" />
                        <img className="AboutPicture" src="https://img.freepik.com/free-photo/saving-money-concept-preset-by-male-hand-putting-money-coin-stack-growing-business-arrange-coins-into-heaps-with-hands-content-about-money_1150-45705.jpg?size=626&ext=jpg" />
                    </div>*/}
            <div className="Container">
                <div className="Container1" style={{ marginTop: "13%" }}>
                    <div className="AboutContent">
                        <div className="about-us">
                           
                            <h2>Welcome to PlusMinus - Empowering Through Compassion!</h2>

                            <p>
                                At PlusMinus, we are dedicated to the principles of gemilut chasadim, acts of loving-kindness,
                                and our mission revolves around managing an interest-free loan system. As a gemach (short for gemilut chasadim),
                                we operate as a benevolent association committed to fostering a sense of community and mutual support.
                            </p>

                            <h3>Our Purpose</h3>
                            <p>
                                Our primary focus is on administering interest-free loans to individuals in need, creating a platform where
                                generosity and compassion come together. We firmly believe in the power of people helping people, and we have
                                built our organization on the values of Jewish brotherhood, unity, and assisting one another in times of
                                financial challenge.
                            </p>

                            <h3>The Interest-Free Loan System</h3>
                            <p>
                                What sets us apart is our unique interest-free loan system. This system is designed to assist those facing
                                temporary financial difficulties by providing them with a structured loan from funds entrusted to us by
                                individuals with the means and desire to contribute. The borrowed funds are then repaid without any interest,
                                making it a sustainable and ethical way to provide financial assistance.
                            </p>

                            <h3>Our Community</h3>
                            <p>
                                PlusMinus operates as a community-driven initiative, bringing together individuals who are
                                willing to contribute to the well-being of others. The sense of responsibility and commitment within our
                                community is the driving force behind our success. Every member, whether providing financial support or
                                receiving assistance, is an integral part of a network built on trust, compassion, and shared values.
                            </p>

                            <h3>Core Values</h3>
                            <p>
                                Our organization is rooted in Jewish values, emphasizing the importance of brotherhood, empathy, and the mitzvah
                                of lending a helping hand. We are guided by the principle that true wealth is found in the ability to uplift
                                others and create a supportive environment for those facing challenges.
                            </p>

                            <h3>Get Involved</h3>
                            <p>
                                Join us on our mission to make a meaningful impact in the lives of individuals and families. Whether you are
                                seeking assistance or looking to contribute, PlusMinus welcomes you to be part of our
                                compassionate community.
                            </p>

                            <p>Thank you for visiting us, and together, let's continue to build a world where kindness and generosity prevail.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "rgba(223, 221, 53, 0.5)", height: "1%", width: "85%", marginLeft: "auto", marginRight: "auto" }}></div>


            <Footer />
        </div >
    )
}
