import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, username, password, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website_logo"
        />
        <form className="form_container" onSubmit={this.onSubmitForm}>
          <label htmlFor="username" className="label_item">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="input_element"
            placeholder="Username"
            onChange={this.onChangeUsername}
            value={username}
          />
          <label htmlFor="password" className="label_item">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="input_element"
            placeholder="Password"
            onChange={this.onChangePassword}
            value={password}
          />
          <button type="submit" className="login_button">
            Login
          </button>
          {showSubmitError && <p className="error">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginRoute
