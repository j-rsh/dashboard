import {Frame, Navigation ,TopBar} from '@shopify/polaris';
import {HomeMinor,} from '@shopify/polaris-icons';
import React , {useCallback , useState} from 'react';
import {useQuery} from '@apollo/client';
import {GET_EMAIL} from '../graphql/query';
import { SHOWTOKENS_QUERY } from "../graphql/query";
import Root from '../Root/Root';
import Home from './Home/Home';
import { Routes, Route} from "react-router-dom";
function Dashboard() {

  // const { loading, data } = useQuery(SHOWTOKENS_QUERY);
  const { data} = useQuery(GET_EMAIL);
  console.log(data)


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
            url: '/path/to/place',
            label: 'jobs',
            badge: '15',
          },
        ]}
      />
    </Navigation>

  )
  

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{content: 'Back to Shopify'}],
        },
        {
          items: [{content: 'Community forums'}],
        },
      ]}
      // name={data.users.email[0]}
      detail="Jaded Pixel"
      initials="D"
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
        {/* 
        <Route path="/jobs/*" element={<Jobs />}></Route> */}
      </Routes>      
    </Frame>
  );
}
export default Dashboard