import { useState } from 'react'
import axios  from '../api/axios';


const Register = () => {

  const [name, setUserName] = useState('');
   const [email, setUserEmail] = useState('');
   const [password, setUserPassword] = useState('');
    const [emailUsed, setUserEmailUsed] = useState(false);
   const [passVisibility, setPassVisibility]  = useState('password');
  const passWordVisibility = () =>{
    if(passVisibility ==='password' ){
        setPassVisibility('text');
    }else {
      setPassVisibility('password');
    }
  }


  async function registerUser(event) {
    event.preventDefault();
     const response = await fetch('http://localhost:3000/api/v1/auth/register',{
      method : 'POST',
      headers: {Authentication: 'Bearer {token}'},
        body: JSON.stringify({
          name,
          email,
          password,
      }),
      })
      const data = await response.json();
      console.log(data);

      if(data.status === 200) {
        console.log(data.status);
        window.location.href='/login'
        setUserEmailUsed(false);
        
      }else if(data.status === 205)
       {
        console.log(data.status);
        setUserEmailUsed(true);
      }
      
    
  }
  return (
    <>
     <div className="flex items-center">
      <h3>Register</h3>
      <form onSubmit={registerUser}>
        <input  value={name} 
        onChange={(e)=> setUserName(e.target.value)}
        
        type="text" placeholder="Name" />
        <br />
        <input 
        value={email}
        onChange={(e)=> setUserEmail(e.target.value)}
        type="email" placeholder="Email" />
        <br />
        <input
        value={password}
        onChange={(e)=> setUserPassword(e.target.value)}
        type={passVisibility} placeholder="Password" />
        <br />
        <input type="checkbox" onClick={passWordVisibility}/>
        <br />
        { emailUsed && <h4>This Email is already used</h4>}
        
        <input type="submit" value="Register" />
      </form>
     </div>
    </>
    
  )
}

export default Register