import {TopBar, ActionList, Icon, Frame, Text} from '@shopify/polaris';
import {ArrowLeftMinor, QuestionMarkMajor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

function TopBarExample() {
  
  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{content: 'Back to Shopify', icon: ArrowLeftMinor}],
        },
        {
          items: [{content: 'Community forums'}],
        },
      ]}
      name="Dharma"
      detail="Jaded Pixel"
      initials="D"
    />
  );


  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
    />
  );

  return (
    <div style={{height: '250px'}}>
      <Frame topBar={topBarMarkup}/>
    </div>
  );
}
export default TopBarExample