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
  const nagivate = useNavigate();

  const [CarFormFun, setCarFormFun] = useState(true);

  const [carName, setcarName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [userCar, setUserCar] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState('');

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
      const data = await axios.post("https://multi-factor-authentication-system-for.onrender.com/api/v1/postCar",
      bodyParameters,
      config
      );
    console.log(data)
    setFetchTrigger('data')
    
    

    }


  }

  
// http://localhost:3000/api/v1/userCar


  useEffect(() => {
    if (isLoggedIn)
      axios
        .get(`https://multi-factor-authentication-system-for.onrender.com/api/v1/userCar?id=${userId}`,config)
        .then(({ data }) => {
          
          setUserCar(data);
          console.log(data);
          
        })
        .catch((error) => {
          if (error.response.data.message === "TokenExpiredError") {
            logout();
          }
        });
  }, [fetchTrigger]);


  
return(
  <>
     
      {isLoggedIn ? (
        <>
          <div className="container mx-auto">
            <h2 className=" flex text-2xl justify-center items-center">Hello {props?.name}</h2>

            <div className="mt-10 flex items-center justify-center w-screen">
              
              
                <form onSubmit={registerUser} >
                  <h3 className=" flex text-xl justify-center items-center text-cyan-400">Add Cars</h3>
                  <input type="text" 
                  value={carName} 
                  onChange={(e)=> setcarName(e.target.value)}
                  required
                  placeholder="Car Name" 
                  className="input input-bordered items-center input-info mt-3 w-full max-w-xs" />
                  <br />
                  <input type="text" 
                  value={licenseNumber}
                  onChange={(e)=> setLicenseNumber(e.target.value)}
                  required
                  placeholder="License Number" 
                  className="input input-bordered input-info mt-3 w-full max-w-xs" />
                  <br />
                  
                  <button type="submit" className="  justify-center items-center btn btn-outline btn-info  w-64 mt-3 rounded-full">
                    Add Car
                  </button>
                 </form>
            </div>
            <br/>
            <div className="outline outline-offset-2 outline-blue-500 ">
              {userCar?.map((items)=>(
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