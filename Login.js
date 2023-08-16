import { useEffect, useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './styles.css'

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setmessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [emailerror, setEmailError] = useState(false);
    const [passworderror, setPasswordError] = useState(false);
    const [receivedCredentials, setReceivedCredentials] = useState();

    const history = useHistory();

    useEffect(() => {
        if (message !== "") {
            setTimeout(() => {
                setmessage("");
            }, 3000);
        }
    }, [message])

    const handleEmail = (args) => {
        setEmail(args.target.value);
    };

    const handlePassword = (args) => {
        setPassword(args.target.value);
    };

    const handleValidation = (event) => {
        let formIsValid = true;

        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            formIsValid = false;
            setEmailError(true);
            setSubmitted(false);
            return false;
        } else {
            setEmailError(false);
            setSubmitted(true)
            formIsValid = true;
        }

        if (!password.match(/^.{8,22}$/)) {
            formIsValid = false;
            setPasswordError(true);
            setSubmitted(false)
            return false;
        } else {
            setPasswordError(false);
            setSubmitted(true);
            formIsValid = true;
            history.push('/quotes');
        }

        return formIsValid;
    };

    const SignIn = () => {

        let validation = handleValidation();

        if (validation) {
            axios
                .get("http://127.0.0.1:6500/users")
                .then(function (response) {

                    setReceivedCredentials(response.data);
                    var password = receivedCredentials.map((cred) => { return cred.password });
                    var userId = receivedCredentials.map((cred) => { return cred.id });

                    if (response.isValid === true) {

                        sessionStorage.setItem("isloggedin", true);
                        sessionStorage.setItem("email", email);
                        setEmail(email);

                        history.push("./AllQuotes");

                    }
                    else {
                        setmessage("Invalid Credentials !");
                        sessionStorage.setItem('userid', userId);
                        setEmail("");
                        setPassword("");
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <form id="loginform" onSubmit={handleValidation}>
                            <div className="mb-3">
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder="Enter email"
                                        value={email}
                                        name='email'
                                        onChange={handleEmail}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className='form-control'
                                        placeholder="Enter Password"
                                        value={password}
                                        name='password'
                                        onChange={handlePassword}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="submission">
                                    <button type="submit" className="btn btn-primary" onClick={SignIn}> SignIn </button>

                                    <button type="submit" className="btn btn-primary" onClick={() => { history.push('/signup') }}>Signup</button>
                                    <div>
                                        {emailerror && (
                                            <div className="error">
                                                <h1>Please enter valid Email</h1>
                                            </div>
                                        )}

                                        {passworderror && (
                                            <div className="error">
                                                <h1>Please enter valid password</h1>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;