
import { createContext, useContext, useState ,useEffect} from "react";


export const ValidatorContext = createContext(undefined);

export const ValidatorProvider = ({ children }) => {
  
  

    const validateForm = ({form}) => { 
        // console.log(form)
        let errors = {}; 
        if (form.type==='Card')
        {
            if (!form.name) { 
                errors.name = 'Name is required'; 
            }  
            if (!form.expiryDate) { 
                errors.expiryDate = 'Date is required'; 
            }
            if (!form.cvv) { 
                errors.cvv = 'CVV is required'; 
            }
            if (!form.number) { 
                errors.phone = 'Card number is required'; 
            }  
            if (form.number && form.number.length<16) { 
                errors.phone = 'Card number is invalid'; 
            }  
          
          
          
            // Set the errors and update form validity 

        }
        if (form.type==='Update')
        {
            if (!form.name) { 
                errors.name = 'Name is required'; 
            }  
            if (!form.phone) { 
                errors.phone = 'Phone is required'; 
            }  
            if (form.email !==form.currentEmail) { 
                errors.currentEmail = "You can't change your account email"; 
            }  
          
            // Set the errors and update form validity 

        }
       if (form.type==='Register')
        {
            if (!form.name) { 
                errors.name = 'Name is required'; 
            }  
            if (!form.phone) { 
                errors.phone = 'Phone is required'; 
            }  
            if (!form.password) { 
                errors.password = 'Password is required.'; 
            }  
           else if (form.password.length < 6 || !/[~`!#$%^&*+=-[\\\';,{}|\":<>?]/.test(form.password) || !/[A-Z]/.test(form.password)) { 
                errors.password = 'Password must be at least 6 characters, have a capital letter and have a special character'; 
            } 
           

            else if(form.password !==form.confirmPassword){
                errors.confirmPassword="Passwords don't match"
            }
            // Set the errors and update form validity 

        }
        else if( form.type==='Login'){
            if (!form.password) { 
                errors.password = 'Password is required.'; 
            }  
        }
        else if(form.type==='Password'){
            if (!form.currentPassword)  {
                errors.currentPassword = 'Current password is required.'; 
            }
            if (!form.password) { 
                errors.password = 'Password is required.'; 
            }  
           else if (form.password.length < 6 || !/[~`!#$%^&*+=-[\\\';,{}|\":<>?]/.test(form.password) || !/[A-Z]/.test(form.password)) { 
                errors.password = 'Password must be at least 6 characters, have a capital letter and have a special character'; 
            } 
           

            else if(form.password !==form.confirmPassword){
                errors.confirmPassword="Passwords don't match"
            }

        }

        if (!form.email) { 
            errors.email = 'Email is required.'; 
        } else if (!/\S+@\S+\.\S+/.test(form.email)) { 
            errors.email = 'Email is invalid.'; 
        } 
  
       
       
        return{errors:errors,valid:(Object.keys(errors).length === 0)}
    }; 
  
  
 

    return (
        <ValidatorContext.Provider
          value={ {validateForm}}>
          {children}
        </ValidatorContext.Provider>
      );
    
   
}
export const useValidator=() => useContext(ValidatorContext)
