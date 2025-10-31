 export const checkValidData=(email,password)=>{
 
    const isEmailValid= /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid= /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(password)

if(!isEmailValid) return "Email is not valid"
if(!isPasswordValid) return "Password is not valid"

 }