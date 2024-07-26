import { Link } from "react-router-dom"
import LogoSVG from "../../assets/logo/LogoSVG"
import { useState } from "react"

export const AppFooter = () => {
    const [show, setShow] = useState(true)
    return (
        <div className="mt-10">
            {show ?
                <a href="#footer">
                    <div className="text-center p-5 hover:bg-base-300 hover:cursor-pointer" onClick={() => { setShow(!show) }}>
                        © 2024 Project-Pilot
                        {show ? <i className="fas fa-chevron-up ml-2"></i> : <i className="fas fa-chevron-down ml-2"></i>}
                    </div>
                </a>
                :
                <div>
                    <footer id="footer" className="footer text-base-content p-10 bg-base-300">
                        <aside>
                            <LogoSVG size={50} />
                            <p>
                                Project-Pilot
                                <br />
                                Your project, our platform
                            </p>
                        </aside>
                        <nav>
                        </nav>
                        <nav>
                        </nav>
                        <nav>
                            <h6 className="footer-title">Features</h6>
                            <a className="link link-hover group" target="_blank" href="https://github.com/pratikkabade/Project-Pilot/blob/main/README.md#getting-started">
                                Getting Started
                                <span className="opacity-0 group-hover:opacity-100">→</span>
                            </a>
                            <Link to={'/DataRefresh'}>
                                <a className="link link-hover">Data Refresh</a>
                            </Link>
                            <Link to={'/Login'}>
                                <a className="link link-hover">Accounts Page</a>
                            </Link>
                        </nav>
                        <nav>
                            <h6 className="footer-title">Company</h6>
                            <Link to={'/About'}>
                                <a className="link link-hover">About</a>
                            </Link>
                            <a className="link link-hover group" target="_blank" href="https://github.com/pratikkabade/Project-Pilot/">
                                GitHub
                                <span className="opacity-0 group-hover:opacity-100">→</span>
                            </a>
                            <a className="link link-hover group" target="_blank" href="https://github.com/pratikkabade/Project-Pilot/issues">
                                Issues
                                <span className="opacity-0 group-hover:opacity-100">→</span>
                            </a>
                            <a className="link link-hover group" target="_blank" href="https://github.com/pratikkabade/Project-Pilot/projects?query=is%3Aopen">
                                Roadmap
                                <span className="opacity-0 group-hover:opacity-100">→</span>
                            </a>
                        </nav>
                    </footer>
                    <a href="#footer">
                        <div className="text-center p-5 bg-base-300 hover:bg-base-200 hover:cursor-pointer" onClick={() => { setShow(!show) }}>
                            © 2024 Project-Pilot
                            {show ? <i className="fas fa-chevron-down ml-2"></i> : <i className="fas fa-chevron-down ml-2"></i>}
                        </div>
                    </a>
                </div>
            }
        </div>
    )
}