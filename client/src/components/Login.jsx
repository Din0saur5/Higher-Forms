import React from 'react'

function Login({setLogin}) {

//fn to add 
//login 
//forgot password 



  return (
    <div className='flex h-screen items-center justify-center'>
      <div className="card border rounded-xl p-4 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" className="input input-bordered" required />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
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
