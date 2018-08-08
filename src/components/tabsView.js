import React from 'react';
import styled from 'styled-components';

import TabItem from './tabItem';

const Tabs = styled.div`
  justify-content: space-between;
  border-bottom: none;
`;

const TabsView = () => (
  <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
    <Tabs className="mdl-tabs__tab-bar">
      <a href="#device-info-panel" className="mdl-tabs__tab is-active">Device Info</a>
      <a href="#sensors-panel" className="mdl-tabs__tab">Sensors</a>
      <a href="#settings-panel" className="mdl-tabs__tab">Settings</a>
      <a href="#commands-panel" className="mdl-tabs__tab">Commands</a>
      <a href="#metadata-panel" className="mdl-tabs__tab">Metadata</a>
    </Tabs>

    <div className="mdl-tabs__panel is-active" id="device-info-panel">
      <TabItem category="Device Info"/>
    </div>
    <div className="mdl-tabs__panel" id="sensors-panel">
      <TabItem category="Sensors"/>
    </div>
    <div className="mdl-tabs__panel" id="settings-panel">
      <TabItem category="Settings"/>
    </div>
    <div className="mdl-tabs__panel" id="commands-panel">
      <TabItem category="Commands"/>
    </div>
    <div className="mdl-tabs__panel" id="metadata-panel">
      <TabItem category="Metadata"/>
    </div>
  </div>
);

export default TabsView;
