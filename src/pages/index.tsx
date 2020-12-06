import firebase from '../utils/Firebase';
import { useState,FC } from "react";

const Home: FC = () => {
  const [message, setMessage] = useState("");

  const callSecureApi = async () => {
    try {
      const token = await firebase.auth().currentUser.getIdToken(true);
      const response = await fetch(
        `https://sample-82sgqpjx.de.gateway.dev/books`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();

      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <div className="container">
      <h1>External API</h1>
      <p>これらのボタンを使用して、外部 API を呼び出すことができます。</p>
      <p>保護された API 呼び出しは、その認可ヘッダーにアクセストークンを持っています。</p>
      <p>PI サーバは、Firebaseを使用してアクセストークンを検証します。</p>
      <div
        className="btn-group mt-5"
        role="group"
        aria-label="External API Requests Examples"
      >
        <button
          type="button"
          className="bg-indigo-700 font-semibold text-white py-2 px-4 rounded"
          onClick={callSecureApi}
        >
          Get Protected Message
        </button>
      </div>
      {message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <div className="container-fluid">
            <div className="row">
              <code className="col-12 text-light bg-dark p-4">{message}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home
