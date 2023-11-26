import "../../../CSSFiles/StylePage.css";
import Bar from "./Bar";
import { Toolbar } from "@mui/material";
import Link from '@mui/material/Link';
import Footer from "./Footer";


export default function AboutUs() {
    const sections = [
        { title: 'About us', url: '/AboutUs' },//Blog1- talking about the company.
        { title: 'Activity', url: '/Graphes' }, //Grafes- show the activity in company in grafs.
        { title: 'Searches', url: '/Searches' }, //Blog2- talking about searches in economy.
        { title: 'Our services', url: '/Services' },//Blog3- talking about the services that we give.
        { title: 'Contact us', url: '/ContactUs' },//Blog4- details how to contact us.
        { title: 'Articles', url: '/Articles' },//Articles that talking about economy etc.
    ];


    return (
        <div className="AboutUs">
            <Bar />
            <div style={{ zIndex: "99", height: "5%", backgroundColor: "rgba(0, 32, 96, 0.5)", marginTop: "10%", color: "rgb(223, 221, 53)", position: "fixed", width: "100%", padding: "1%" }}>
                <Toolbar
                    component="nav"
                    variant="dense"
                    sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
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
            <div className="Container">
                <div className="Container1" style={{ marginTop: "13%" }}>
                    <img className="AboutPicture" src="https://www.roseandcrownpa.com/wp-content/uploads/2023/01/%D7%94%D7%A9%D7%A7%D7%A2%D7%94-%D7%9B%D7%A1%D7%A4%D7%99%D7%AA-1.png" />
                    <h2 id="H_OfAboutUs">What is our purpose?</h2>
                    <div className="AboutContent">
                        <p>
                            Plus Minus ## was ...</p>
                        <p> sdhgs dhfdujfh dj djjsf jngfjndjffoi fuff skf ryc tbh kt husg, dawir dkti dkmklp xokrnv qapoxe.</p>
                        <p>  dnhgu calppe xerlpo bvna tbh kt huuangd, ukt nchbv knv fk vzni zv ffv.</p>
                        <p>   tct' nv vdcuk kjxs? vrh f,uc athi kvo ahgur!!</p>
                        <p>  tz knv kvmhc dcuk fk fl nmunmo.</p>
                    </div>
                    <div className="AboutContent">

                        <p>    thi kh mggcchio gfahu urmui kvrho t, vykpui' zv vurhs kh t, vnmc ruj.</p>
                        <p> udo, knv tbhvhh jhhc, kunr kvae tyz zv?</p>
                        <p> tbh kt husg.</p>
                        <p>  cfk tupi nv atbh husg, zv akt fk tjs hfuk kgau fk scrukfi.</p>
                    </div>
                    <p> עמותת "פלוס מינוס" הוקמה במטרה להקל על משפחות בני התורה הנאנקים תחת עול הפרנסה.
                    </p>
                    <p></p>
                </div>
            </div>
            <div style={{ backgroundColor: "rgba(223, 221, 53, 0.5)", height: "1%", width: "85%", marginLeft: "auto", marginRight: "auto" }}></div>
            < div className="Container2">
                <img id="AboutPicture2" className="AboutPicture" src="https://www.roseandcrownpa.com/wp-content/uploads/2023/01/%D7%94%D7%A9%D7%A7%D7%A2%D7%94-%D7%9B%D7%A1%D7%A4%D7%99%D7%AA-1.png" />
                <div className="AboutContent">
                    <p> jshfsjh js thbkkdgi thi kh gmxho hunhumr kfmuc nkt nkt tck</p>
                    <p>  tbh k hsg, vn tbh gurtn, js eri zvkt xmoodpds cjdfjks wlks joilfal sjgb jkaofv</p>
                    <p> tkviekscs mmk ak jsl? kslwkJ glkw jgilkz njdb n eikr falv kokfksl </p>
                    <p>    thi kh mggcchio gfahu urmui kvrho t, vykpui' zv vurhs kh t, vnmc ruj.</p>
                    <p> udo, knv tbhvhh jhhc, kunr kvae tyz zv?</p>
                    <p> tbh kt husg.</p>
                    <p>  cfk tupi nv atbh husg, zv akt fk tjs hfuk kgau fk scrukfi.</p>

                </div>
            </div>
            <Footer />
        </div >
    )
}
