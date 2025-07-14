import React, { createContext, useContext, useState } from "react";

// Create the context
const DialogContext = createContext<any>(null);

interface props{
    children:React.ReactNode
}
// Dialog context provider
export const DialogProvider: React.FC<props> = ({ children }) => {
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const [isSigninDialogOpen, setIsSigninDialogOpen] = useState(false);

  // Function to open the dialog
  const openSignupDialog = () => setIsSignupDialogOpen(true);
  const openSigninDialog = () => setIsSigninDialogOpen(true);

  // Function to close the dialog
  const closeSignupDialog = () => setIsSignupDialogOpen(false);
  const closeSigninDialog = () => setIsSigninDialogOpen(false);

  return (
    <DialogContext.Provider value={{ isSignupDialogOpen, openSignupDialog, closeSignupDialog ,isSigninDialogOpen, openSigninDialog, closeSigninDialog}}>
      {children}
    </DialogContext.Provider>
  );
};

// Custom hook to use the dialog context
export const useDialog = () => {
  return useContext(DialogContext);
};
