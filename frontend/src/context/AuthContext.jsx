import { useEffect } from "react";
import { createContext, useState,useContext } from "react";
import { API_BASE_URL } from "../../../server/configs/api";

const AuthContext=createContext()

function AuthProvider({children}){
    const [isLoggedIn,setIsLoggedIn]=useState(true)
    const [user,setUser]=useState(null)
    const [loading, setLoading] = useState(true);
    const [library, setLibrary] = useState([]);

    useEffect(()=>{
        async function fetchMe() {
            try {
                const res=await fetch(`${API_BASE_URL}/api/me`,{
                    credentials:"include",
                })

                if (res.ok){
                    const data=await res.json()
                    setUser(data.user)
                    setIsLoggedIn(true)
                }else{
                    setUser(null)
                    setIsLoggedIn(false)
                }
        
            } catch (error) {
                setUser(null);
                setIsLoggedIn(false);
            } finally{
                setLoading(false);
            }
        }
        fetchMe()
    },[])

    //fetch library when logged in
    useEffect(() => {
    async function fetchLibrary() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/library`, {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();
        setLibrary(Array.isArray(data.books) ? data.books : []);
      } catch {
        // ignore
      }
    }

    if (isLoggedIn) {
      fetchLibrary();
    } else {
      setLibrary([]);
    }
  }, [isLoggedIn]);


return (
    <AuthContext.Provider value={{user,setUser,isLoggedIn,setIsLoggedIn,loading,library,setLibrary}}>
        {!loading && children}
    </AuthContext.Provider>
)
}

export default AuthProvider
export function useAuth() {
  return useContext(AuthContext);
}