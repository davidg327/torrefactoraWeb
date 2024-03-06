import './App.css';
import Tasks from "./views/tasks";
import {Provider} from 'react-redux';
import store from "./state/store.js";

function App() {
  return (
    <Provider store={store}>
      <Tasks />
    </Provider>
  );
}

export default App;
