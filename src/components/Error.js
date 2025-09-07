import { useRouteError } from 'react-router-dom';

const Error = () => {
    const err = useRouteError();
    console.log(err);
    return (
        <div className="error">
            <h1> ERROR </h1>
            <h2>Oops You got to a place where you shouldnt be</h2>
            <h3>STATUS: {err.status}</h3>
        </div>
    )
}

export default Error;