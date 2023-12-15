import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const { dispatch } = useAuthContext()
    const handleSignUp = async (e) => {
        e.preventDefault()
        const payload = {email, name, password}
        const response = await fetch('http://localhost:3500/signup', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json()
        if(response.ok){
            setEmail("")
            setName("")
            setPassword("")
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'login', payload: json})
        }
    }
    return (
        <div>
            <form>
            <div className="login-section">
                <div className="form-group mb-3">
                    <p className="custom-label">Email</p>
                    <input className="form-control custom-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group mb-3">
                    <p className="custom-label">Name</p>
                    <input className='form-control custom-input' type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="form-group mb-3">
                    <p className="custom-label">Password</p>
                    <input className="form-control custom-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                
                
                
                <button className="btn btn-lg custom-button" onClick={handleSignUp}>Sign Up</button>
            </div>
               
            </form>
        </div>
    )
}

export default SignUp