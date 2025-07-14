
import React, { createContext, useContext,  useEffect,  useMemo,  useState } from "react";
import api from "../utils/api/api";
import useApi from "../hooks/useApi";
import Cookies from "js-cookie";
import { SportsCategory, SportsCategoryResponse } from "../utils/types/sports";

// Create the context

interface SportsContextType {
  AllSportsData: SportsCategoryResponse | undefined;
  isLoadingSportsData: boolean;
  refetchAllSports: () => void;
}
export const SportsContext = createContext<SportsContextType | undefined>(undefined);


interface props {
  children: React.ReactNode;
}
// Dialog context provider
export const SportsProvider: React.FC<props> = ({ children }) => {

  const {useFetchData, useFetchWithoutBaseUrl} = useApi();
  const {data: AllSportsData , error, isPending:isLoadingSportsData, refetch:refetchAllSports} = useFetchData<SportsCategoryResponse|undefined>(`sports/get_sports`)



  const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      return JSON.parse(userInfo);
    }
  };

  
 const contextValue = useMemo(() => ({
  AllSportsData,
  isLoadingSportsData,
  refetchAllSports,
  }), [AllSportsData, isLoadingSportsData, refetchAllSports]);

  

  return (
    <SportsContext.Provider value={contextValue}>   
      {children}
    </SportsContext.Provider>
  );
 
};







export const useSportsData = () => {
  const context = useContext(SportsContext);
  if (!context) {
    throw new Error("useSportsData must be used within a SportsProvider");
  }
  return context;
};

