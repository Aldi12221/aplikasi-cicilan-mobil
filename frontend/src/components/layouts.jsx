import { Outlet, Link } from "react-router-dom";
import Navbar from './Header'
import Footer  from './footer'

const layout = ()=>{




    return(
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>

        </div>
    )
}
export default layout