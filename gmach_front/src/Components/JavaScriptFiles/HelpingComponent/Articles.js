import React, { useState } from 'react';
import Bar from './Bar';
import "../../../CSSFiles/StylePage.css";
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Footer from './Footer';
import { Button } from '@mui/material';


function Articles() {
    const [Article, setArticle] = useState(1)

    const sections = [
        { title: 'About us', url: '/AboutUs' },//Blog1- talking about the company.
        { title: 'Activity', url: '/Graphes' }, //Grafes- show the activity in company in grafs.
        //{ title: 'Searches', url: '/Searches' }, //Blog2- talking about searches in economy.
        // { title: 'Our services', url: '/Services' },//Blog3- talking about the services that we give.
        { title: 'Contact us', url: '/ContactUs' },//Blog4- details how to contact us.
        { title: 'Articles', url: '/Articles' },//Articles that talking about economy etc.
    ];

    function changeArticle() {
        setArticle(Article + 1)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function prevArticle() {
        setArticle(Article - 1)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div>
            <Bar />
            <div style={{ zIndex: "99", height: "7%", backgroundColor: "rgba(0, 32, 96, 0.5)", marginTop: "2%", color: "rgb(223, 221, 53)", position: "fixed", width: "100%", padding: "1%" }}>
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
            <div className='Article_Container'>
                <div className="items">
               {Article == 1?<> <div style={{  marginLeft:"-30%", color: "#002060", backgroundColor: "rgba(223, 221, 53, 0.5)", width: "40%", padding:"2%" }}> <h2 style={{ marginLeft: "3%" }}>8 simple ways to save money</h2></div>
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
                    <Button onClick={changeArticle} style={{ backgroundColor: "rgba(223, 221, 53, 0.5)", color: "#002060", marginTop: "2%", marginBottom: "2%" }}>Next Article</Button>
                    </>:null}

                    {Article == 2?<><div style={{ marginLeft:"-30%", color: "#002060", backgroundColor: "rgba(223, 221, 53, 0.5)", width: "40%", padding:"1%" , marginBottom:"2%"}}> <h2 style={{ marginLeft: "3%" }}>How to Be Smart with Your Money</h2></div>

                    <div className="item">
                        <p>
                            Being smart with your money is essential for financial stability and achieving your financial goals. Here are some tips to help you be smart with your money:
                        </p>
                    </div>

                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>1|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Create a budget</h3>
                    </div>
                    <p>
                        Start by creating a budget that outlines your income and expenses. This will help you track where your money is going and identify areas where you can cut back on spending.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>2|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Save regularly</h3>
                    </div>
                    <p>
                        Make saving a priority by setting aside a portion of your income each month. Aim to save at least 10% of your income, and consider automating your savings to make it easier.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>3|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Reduce debt</h3>
                    </div>
                    <p>
                        Pay off high-interest debt as quickly as possible to save on interest payments. Consider consolidating your debt or negotiating lower interest rates with creditors.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>4|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Invest wisely</h3>
                    </div>
                    <p>
                        Educate yourself about different investment options and choose investments that align with your financial goals and risk tolerance. Consider diversifying your portfolio to minimize risk.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>5|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Track your expenses</h3>
                    </div>
                    <p>
                        Keep a record of all your expenses to ensure you stay within your budget. Use budgeting apps or spreadsheets to easily track and categorize your expenses.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>6|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Avoid impulse purchases</h3>
                    </div>
                    <p>
                        Before making a purchase, ask yourself if it's a necessity or a want. Avoid impulse purchases and give yourself time to consider whether it aligns with your financial goals.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>7|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Plan for emergencies</h3>
                    </div>
                    <p>
                        Build an emergency fund to cover unexpected expenses. Aim to save at least three to six months' worth of living expenses in case of job loss or other financial emergencies.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>8|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Seek professional advice</h3>
                    </div>
                    <p>
                        Consider consulting with a financial advisor or planner to help you make informed decisions about your money and investments.
                    </p>
                    <Button onClick={prevArticle} style={{ backgroundColor: "rgba(223, 221, 53, 0.5)", color: "#002060", margin: "1.5%", padding:"1%"}}>Previous Article</Button>
                    <Button onClick={changeArticle} style={{ backgroundColor: "rgba(223, 221, 53, 0.5)", color: "#002060", margin: "1.5%", padding:"1%"}}>Next Article</Button>
                    </>:null}
                    {Article == 3?<><div style={{ marginLeft:"-30%", color: "#002060", backgroundColor: "rgba(223, 221, 53, 0.5)", width: "40%", padding:"1%" , marginBottom:"2%"}}> <h2 style={{ marginLeft: "3%" }}>Thinking of opening a savings plan? Maybe think about it again...</h2></div>
                    <p>
                        Are you considering opening a savings plan? It may seem like a smart financial move, but before you make a decision, take a moment to reconsider. Here are a few reasons why opening a savings plan might not be the best choice for you:
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>1|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Limited flexibility</h3>  
                    </div>
                    <p>
                        Savings plans often come with restrictions on when and how you can access your funds. If you anticipate needing quick access to your money, a savings plan may not be the right fit.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>2|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Low returns</h3>
                    </div>
                    <p>
                        While savings plans offer a safe and secure way to save money, they typically provide lower returns compared to other investment options. If you're looking to grow your wealth over time, you may want to explore alternative investment strategies.
                    </p>
                    <div className="item">
                        <h3 style={{ display: "inline-block", color: "rgb(223, 221, 53)" }}>3|  </h3> <h3 color='rgba(223, 221, 53, 0.5)' style={{ display: "inline-block" }}>Inflation risk</h3>
                    </div>
                    <p>
                        Inflation can erode the purchasing power of your savings over time. If the interest rate on your savings plan is lower than the inflation rate, you could actually be losing money in real terms.
                    </p>
                    <p>
                        Before committing to a savings plan, it's important to evaluate your financial goals and consider other options that may better align with your needs. Remember, everyone's financial situation is unique, so what works for one person may not work for another.
                    </p>
                    <p>
                        Think twice before opening a savings plan and explore all your options. Your financial future may thank you.
                    </p>
                    <Button onClick={prevArticle} style={{ backgroundColor: "rgba(223, 221, 53, 0.5)", color: "#002060", marginTop: "2%", marginBottom: "2%" }}>Previous Article</Button>

                    </>:null}
                    


                </div>
            </div>




            <Footer />
        </div >
    );
}

export default Articles;

