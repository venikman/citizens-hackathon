import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'

const FormExampleForm = (props) => {
    const [pass, setPass] = useState('')
    const [username, setUsername] = useState('')
    return (
        <Form onSubmit={async ()=> {
            const token = await props.getToken(username, pass)
            props.setState({ auth : token.token})
          }}>
          <Form.Field>
            <label>Username</label>
            <input placeholder='Username' value={username} onChange={(e) => {
                setUsername(e.target.value)
            }}/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)}/>
          </Form.Field>
          <Button type='submit'>Login</Button>
        </Form>
      )
}

export default FormExampleForm
