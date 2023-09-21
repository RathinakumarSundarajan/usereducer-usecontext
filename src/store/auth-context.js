import React, {useState, useEffect} from 'react';
// ---file and file name is NOT in Camel Case becz its not going to save and Render as Componant--

const AuthContext = React.createContext({   //----Can use any name instead of AuthContext---------------//
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect (()=>{
        const storedUserLoggedIninformation = localStorage.getItem('isLoggedIn');
        if(storedUserLoggedIninformation === '1') {
          setIsLoggedIn(true)
        }
      },[])

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1')
        setIsLoggedIn(true)
    }

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false);
    }


    return <AuthContext.Provider 
           value ={{
            isLoggedIn: isLoggedIn, 
            onLogout: logoutHandler, 
            onLogin: loginHandler
            }}
            >
            {props.children}
           </AuthContext.Provider>
}

export default AuthContext;

