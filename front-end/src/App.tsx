import React from "react";
import Navbar from "./Components/navbar";
import Routes from "./routes";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
}
export default App;
