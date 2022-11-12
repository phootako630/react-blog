import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage =() => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPwd, setConfirmPwd] = useState('')
    const[error, setError] = useState('');

    const navigate = useNavigate();
    const createAccount = async () => {
        try {
            if(password !== confirmPwd) {
                setError('Password is not matched');
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/article')
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
            <h1>Create Account</h1>
            {error && <p className="error">{error}</p> }
            <input placeholder="Your email address"
                   value={email}
                   onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Re-enteryour password"
                value={confirmPwd}
                onChange={e => setConfirmPwd(e.target.value)}
            />
            <button onClick={createAccount}>Create Account</button>
            <Link to="/login">Already have an account, log in here</Link>
        </>

    )
};

export default  CreateAccountPage;