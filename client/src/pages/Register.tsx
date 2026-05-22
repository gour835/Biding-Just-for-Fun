import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterProp {
    name: string,
    email: string,
    password: string
}


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    async function SubmitDetails({ email, password, name }: RegisterProp) {
        const credentials = {
            email, password, name
        }
        const server = await axios.post('http://localhost:8080/api/auth/register', credentials, {
            withCredentials: true
        });
        console.log(server);
        if (server.status == 200) {
            console.log('sccs');
           navigate('/', {replace: true});
        }

    }
    return (
        <>
            <section id="center">
                <div>
                    <h1>Register</h1>
                    <div className="p-1 m-1">

                        <input className="border-2 border-amber-200 rounded-lg py-2 px-3 w-xl" type="text" required name="name" placeholder="Please enter your full name"
                            onChange={(e) => {

                                setName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="p-1 m-1">

                        <input className="border-2 border-amber-200 rounded-lg py-2 px-3 w-xl" type="text" required name="email" placeholder="Please enter your email address"
                            onChange={(e) => {

                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className="p-1 m-1">
                        <input className="border-2 border-amber-200 rounded-lg py-2 px-3 w-xl" type="text" required name="password" placeholder="Please enter your password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    <div className="p-1 m-1">
                        <button className="border-2 border-amber-200 bg-red-500 text-amber-200 rounded-lg py-2 px-3" type="button"
                            onClick={() => {
                                SubmitDetails({ email: email || '', password: password || '', name: name || '' });
                            }}
                        >Submit</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register