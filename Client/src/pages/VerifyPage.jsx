import {  useState } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";

//http://localhost:3000/api/v1/verify-otp



export function VerifyPage(){
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
    const accessToken = useAuthStore((state) => state.accessToken);
    const [licenseNumber, setlicenseNumber] = useState('');
    const [OTPNumber, setOTPNumber] = useState('')
    const [TrueFun, setTrueFun] = useState(false)
    const [FalseFun, setFalseFun] = useState(false)
    
    
  
    
  const config = {
    headers: {
            Authorization: `Bearer ${accessToken}`,
          }
  }

  const bodyParameters = {
  
      licenseNumber,
      OTPNumber, 
  };
  async function verifyOTP(event) {
    event.preventDefault();
    if (isLoggedIn){
      const data = await axios.post("https://multi-factor-authentication-system-for.onrender.com/api/v1/verify-otp",
      bodyParameters,
      config
      );
      if(data.data.valid === true){
        setTrueFun(true);
        setFalseFun(false);
      }
      else if(data.data.valid === false){
        setFalseFun(true);
        setTrueFun(false);

      }
   
    //approved
    //data.data.valid

    }


  }
    return (
        <>
           {isLoggedIn ? (
                <>
                <div className=" flex items-center justify-center px-10 py-10">
                    
                    <form onSubmit={verifyOTP}>
                      <h2 className=" flex text-2xl justify-center mt-25 font-sans items-center">Verify</h2>
                        <input type="text" 
                        value={licenseNumber} 
                        onChange={(e)=> setlicenseNumber(e.target.value)}
                        placeholder=" License Number" 
                        className=" input justify-center items-center input-bordered mt-5 input-info w-full max-w-xs" />
                        <input type="text" 
                         value={OTPNumber} 
                        onChange={(e)=> setOTPNumber(e.target.value)}
                        placeholder="OTP Number" 
                        className="flex input input-bordered mt-5 input-info w-full max-w-xs" />
                        <div className="flex justify-center items-center">
                            <button type="submit" className=" btn btn-outline btn-info btn w-32 h-11 mt-5 rounded-full">
                            verify
                         </button>
                         
                      
                        </div>
                    </form>
                    </div>
                    
                    


                     <div className=" flex mt-6 justify-center">
                            {TrueFun && <div>
                            <h3 className="text-2xl text-green-300"> Your OTP Valid</h3>
                            </div>}
                         {FalseFun && <div>
                            <h3 className="text-2xl text-red-300"> Your OTP Invalid</h3>
                            </div>}

                         </div>
                    
                
                
                
                
                </>
        
                    ) : (
                <> <div className="flex justify-center items-center m-5 p-5">
          <h2 className=" text-lg text-red-500 text-center font-semibold ">You are not logged in</h2>
        </div></>
            )}
   
        </>
    )
}