import { useAuthStore } from "../stores/authStore";
import axios from "axios";
import { Form, useActionData, useNavigate } from "react-router-dom";
const Car = ({number, carId, carName, licenseNumber}) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
    const accessToken = useAuthStore((state) => state.accessToken);
    const navigate = useNavigate();
    

    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
        
    }
    const bodyParameters = {
  
      phoneNumber:number,
      
  };
    async function handleDelete(event) {
        event.preventDefault();
        
        if (isLoggedIn){
        axios.delete(`https://multi-factor-authentication-system-for.onrender.com/api/v1/car?id=${carId}`,
        config
        ).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error.response.data.message);
        })
    

        }
    }
   
    async function handleOpen(event){
        event.preventDefault();
        const data = await axios.post("https://multi-factor-authentication-system-for.onrender.com/api/v1/send-verification",
        bodyParameters,
        config
        );
        console.log(number)
        console.log(data);
        navigate("/verify");
        

    }



  return (
    <>
    <div className="card card-compact w-sm  bg--700 shadow-xl">
  <div className="card-body">
    <h2 className="card-title ">{carName}</h2>

    <div className="card-actions justify-end">
      <button
      onClick={handleOpen} 
       className=" justify-center btn btn-outline btn-info btn w-32 mt-3 rounded-full">
        Open Car
    </button>
    <button
    onClick={handleDelete}
     className=" justify-center btn btn-outline btn-error btn w-24 mt-3 ml-3 rounded-full">
        Delete
        </button>   
    </div>
  </div>
</div>
</>
    
   


  )
}

export default Car