import {useState} from 'react'
import { LogIn } from '../../api'
import { useUserContext } from "../components/UserContext";

function Login({setLogin}) {
const { userData, setUserData } = useUserContext();
const [loginValue, setLoginValue] = useState(
  {
    email: '',
    password: ''
  }
)

const handleChange = (e) => {
  setLoginValue({
    ...loginValue,
    [e.target.name]: e.target.value
  });
};



const login = async (e) =>{
  e.preventDefault()
  const response = LogIn(loginValue.email, loginValue.password)
  if(response.ok){
    setUserData(response.json())
    navigate('/home')  
  } else{
    throw new Error("HTTP error " + response.status)
  }
}
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className="card border rounded-xl p-4 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={(e) => login(e, loginValue)} className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input 
          type="email" 
          name="email" 
          placeholder="email" 
          className="input input-bordered" 
          required 
          value={loginValue.email} 
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input 
          type="password" 
          name="password" 
          placeholder="password" 
          className="input input-bordered" 
          required 
          value={loginValue.password} 
          onChange={handleChange}
        />
        <label className="label">
          <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
        </label>
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">Login</button>
      </div>
    </form>
        {/* Sign up link */}
        <p className="text-center mt-4">
          If you don't yet have an account,&nbsp;
          <span 
            className="underline text-green-600 hover:text-green-700 cursor-pointer"
            onClick={() => setLogin(false)}
          > Sign up</span>
        </p>
      </div>
    </div>
  )
}

export default Login
