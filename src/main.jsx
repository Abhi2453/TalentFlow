import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// ✅ Conditionally start MirageJS mock server (only in development)
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { startServer } = await import("./server/server");
    await startServer();
  }
}

// ✅ Start Mirage only in dev, then mount React app
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});
