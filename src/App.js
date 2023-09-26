import axios from "axios";

function App() {

  const getPackages = async () => {
    axios.get('http://localhost:4444/api/packages')
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <div>
      <h1>React App</h1>
      <button onClick={getPackages}>Get Packages</button>
    </div>
  );
}

export default App;
