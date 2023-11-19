import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { ErrorMessage } from "../errorMessage/errorMessage";



const Page404 = () => {
    return (
        <div className="page404">
            <Helmet>
                <meta
                    name="description"
                    content='404 Error' />
                <title>Page not founded</title>
            </Helmet>
            <ErrorMessage />
            <p style={{ "textAlign": "center", "fontWeight": 'bolb', "fontSize": "24px", "marginTop": '30px' }} >Page doesn't exist</p>
            <Link
                style={{
                    "background": "rgb(88 186 61)", "padding": '20px', "textAlign": "center", "fontWeight": 'bolb', "fontSize": "24px", "marginTop": '30px',
                    "color": "#fff", "borderRadius": "10px"
                }}
                to='/'>Bac to main page</Link>
        </div>
    );
}

export default Page404;