import { NavigationButton } from "../components/NavigationButton"

export const Lander = () => {
    return (
        <div className="font-sans cursor-default">
            <div className="flex flex-col justify-end items-center w-full h-screen">
                <div className="w-full text-center">
                    <h1 className="text-9xl max-lg:text-7xl max-sm:text-5xl font-extrabold animated-text1">
                        Navigate your Projects to Success
                    </h1>
                    <p className="py-6 text-3xl">
                        Pro tools created with
                        <span className="animated-text1 ml-2">Developers</span>,
                        <span className="animated-text1 mx-2">Teams</span>and
                        <span className="animated-text1 mx-2">Businesses</span>
                        in mind
                    </p>
                </div>
            </div>

            <div className="section2">
                <h1 className="text-7xl max-lg:text-5xl max-sm:text-3xl font-extrabold animated-text2">Minimize friction and increase productivity</h1>
                <p className="py-6 text-3xl">
                    <span className="animated-text2 mr-2">Empower</span>your team and
                    <span className="animated-text2 mx-2">Succeed</span>as a business
                </p>
                <div>
                    <NavigationButton />
                </div>
            </div>


            <div className="p-7">
                <div className="section3 rounded-3xl flex flex-row flex-wrap p-5">
                    <h1 className="text-white text-5xl max-md:text-4xl font-bold w-3/4">Project-Pilot provides an exceptional <span className="animated-text3">management experience</span></h1>
                    <div className="flex flex-row flex-wrap justify-between">
                        <div className="card">Project Managers</div>
                        <div className="card">Finance Managers</div>
                        <div className="card">Scrum Masters</div>
                        <div className="card">Employees</div>
                    </div>
                </div>
            </div>
        </div>
    )
}