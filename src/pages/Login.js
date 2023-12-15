import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

const Login = () => {
    const { dispatch } = useAuthContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async(e) =>{
        e.preventDefault()
        const payload = {email, password}
        const response = await fetch("http://localhost:3500/login", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json()
        if(response.ok){
            setEmail("")
            setPassword("") 
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'login', payload: json})
        }
    }
    return (
        <div>
        <form>
            <div className='login-section'>
                <div className='form-group mb-3'>
                    <p className='custom-label'>Email</p>
                    <input className='form-control custom-input'  type="email" onChange={e => setEmail(e.target.value)} value={email}/>
                </div>
                <div className='form-group mb-3'>
                    <p className='custom-label'>Password</p>
                    <input className='form-control custom-input'  type="password" onChange={e => setPassword(e.target.value)} value={password}/>
                </div>
                
                <button className="btn btn-lg custom-button" onClick={handleLogin}>Login</button>
            </div>
        </form>
        </div>
    )
}

export default Login;