import { useEffect, useRef, useState } from 'react'
import AuthenticatedHeader from './userinterface/components/universalComponents/AuthenticatedHeader'
import FooterComponent from './userinterface/components/LandingPageComponents/FooterComponent';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import CasinoSideBar from './userinterface/components/CasinoComponents/CasinoSideBar';
import GroupScreenBanner from './userinterface/components/universalComponents/GroupScreenBanner';
import ScrollToTop from './userinterface/components/universalComponents/ScrollToTop';
import { useAuth } from './context/authContext';
import LandingPageHeaderComponent from './userinterface/components/LandingPageComponents/UnAuthorizedHeader';
import UnAuthorizedHeader from './userinterface/components/LandingPageComponents/UnAuthorizedHeader';
import SideMenuComponent from './userinterface/components/LandingPageComponents/SideMenuComponent';
import LoadingAnimation from './userinterface/components/universalComponents/LoadingAnimation';
// import triple7 from "./assets/images/triple7.png"



export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
     const { isLoggedIn } = useAuth();

     console.log("isLoggedIn",isLoggedIn);
   
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1030px)');

        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            if (event.matches) {
                setIsSidebarOpen(false);
            }
        };

        mediaQuery.addEventListener('change', handleMediaQueryChange);

        // Check the initial screen size
        if (mediaQuery.matches) {
            setIsSidebarOpen(false);
        }

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);
    
    
 
   

    // const toggleOption:toggleOptionProp[] = [
    //   { title: "My Bets", key: 'my-bets' },
    //   { title: "All Bets", key: 'all-bets'},
    //   { title: "High Rollers", key: 'high-rollers'},
    //   { title: "Race Leaderboard", key: 'race-leaderboard' },
    // ];
    // interface toggleOptionProp {
    //   title:string;
    //   key:string;
    // }
    // const height = document.documentElement.clientHeight
    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    const [openRegisterDialog, setOpenRegisterDialog] = useState<boolean>(false)

      // to manage register dialog
    //  const handleClickRagisterButton = () => {
    //     setOpenRegisterDialog(!openRegisterDialog)
    //   }
// const [loading, setLoading] = useState(true)
// useEffect(() => {
//   setTimeout(() => {
//     setLoading(false)
//   }, 2000);
// })
    return (
        <>


        <div className="flex bg-[#1a2c38]">
  
        <div   className={` h-screen  max-lg:fixed z-50 w-20`}>
          {isLoggedIn? 
           <CasinoSideBar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />  : 
           <SideMenuComponent toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />}
           
            </div>
          
          <div className=" top-0  h-[72px] fixed w-full  z-30 right-0">
          {isLoggedIn ?  
            <AuthenticatedHeader messagesCount={0} notificationsCount={0} username='dss' isOpen={isSidebarOpen} />
            :
            <UnAuthorizedHeader isOpen={isSidebarOpen} />  
            }
          </div>

      
    
    {/* <div className='flex justify-center items-center h-screen w-screen '> 
    <LoadingAnimation/>
    </div>: */}
    <div ref={scrollableContainerRef} className={`overflow-y-scroll h-screen scrollbar-thin scrollbar-thumb-[#1d3947] scrollbar-track-[#192e38] mt-[60px] flex-grow ${isSidebarOpen ? 'lg:ml-[200px]' : 'max-lg:ml-[80px]'} max-md:ml-0 overflow-y-auto select-none`}>
    {/* Main content here */}
    <ScrollToTop containerRef={scrollableContainerRef}>

      <Outlet />
    </ScrollToTop>
    <FooterComponent />
  </div>
    
          
        </div>
      </>
      );
}
