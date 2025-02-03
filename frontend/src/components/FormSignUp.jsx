import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import googleLogo from '../assets/imgs/googlelogo.svg';

function FormSignUp() {
    const navigate = useNavigate(); // Initialize useNavigate
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tc, setTc] = useState(false); // For terms and conditions checkbox

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create the data object for the request
        const data = {
            name: fullName, 
            email,
            password,
            password2: confirmPassword, 
            tc: tc.toString() 
        };

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/user/register/", data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data) {
                const { token, msg } = response.data;
                console.log("Message:", msg);

                navigate("/login");
            }
        } catch (error) {
            console.error("Error during registration:", error.response?.data || error.message);
            alert("Registration failed, please check your details.");
        }
    };

    return (
        <div className="formcard px-10 py-10 rounded-3xl border-2 border-gray-200">
            <h1 className="text-4xl font-semibold">Welcome to Medicare</h1>
            <p className="font-medium text-lg text-gray-500 flex justify-center items-center mt-4">Please enter your details.</p>
            <div className="mt-6">
                <div>
                    <label className="text-lg font-medium">Full Name</label>
                    <input
                        className="w-full border-2 border-gray-400 rounded-xl p-3"
                        type="text"
                        placeholder="Enter Full Name"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />
                </div>
                <div>
                    <label className="text-lg font-medium">Email</label>
                    <input
                        className="w-full border-2 border-gray-400 rounded-xl p-3"
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label className="text-lg font-medium">Password</label>
                    <input
                        className="w-full border-2 border-gray-400 rounded-xl p-3"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <label className="text-lg font-medium">Confirm Password</label>
                    <input
                        className="w-full border-2 border-gray-400 rounded-xl p-3"
                        type="password"
                        placeholder="Re-enter Password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
                <div className="mt-8 flex justify-between items-center">
                    <div>
                        <input 
                            type="checkbox" 
                            id='terms' 
                            checked={tc} 
                            onChange={(e) => setTc(e.target.checked)} 
                        />
                        <label className="ml-2 font-medium text-base" htmlFor='terms'>I accept the terms and conditions</label>
                    </div>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button
                        type="submit"
                        className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-3xl bg-violet-500 text-white text-lg font-bold"
                        onClick={handleSubmit}
                    >
                        Create your Account
                    </button>
                    <button className="flex py-3 border-2 rounded-3xl active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all flex items-center justify-center gap-2">
                        <img size={24} src={googleLogo} alt="GLogo" />
                        Sign up with Google
                    </button>
                </div>
                <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">Already have an account?</p>
                    <button onClick={() => window.location.href = '/login'} className="text-blue-700 text-base font-medium ml-2">Sign In</button>
                </div>
            </div>
        </div>
    );
}

export default FormSignUp;
