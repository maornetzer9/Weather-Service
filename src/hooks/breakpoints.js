export const useBreakpoint = () => {
    const [breakpoints, setBreakpoints] = useState({
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    });
  
    useEffect(() => {
      const mobileQuery = window.matchMedia('(max-width: 767px)');
      const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
      const desktopQuery = window.matchMedia('(min-width: 1025px)');
  
      const updateBreakpoints = () => {
        setBreakpoints({
          isMobile: mobileQuery.matches,
          isTablet: tabletQuery.matches,
          isDesktop: desktopQuery.matches,
        });
      };
  
      // Set initial values
      updateBreakpoints();
  
      // Add event listeners
      mobileQuery.addEventListener('change', updateBreakpoints);
      tabletQuery.addEventListener('change', updateBreakpoints);
      desktopQuery.addEventListener('change', updateBreakpoints);
  
      // Cleanup event listeners
      return () => {
        mobileQuery.removeEventListener('change', updateBreakpoints);
        tabletQuery.removeEventListener('change', updateBreakpoints);
        desktopQuery.removeEventListener('change', updateBreakpoints);
      };
    }, []);
  
    return breakpoints;
  };