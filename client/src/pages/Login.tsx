import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps{
    setIsAuthenticated: (value: boolean)=> void
}
interface SubmitDetailsProps{
    email: string,
    password: string
}

function Login({ setIsAuthenticated }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    async function SubmitDetails({email, password}: SubmitDetailsProps) {
        try {
            const credentials = {
                email, password
            }
            const server = await axios.post('http://localhost:8080/api/auth/login', credentials, {
                withCredentials: true
            });
            if(server.status === 200){
                setIsAuthenticated(true);
                navigate('/', {replace: true});
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <section id="center">
                <div>
                    <h1>Login</h1>
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
                                console.log('first')
                                SubmitDetails({ email: email || '', password: password || '' });
                            }}
                        >Submit</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login