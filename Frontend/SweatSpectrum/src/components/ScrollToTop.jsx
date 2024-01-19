//This file provides functionality to routes in the App.jsx file. It will automatically scroll to the top of the page when a route is clicked.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  }
  
  export default ScrollToTop;