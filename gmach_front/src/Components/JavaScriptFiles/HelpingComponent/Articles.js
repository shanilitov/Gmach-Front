import React from 'react';
import Bar from './Bar';
import "../../../CSSFiles/StylePage.css";
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';


function Articles() {

    const sections = [
        { title: 'About us', url: '/AboutUs' },//Blog1- talking about the company.
        { title: 'Activity', url: '/Graphes' }, //Grafes- show the activity in company in grafs.
        { title: 'Searches', url: '/Searches' }, //Blog2- talking about searches in economy.
        { title: 'Our services', url: '/Services' },//Blog3- talking about the services that we give.
        { title: 'Contact us', url: '/ContactUs' },//Blog4- details how to contact us.
        { title: 'Articles', url: '/Articles' },//Articles that talking about economy etc.
    ];

    return (
        <div>
            <Bar />
            <div style={{ zIndex: "99", height: "5%", backgroundColor:"rgba(0, 32, 96, 0.5)", marginTop: "2%", color: "rgb(223, 221, 53)", position: "fixed", width: "100%", padding: "1%"}}>
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
            <div style={{ position: "fixed", marginTop: "7%" , color:"#002060", backgroundColor: "rgba(223, 221, 53, 0.5)"}}> <h2 style={{ marginLeft: "3%" }}>8 simple ways to save money</h2></div>
            <div className='Article_Container'>
                <div className="items">
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>1|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Record your expenses</h3>
                    </div>
                    <p>
                        The first step to start saving money is figuring out how much you spend. Keep track of all your expenses—that means every coffee, household item and cash tip as well as regular monthly bills. Record your expenses however is easiest for you—a pencil and paper, a simple spreadsheet or a free online spending tracker or app. Once you have your data, organize the numbers by categories, such as gas, groceries and mortgage, and total each amount. Use your credit card and bank statements to make sure you’ve included everything.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>2|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Include saving in your budget</h3>
                    </div>
                    <p>
                        Now that you know what you spend in a month, you can begin to create a budget. Your budget should show what your expenses are relative to your income, so that you can plan your spending and limit overspending. Be sure to factor in expenses that occur regularly but not every month, such as car maintenance. Include a savings category in your budget and aim to save an amount that initially feels comfortable to you. Plan on eventually increasing your savings by up to 15 to 20 percent of your income.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>3|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Find ways to cut spending</h3>
                    </div>
                    <p>
                        If your expenses are so high that you can’t save as much as you’d like, it might be time to cut back. Identify nonessentials that you can spend less on, such as entertainment and dining out. Look for ways to save on your fixed monthly expenses like television and your cell phone, too. Here are some ideas for trimming everyday expenses:
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>4|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Set savings goals</h3>
                    </div>
                    <p>
                        One of the best ways to save money is to set a goal. Start by thinking of what you might want to save for—perhaps you’re getting married, planning a vacation or saving for retirement. Then figure out how much money you’ll need and how long it might take you to save it.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>5|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Decide on your priorities</h3>
                    </div>
                    <p>
                        After your expenses and income, your goals are likely to have the biggest impact on how you allocate your savings. Be sure to remember long-term goals—it’s important that planning for retirement doesn’t take a back seat to shorter-term needs. Prioritizing goals can give you a clear idea of where to start saving. For example, if you know you’re going to need to replace your car in the near future, you could start putting money away for one now.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>6|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Pick the right tools</h3>
                    </div>
                    <p>
                        <strong> If you’re saving for short-term goals, consider using these FDIC-insured deposit accounts:</strong>
                    </p>
                    <ul>
                        <li>A savings account</li>
                        <li>A certificate of deposit (CD), which locks in your money for a fixed period of time at a rate that is typically higher than that of a savings account</li>

                    </ul>
                    <p>
                        <strong>For long-term goals consider:</strong>
                    </p>
                    <ul>
                        <li>FDIC-insured individual retirement accounts (IRAs) or 529 plans, which are tax-efficient savings accounts</li>
                        <li>Securities, such as stocks or mutual funds. These investment products are available through investment accounts with a broker-dealer</li>

                    </ul>
                    <p>
                        If you’re saving for retirement, look into tax-advantaged options like a 401(k) or an individual retirement account (IRA). If you’re saving for education, consider a tax-advantaged 529 savings plan.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>7|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Make saving automatic</h3>
                    </div>
                    <p>
                        Almost all banks offer automated transfers between your checking and savings accounts. You can choose when, how much and where to transfer money to, or even split your direct deposit between your checking and savings accounts. Automated transfers are a great way to save money since you don’t have to think about it and it generally reduces the temptation to spend the money instead.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>8|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Watch your savings grow</h3>
                    </div>
                    <p>
                        Check your progress every month. Not only will this help you stick to your personal savings plan but it also helps you identify and fix problems quickly. These simple ways to save money may even inspire you to save more and hit your goals faster.
                    </p>




                </div></div>
        </div >
    );
}

export default Articles;

