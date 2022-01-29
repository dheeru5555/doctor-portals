import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import NotFound from '../Pages/Standalone/NotFoundDedicated';
import LoginDedicated from '../Pages/Standalone/LoginDedicated';
import Auth from './Auth';
import Application from './Application';
import ThemeWrapper from './ThemeWrapper';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const Wrapper = styled.div`
  height: 100%;
  .MuiButton-root {
    font-size: 12px;
    padding: 6px 9px;
  }
  .MuiTypography-body1 {
    font-size: 0.775rem !important;
  }
  .MuiListItemText-primary {
    text-transform: capitalize !important;
  }
  .MuiTypography-body2 {
    font-size: 0.675rem !important;
  }
  .MuiTypography-button {
    font-size: 0.675rem !important;
  }
  .MuiTab-root {
    font-size: 0.675rem !important;
  }
  .MuiTableCell-body {
    font-size: 12px;
  }
  button .MuiSvgIcon-root {
    font-size: 1rem;
  }
`;

function App() {
  return (
    <ThemeWrapper>
      <Wrapper>
        <Switch>
          <Route path="/" exact component={LoginDedicated} />
          <Route path="/app" component={Application} />
          <Route component={Auth} />
          <Route component={NotFound} />
        </Switch>
      </Wrapper>
    </ThemeWrapper>
  );
}

export default App;
