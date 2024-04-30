import { Link } from "react-router-dom"
import LogoSVG from "../../assets/logo/LogoSVG"

export const AppFooter = () => {
    return (
        <footer className="footer bg-base-200 rounded-t-3xl border-t-2 border-slate-300 text-base-content mt-10 p-10">
            <aside>
                <LogoSVG size={50} />
                <p>
                    Project-Pilot
                    <br />
                    Your project, our platform
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <Link to={'/DataRefresh'}>
                    <a className="link link-hover">Data Refresh</a>
                </Link>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    )
}