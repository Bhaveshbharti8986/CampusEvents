import React from 'react'

//it is created to wrap the auth componnts
function AuthLayout({ children }) {
  return (
    <div className="  mt-20 lg:mt-35 flex items-center justify-center bg-opacity-50 z-100">
      <div className="glass-panel-interactive 
                      min-w-[18rem] w-80 max-w-sm 
                      md:w-96 lg:w-[28rem] 
                     
                      ">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
