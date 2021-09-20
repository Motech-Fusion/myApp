import logo from './logo.svg';
import './App.css';
import Amplify, { Auth, API } from "aws-amplify";
import awsconfig from "./aws-exports";
import { useEffect, useState } from 'react';
Amplify.configure(awsconfig);

function App() {
  const [hide, setHide] = useState(true);

  useEffect( async() =>{
    try {
        const user = await Auth.signIn("testaccount.s@motech.dev", "123456-Qwe");
        setHide(false);
    } catch (e) {
      alert("error: "+ e.message);
    }
  }, [])

  const testAPI = (event) => {
    event.preventDefault();
        const apiName = "TestAPI";
        const path = "/item/testingApi";
        const myInit = {
          body: {
            emails: ["applications@motech.dev"] /* REQUIRED an array of the emails you wish to send to */,
            subject: "The Subject" /* REQUIRED The email body for now we will use plain text */,
            body: "The Body \n The Body Also" /* REQUIRED The email body for now we will use plain text */,
            replyTo: ["support@motech.dev"] /* OPTIONAL The email body for now we will use plain text */,
          },
        };
        API.post(apiName, path, myInit)
          .then(async (response) => {
            console.log("success", response);
            alert("success: "+ response);
          })
          .catch((error) => {
            console.log("error", error);
          });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div hidden={hide}>
          <button onClick={(e)=>testAPI(e)}>Test API</button>
        </div>
       
      </header>
    </div>
  );
}

export default App;
