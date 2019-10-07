import React, { useState, useEffect } from 'react';
import ky from 'ky';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Input, Select, Button, Icon, Image, Statistic } from 'semantic-ui-react'
import {AuthenticatedRoute } from 'react-router-util';
import FormExampleForm  from './Login.js';
import './App.css';



async function getToken(username, password, keepLogged, history) {
  console.log('fetching')
  const dataa = await ky.post('https://citizensbank.openbankproject.com/my/logins/direct', { headers: {
    "Authorization": `DirectLogin username=${username}, password=${password}, consumer_key=uydqlzzcpri0ccuwqolx5w4fyhj55yzttngwjmjg`
  }}).json()
  return dataa
}

function GetLoan(props) {
  const reasons = [
    { key: 'af', value: 'af', text: 'New car' },
    { key: 'as', value: 'as', text: 'Birthday party' },
    { key: 'ad', value: 'ad', text: 'Investing' },
    { key: 'bj', value: 'bj', text: 'Other' },
  ]
  const [amount, setAmount] = useState('200')
  const [reason, setReason] = useState('')
  const [fb, setFb] = useState('')
  const [inst, setInst] = useState('')
  const [tw, setTw] = useState('')
  const [linkedin, setLinkedin] = useState('')

  // ef6a735f-f7d4-44a5-b6ab-f1c04f1fa627 customer
  // 6cdfb348-b4ca-4bbb-9395-18284f3b7c2e user(me)
  return (
   <div className="get-loan">
      <Input
      label={`Amount of loan: $${amount} `}
      className="range"
      min={100}
      max={20000}
      name='amount'
      onChange={(e) => setAmount(e.target.value)}
      step={100}
      type='range'
      value={amount}
    />
    <h2>Please provide your loan reason</h2>
    <Select placeholder='Select your reason' options={reasons} onChange={(e) => {
      setReason(e.target.innerText)
    }}/>
    <h2>Please provide us your social media profiles so we can evaluate you faster.</h2>
    <Input
      label={{
        color: 'teal',
        labelPosition: 'left',
        icon: 'facebook',
        content: 'Facebook',
      }}
      value={fb}
      onChange={(e) => setFb(e.target.value)}
      size="mini"
      className="social"
      placeholder='url.com'
    />
    <Input
      className="social"
      size="mini"
      value={inst}
      onChange={(e) => setInst(e.target.value)}
      label={{
        color: 'teal',
        labelPosition: 'left',
        icon: 'instagram',
        content: 'Instagram',
      }}
      placeholder='url.com'
    />
    <Input
      size="mini"
      value={linkedin}
      onChange={(e) => setLinkedin(e.target.value)}
      className="social"
      label={{
        color: 'teal',
        labelPosition: 'left',
        icon: 'linkedin',
        content: 'Linkedin',
      }}
      placeholder='url.com'
    />
    <Input
      size="mini"
      className="social"
      value={tw}
      onChange={(e) => setTw(e.target.value)}
      label={{
        color: 'teal',
        labelPosition: 'left',
        icon: 'twitter',
        content: 'Twitter',
      }}
      placeholder='url.com'
    />
    <Button color='green' onClick={async () => {
      console.log('fb', fb)
      console.log('inst', inst)
      console.log('tw', tw)
      console.log('linkedin', linkedin)
      console.log('reason', reason)
      console.log('amount', amount)
      const dataa2 = await ky.post('https://citizensbank.openbankproject.com/obp/v4.0.0/banks/citizens/account-applications', {
  json : {  "product_code":JSON.stringify([fb, inst, tw, linkedin, reason, amount]),  "user_id":"6cdfb348-b4ca-4bbb-9395-18284f3b7c2e",  "customer_id":"ef6a735f-f7d4-44a5-b6ab-f1c04f1fa627"},
  headers: {
    "Authorization": `DirectLogin token=${props.token}`
  }}).json()
    console.log('dataa2', dataa2)
    }}><Link to="/result">Apply for loan</Link></Button>

      <Statistic.Group widths='four'>
        <Statistic>
          <Statistic.Value>1</Statistic.Value>
          <Statistic.Label>Loans taken</Statistic.Label>
        </Statistic>

        <Statistic>
          <Statistic.Value text>
            Three
            <br />
          </Statistic.Value>
          <Statistic.Label>Social linked</Statistic.Label>
        </Statistic>

        <Statistic>
          <Statistic.Value>
            <Icon name='smile' />
          </Statistic.Value>
          <Statistic.Label>Overall stats</Statistic.Label>
        </Statistic>
      </Statistic.Group>
   </div>
  )
}

function Result() {
  return (
    <div className="yes">
      <h1>Approved</h1>
      <Icon name='check' size="huge" />
    </div>
  )
}

function App(props) {
  const [state, setState] = useState({auth : ''});

  return (
        <div id='main'>
          <img src='./logoooo.png' width="50" />

        <Switch>
        <AuthenticatedRoute
            path="/result"
            exact
            isAuthenticated={Boolean(state.auth)}
            component={() => {
              return (
                <Result />
              )
            }}
          />
          <AuthenticatedRoute
            path="/ask-for-loan"
            exact
            isAuthenticated={Boolean(state.auth)}
            component={() => {
              return (
                <GetLoan token={state.auth}/>
              )
            }}
          />
          <Route path="/">
            <div className="App">
              {state.auth ? (<Redirect to="/ask-for-loan" />) : (
                <header className="App-header">
                  <FormExampleForm  getToken={getToken} setState={setState}/>
                </header>
              ) }
            </div>
          </Route>

        </Switch>
        </div>
  );
}
const Appp = withRouter(App);
export default () => {
  return <Router>
    <Appp />
  </Router>
}
