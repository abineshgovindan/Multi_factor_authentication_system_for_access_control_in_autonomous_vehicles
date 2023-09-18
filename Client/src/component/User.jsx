import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { Form, useActionData, useNavigate } from "react-router-dom";
import Car from "./Car";



const User = (props) => {
  
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const accessToken = useAuthStore((state) => state.accessToken);
  const userId = useAuthStore((state) => state.userId);
  const logout = useAuthStore((state) => state.logout);

  const [CarFormFun, setCarFormFun] = useState(true);

  const [carName, setcarName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const ownerId = props.id;
  console.log(ownerId + " owner id");
  
  console.log(Car)

  const handleToggle = () => {
    setCarFormFun((current) => !current);
  };

  const config = {
    headers: {
            Authorization: `Bearer ${accessToken}`,
          }
  }

  const bodyParameters = {
  
      carName,
      licenseNumber,
      ownerId, 
  };
  async function registerUser(event) {
    event.preventDefault();
    if (isLoggedIn){
      const data = await axios.post("http://localhost:3000/api/v1/postCar",
      bodyParameters,
      config
      );
    console.log(data)

    }


  }



  
return(
  <>
     
      {isLoggedIn ? (
        <>
          <div className="">
            <h2 className=" flex text-2xl justify-center items-center">Hello {props.name}</h2>

            <div className="flex-1 mt-5 justify-center items-center">
              <h3 className="text-xl text-cyan-400">Add Cars</h3>
              
                <form onSubmit={registerUser} >
                  <input type="text" 
                  value={carName} 
                  onChange={(e)=> setcarName(e.target.value)}
                  required
                  placeholder="Car Name" 
                  className="input input-bordered input-info mt-3 w-full max-w-xs" />
                  <br />
                  <input type="text" 
                  value={licenseNumber}
                  onChange={(e)=> setLicenseNumber(e.target.value)}
                  required
                  placeholder="License Number" 
                  className="input input-bordered input-info mt-3 w-full max-w-xs" />
                  <br />
                  
                  <button type="submit" className=" justify-center btn btn-outline btn-info btn w-32 mt-3 rounded-full">
                    Add Car
                  </button>
                 </form>
            </div>
            <br/>
            <div className="outline outline-offset-2 outline-blue-500 ">
              {props.Car?.map((items)=>(
               <Car key={items.id} 
               number={props.mobileNumber} 
               carId = {items.id}
                carName={items.carName}
                licenseNumber ={items.licenseNumber}
                  />
             
              ))}
            </div>
        

        
       
          </div>
         </>
        
      ) : (
        <>You are not logged in</>
      )}
    </>
)
 
}

export default User