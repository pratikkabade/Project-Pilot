import { NavigationButton } from "../components/NavigationButton"
import { Notice } from "../components/Notice"

export const Lander = () => {
    return (
        <div className="font-sans cursor-default">
            <div className="flex flex-col justify-end items-center w-full h-screen">
                <div className="w-full text-center">
                    <h1 className="text-9xl max-lg:text-7xl max-sm:text-5xl font-extrabold animated-text1">
                        Navigate your Projects to Success
                    </h1>
                    <p className="pt-6 text-3xl">
                        Pro tools created with
                        <span className="animated-text1 ml-2">Developers</span>,
                        <span className="animated-text1 mx-2">Teams</span>and
                        <span className="animated-text1 mx-2">Businesses</span>
                        in mind
                    </p>
                </div>
                <Notice />
            </div>

            <div className="p-7">
                <div className="section3 rounded-3xl flex flex-row flex-wrap p-5">
                    <h1 className="text-white text-5xl max-md:text-4xl font-bold w-3/4 max-sm:w-full pb-16 !pt-5 pl-5">Project-Pilot provides an exceptional <span className="animated-text3">management experience</span></h1>
                    <div className="flex flex-row flex-wrap justify-between">
                        <div className="card">
                            <h1>Project Managers</h1>
                            <p>Plan, execute, and close projects efficiently with our all-encompassing project management tools.</p>
                        </div>
                        <div className="card">
                            <h1>Finance Managers</h1>
                            <p>Gain insights into project finances and make informed decisions with our detailed financial management features.</p>
                        </div>
                        <div className="card">
                            <h1>Scrum Masters</h1>
                            <p>Implement Agile methodologies and manage sprints effectively to keep your team agile and responsive.</p>
                        </div>
                        <div className="card">
                            <h1>Employees</h1>
                            <p>Stay organized and productive with a clear view of tasks and deadlines, contributing to the success of every project.</p>
                        </div>
                    </div>
                </div>
            </div>



            <div className="mt-24">
                <div className="section4 flex flex-row flex-wrap p-5 !w-full">
                    <h1 className="text-5xl max-md:text-4xl font-bold w-3/4 max-sm:w-full pb-16 !mt-2 !pt-5 pl-5">Project-Pilot <span className="animated-text4">offers</span></h1>
                    <div className="flex flex-row flex-wrap justify-between">
                        <div className="card">
                            <h1>Comprehensive Task Management</h1>
                            <p>Keep track of all your tasks and deadlines in one place. Assign tasks, set priorities, and monitor progress to ensure nothing falls through the cracks.</p>
                        </div>
                        <div className="card">
                            <h1>Finance Management</h1>
                            <p>Stay on top of your budget with our robust financial tracking features. Manage expenses, track project costs, and generate financial reports with ease.</p>
                        </div>
                        <div className="card">
                            <h1>Employee Management</h1>
                            <p>Simplify the process of managing your team. Our application helps you keep track of employee roles, assignments, and performance, fostering a more organized and productive work environment.</p>
                        </div>
                        <div className="card">
                            <h1>Collaboration Tools</h1>
                            <p>Foster better communication and collaboration among your team members. Share updates, files, and feedback in real-time, ensuring everyone is on the same page.</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="section2 -mb-10">
                <h1 className="text-7xl max-lg:text-5xl max-sm:text-3xl font-extrabold animated-text2">Minimize friction and increase productivity</h1>
                <p className="py-6 text-3xl">
                    <span className="animated-text2 mr-2">Empower</span>your team and
                    <span className="animated-text2 mx-2">Succeed</span>as a business
                </p>
                <div>
                    <NavigationButton />
                </div>
            </div>
        </div>
    )
}