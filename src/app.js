import React from 'react'
import { Provider } from 'react-redux'
import Page from './components/page'
import PlanPage from './components/plan-page'
import configureStore from './store'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <Page>
      <PlanPage />
    </Page>
  </Provider>
)

export default App
