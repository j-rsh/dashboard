import {Frame, Navigation ,TopBar} from '@shopify/polaris';
import {HomeMinor} from '@shopify/polaris-icons';
import React , {useCallback , useState , useEffect} from 'react';
import {useQuery} from '@apollo/client';
import { SHOW_TOKENS } from "../../graphql/query";
import Root from '../Root/Root';
import Home from '../Home/Home';
import { Routes, Route , useNavigate} from "react-router-dom";
import Jobs from '../Jobs/Jobs'

export default function Dashboard() {
  const [userMenuActive, setUserMenuActive] = useState(false);
  const navigate = useNavigate();
  const { data, loading } = useQuery(SHOW_TOKENS);
  const user = localStorage.getItem("user");

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (!loading && !data.showtokens.status) {
      navigate("/login");
    }
  }, [data, navigate, loading]);


  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );

  const navigationMarkup =(
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: '/',
            label: 'Home',
            icon: HomeMinor,
          },
          {
            url: '/jobs',
            label: 'jobs',
          },
        ]}
      />
    </Navigation>
  )
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );
  
  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{content: "Logout", onAction: handleLogout}],
        }
      ]}
      detail={user}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );
  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}

    />
  );
  return (
    <Frame navigation={navigationMarkup} topBar={topBarMarkup} 
    showMobileNavigation={mobileNavigationActive}
    onNavigationDismiss={toggleMobileNavigationActive}
    >
      <Routes>
        <Route path="/" element={<Root />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/jobs/*" element={<Jobs />}></Route>
      </Routes>      
    </Frame>
  );
}
