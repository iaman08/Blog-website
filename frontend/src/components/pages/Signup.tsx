// url : http://localhost:3000/signup
import {useState } from "react";
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/lib/axios-instance';

interface SignupResponse{
    token:string;
    message: string;
    user:{
        id: number;
        email: string;
        name: string;
    };
}

export function Signup(){

    const navigate = useNavigate();
    
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [isLoading, setIsLoading ] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleClick(){
        setIsLoading(true);
        setErrorMessage("");

        try{
            const response = await apiClient.post<SignupResponse>("/auth/signup",{email,password,name});
        
        localStorage.setItem("token", response.data.token);
        navigate("/login");
        }catch{
            setErrorMessage("Signup Failed")
        } finally{
            setIsLoading(false);
        }
    }


    return(
        <div style={{backgroundColor:"#ffffff", height:"400px", width:"500px", marginLeft:"30%", marginTop:"15%",borderWidth:"2px" }}>
        <div style={{}}> 
            <h2 style={{display:"flex", justifyContent:"center" , fontWeight:"600", marginTop:"15%" }}>Signup</h2>
            <input type="email" placeholder="Enter your email" onChange={event => setEmail(event.target.value)} style={{height:"50px", width:"400px" , border:"solid black 2px", marginBottom:"20px",marginLeft:"10%"}}></input>
            <input type="password" placeholder="Enter your password" onChange={event => setPassword(event.target.value)} style={{height:"50px", width:"400px" , border:"solid black 2px", marginBottom:"20px",marginLeft:"10%"}}></input> <br></br>
            <button type="submit" onClick={handleClick} disabled={isLoading} style={{height:"50px", width:"70px" , border:"solid green 2px", marginBottom:"20px",marginLeft:"40%"}}  >Submit</button>
          </div>
        </div>
    )
}