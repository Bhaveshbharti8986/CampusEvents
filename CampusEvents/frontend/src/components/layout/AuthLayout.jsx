import React from 'react'




function AuthLayout({ children }) {
  return (
    <div className="  flex items-center justify-center bg-opacity-50 z-100">
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
