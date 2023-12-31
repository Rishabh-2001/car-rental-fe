import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser } from '../redux/auth.slice'
import { Spin, message } from 'antd';

const Register = () => {
    const dispatch=useDispatch()
    const [registerType, setRegisterType] = useState("");
    const [isLoading,setIsLoading]=useState(false);
    const navigate=useNavigate()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cnf_password: "",
        userType:"CUSTOMER"
      });
    
      const handleChange = (e) => {
        // e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data:", formData);
        const payload={
          firstName:formData?.firstName,
          lastName: formData?.lastName,
          email: formData?.email,
          password: formData?.password,
          cnf_password:formData?.cnf_password,
          userType:formData?.userType,
          agencyData: formData?.userType==="ADMIN"?{
             agencyName:formData?.agencyName,
             agencyContact:formData?.agencyContact,
             agencyOwner: formData?.agencyOwner,
             agencyRegNo: formData?.agencyRegNo,
             agencyAddress: formData?.agencyAddress,
          }: null,
        }
        if (formData.password !== formData.cnf_password) {
          toast.error("Passwords doesn't match !");
        } else {
          setIsLoading(true);
          const res =  await dispatch(registerUser(payload));
          console.log("RES:", res);
          if (res.error) {
            toast.error(res.payload);
            setIsLoading(false);
          }
          else{
            toast.success("User added sucessfuly");
            setIsLoading(false);
          }
        }
      };
      function handleRegisterType(type) {
        setRegisterType(type);
        setFormData((prev) => ({
          ...prev,
          userType: type,
        }));
      }
    

  return (
    <div className="flex items-center justify-center py-8   ">
    <div className="flex md:flex-row flex-col  md:w-[60%] w-[90%]  mx-auto justify-between  ">
      <div className="flex-col md:w-[60%] w-[90%] rounded border-2 border-[#673AB7]  text-center py-4">
      <h2 className=" md:text-2xl text-xl font-bold mx-auto text-[#673AB7]">
            Create Your {registerType==="ADMIN"?"Agency" : ""} Account
          </h2>
      <div className="flex items-center gap-1 px-6">
            <button
              className={`${
                registerType === "ADMIN"
                  ? "bg-[#673AB7] text-white transition-colors duration-300"
                  : "border transition-colors duration-300"
              } flex-[1] rounded-md py-2 `}
              onClick={() => handleRegisterType("ADMIN")}
            >
              Agency
            </button>
            <button
              className={`${
                registerType === "CUSTOMER"
                  ? "bg-[#673AB7] text-white transition-colors duration-300"
                  : "border transition-colors duration-300"
              } flex-[1] rounded-md py-2`}
              onClick={() => handleRegisterType("CUSTOMER")}
            >
              Customer
            </button>
          </div>
          {registerType === "" ? (
            <p className="text-sm text-red-500 mt-2 font-medium float-left pl-6">
              Select Registration Type
            </p>
          ) : (
            ""
          )}
          <Spin spinning={isLoading}>
 
        <form onSubmit={handleSubmit}>
        
          <div className="flex-col  text-left mt-8">
          

            <div className="px-8 mb-6">
              <label htmlFor="firstName" className=" labels mb-2">
                Enter First Name
              </label>
              <br></br>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border w-full py-2 outline-none  p-2"
              />
            </div>
            <div className="px-8 mb-6">
              <label htmlFor="lastName" className=" labels mb-2">
                Enter Last Name
              </label>
              <br></br>
              <input
                type="text"
                id="lastName"
                onChange={handleChange}
                name="lastName"
                value={formData.lastName}
                className="border w-full py-2 outline-none  p-2"
              />
            </div>
            <div className="px-8 mb-6">
              <label htmlFor="email" className=" labels mb-2">
                Enter Email
              </label>
              <br></br>
              <input
                type="email"
                name="email"
                value={formData.email}
                id="email"
                onChange={handleChange}
                className="border w-full py-2 outline-none  p-2"
              />
            </div>
            <div className="px-8 mb-6">
              <label htmlFor="password" className="labels mb-2">
                Enter Password
              </label>
              <br></br>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="border w-full py-2 outline-none p-2"
              />
            </div>
            <div className="px-8 mb-6">
              <label htmlFor="cnf_password" className="labelsmb-2">
                Enter Confirm Password
              </label>
              <br></br>
              <input
                type="password"
                name="cnf_password"
                value={formData.cnf_password}
                id="cnf_password"
                onChange={handleChange}
                className="border w-full py-2 outline-none p-2"
              />
            </div>

          {registerType==="ADMIN" &&  <div>
            
               <h2 className='font-medium text-lg px-8 mb-4'>Your Agency Details:</h2>
               <div className="px-8 mb-6">
              <label htmlFor="firstName" className=" labels mb-2">
                Enter Agency Name
              </label>
              <br></br>
              <input
                type="text"
                name="agencyName"
                id="agencyName"
                value={formData.agencyName}
                onChange={handleChange}
                className="border w-full py-2 outline-none  p-2"
                required
              />
            </div>
            <div className="px-8 mb-6">
              <label htmlFor="firstName" className=" labels mb-2">
                Enter Agency Address
              </label>
              <br></br>
              <input
                type="text"
                name="agencyAddress"
                id="agencyAddress"
                value={formData.agencyAddress}
                onChange={handleChange}
                required
                className="border w-full py-2 outline-none  p-2"
              />
            </div>
            <div className="px-8 mb-6">
              <label htmlFor="firstName" className=" labels mb-2">
                Enter Agency Registreation Number
              </label>
              <br></br>
              <input
                type="text"
                name="agencyRegNo"
                id="agencyRegNo"
                required
                value={formData.agencyRegNo}
                onChange={handleChange}
                className="border w-full py-2 outline-none  p-2"
            
              />
            </div>
            <div className="px-8 mb-6">
              <label htmlFor="firstName" className=" labels mb-2">
                Enter Agency Owner Name
              </label>
              <br></br>
              <input
                type="text"
                required
                name="agencyOwner"
                id="agencyOwner"
                value={formData.agencyOwner}
                onChange={handleChange}
                className="border w-full py-2 outline-none  p-2"
          
              />
            </div>
            <div className="px-8 mb-6">
              <label htmlFor="firstName" className=" labels mb-2">
                Enter Agency Contact Number
              </label>
              <br></br>
              <input
                type="text"
                name="agencyContact"
                id="agencyContact"
                required
                value={formData.agencyContact}
                onChange={handleChange}
                className="border w-full py-2 outline-none  p-2"
            
                
              />
           
            </div>
            </div>}

            <div className="px-8 mb-6">
              <button className="text-white bg-[#673AB7] w-full py-2 mt-4  rounded-xl">
                Sign Up
              </button>
            </div>
          </div>
        </form>
                   
        </Spin>
      </div>
     
    </div>
  
  </div>
  )
}

export default Register