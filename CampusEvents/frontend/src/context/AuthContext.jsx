import { createContext,useContext , useState,   useEffect } from "react";

import axios from "axios";
const Authcontext=createContext();


export function AuthProvider({children}){
    const [isLogin, setIsLogin] = useState(null);
    const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);
        useEffect(() => {     //  check user is login or not    provide user data and login status
          const accessToken= localStorage.getItem("accessToken");
      if (!accessToken) {
      setLoading(false);
      setIsLogin(false);
      return;
    }            async function fetchUser() {
              try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                  headers: { Authorization: `Bearer ${accessToken}` },
                });
    
                if (response.status === 200) {
                  setIsLogin(true);
                  setUser(response.data.user); // Save { username, email } to state
                }
                else {
                  setIsLogin(false);
      
                }
              } catch (error) {
                console.error("Session invalid or expired");
                localStorage.removeItem("accessToken");
                setUser(null);
                setIsLogin(false);
              }
              finally{
                setLoading(false);
              }
            }
            fetchUser();
         
        }, []);
     console.log("context","isLogin",isLogin,"user",user);
    return (<Authcontext.Provider value={{isLogin, setIsLogin, user, setUser ,loading}}>
        {children}
        </Authcontext.Provider>);
}


export function useAuth() {
  return useContext(Authcontext);
}