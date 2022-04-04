import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { listOutline, mapOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ViewPlace from './pages/ViewPlace';

setupIonicReact({});

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/map">
            <Tab1 />
          </Route>
          <Route exact path="/list">
            <Tab2 />
          </Route>

          <Route exact path="/list/:id">
            <ViewPlace />
          </Route>
          <Route exact path="/">
            <Redirect to="/map" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/map">
            <IonIcon icon={ mapOutline } />
          </IonTabButton>
          <IonTabButton tab="tab2" href="/list">
            <IonIcon icon={ listOutline } />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
