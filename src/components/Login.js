import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'
import PropTypes from 'prop-types';

// try log in to see if credentials match and return a token
async function loginUser(credentials) {
 return fetch('http://127.0.0.1:5000/api/user', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export function Login({ setToken }) {
  const [emp_id, setEmpID] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  // set token after check credentials
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      emp_id,
      password
    });
    setToken(token);
  }

  const onSubmit = () => {
    navigate("/");
  }

  return (
    <div className="login">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Employee ID</p>
          <input type="text" onChange={e => setEmpID(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit" onClick={onSubmit}>Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
