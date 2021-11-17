import React,{Fragment, useState} from 'react';


const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const {email, password, name} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body= {
                user_email: email,
                user_password: password,
                user_name: name
            }
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},

                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            if (!parseRes.token){ //!Para que no se autentifique si no se puede registrar
                alert("User already exists");    
            } else {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
            }

        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="Email" className="form-control my-3" value={email} onChange={e => onChange(e)}/>
                <input type="password" name="password" placeholder="Password" className="form-control my-3" value={password} onChange={e => onChange(e)}/>
                <input type="text" name="name" placeholder="Name" className="form-control my-3" value={name} onChange={e => onChange(e)}/>
                <button className="btn btn-success btn-block">Submit</button>
            </form>
        </Fragment>
    );
}

export default Register;