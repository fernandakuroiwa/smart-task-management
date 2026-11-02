
import { useEffect, useState } from "react";

interface HealthResponse {
  status: string;
  message: string;
}

function App() {
  const [apiStatus, setApiStatus] = useState("Checking...");
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/health")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed");
        }

        return response.json();
      })
      .then((data: HealthResponse) => {
        setApiStatus(data.status);
        setApiMessage(data.message);
      })
      .catch(() => {
        setApiStatus("error");
        setApiMessage("Could not connect to backend");
      });
  }, []);

  return (
    <main>
      <h1>Smart Task Management</h1>
      <h2>System Status</h2>

      <p>Backend status: {apiStatus}</p>
      <p>{apiMessage}</p>
    </main>
  );
}

export default App;
