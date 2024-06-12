import React, { FC } from 'react'
import './App.css'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import Main from '../main/main'

const App: FC = () => {
  // const { pathRest } = useParams<{ pathRest: string }>()
  const pathRest = 'portfoilo'
  const history = useHistory()
  if (
    history.location.pathname !== '/portfoilo'
  ) {
    localStorage.setItem('initialRoute', history.location.pathname)
  }

  return (
    <div className='App'>
      <Switch>
        <Route path='/' exact={true}>
          <Redirect to={{ pathname: `/${pathRest}/home` }} />
        </Route>
        <Route path={`/${pathRest}/home`} exact={true}>
          <Main pathRest={pathRest} />
        </Route>
        <Route path={'/portfoilo'} exact>
          <Redirect to={`/${pathRest}/home`} />
        </Route>
        <Route path={'*'} exact>
          <Redirect to={`/${pathRest}/home`} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
