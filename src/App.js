import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputName, setNameValue] = useState('');
  const [inputAge, setAgeValue] = useState('');
  const [rows, setRows] = useState([]);
  const [fromTime, setDate] = useState('');
  const [whatDone, setWhatDone] = useState('');

  const handleChgName = (event) => {
    setNameValue(event.target.value);
  };
  const handleChgAge = (event) => {
    setAgeValue(event.target.value);
  };

  const handleSaveWork = (event) => {
    let data = {
      name: inputName,
      age: inputAge,
      workTime: rows
    };
    console.log("rows:", data);
    // post Person to server
    fetch(`/users/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: data})
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
  };

  const handleAddWork = () => {
    // Добавляем новую строку в таблицу
    setRows([...rows, { fromTime, whatDone }]);
    // Очищаем поля формы
    setDate('');
    setWhatDone('');
  };

  const handleRowChg = (index, field, value) => {
    // Создаем новый массив, изменяя только одно поле в одной строке
    const updatedRows = rows.map((row, idx) => {
      if (idx === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handlegetData = () => {
    // get or create Person
    fetch(`/users?name=${inputName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setAgeValue(data.age);
      setRows(data.workTime);
    })
    .catch(error => console.error('Error:', error));
  };

  /*useEffect(() => {
    fetch('/users')
      .then(response => response.json())
      .then(data => {
        console.log("data:", data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);*/

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className='al-left'>
        <span className='inline'>Name:</span>
        <input type='text' value={inputName} onChange={handleChgName} placeholder="input name"/>
        <span className='inline'>Age:</span>
        <input type='text' value={inputAge} onChange={handleChgAge} placeholder="input age"/>
        <button onClick={handlegetData}>Get or create person</button>
        <table border={1}>
          <thead><tr><th>from date-time</th><th>what did?</th></tr></thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td><input type='text' value={row.fromTime} onChange={(e) => handleRowChg(index, 'fromTime', e.target.value)} placeholder="set date-time"/></td>
                <td><textarea value={row.whatDone} onChange={(e) => handleRowChg(index, 'whatDone', e.target.value)} placeholder="set what was done"/></td>
              </tr>
          ))}
          </tbody>
        </table>
        <button onClick={handleAddWork}>Add time</button>
        <button onClick={handleSaveWork}>save all work</button>
      </div>
    </div>
  );
}

export default App;
