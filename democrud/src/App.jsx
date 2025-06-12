import { useState } from 'react'
import './App.css'

function App() {
  const [nombre, setNombre] = useState('');
  const [nombres, setNombres] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAgregar = () => {
    if (nombre.trim() === '') return;

    if (editIndex !== null) {
      const nuevosNombres = [...nombres];
      nuevosNombres[editIndex] = nombre;
      setNombres(nuevosNombres);
      setEditIndex(null);
    } else {
      setNombres([...nombres, nombre]);
    }

    setNombre('');
  };

  const handleEditar = (index) => {
    setNombre(nombres[index]);
    setEditIndex(index);
  };

  const handleEliminar = (index) => {
    const nuevosNombres = nombres.filter((_, i) => i !== index);
    setNombres(nuevosNombres);
    if (editIndex === index) {
      setNombre('');
      setEditIndex(null);
    }
  };

  return (
    <div className="App">
      <h1>CRUD Básico en React</h1>
      <input
        type="text"
        value={nombre}
        placeholder="Escribe un nombre"
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={handleAgregar}>
        {editIndex !== null ? 'Actualizar' : 'Agregar'}
      </button>

      <ul>
        {nombres.map((n, index) => (
          <li key={index}>
            {n}{' '}
            <button onClick={() => handleEditar(index)}>Editar</button>{' '}
            <button onClick={() => handleEliminar(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
