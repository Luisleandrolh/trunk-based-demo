import { useState } from 'react';
import './App.css';

function App() {
  const [nombre, setNombre] = useState('');
  const [nombres, setNombres] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAgregar = () => {
    // Validación 1: Campo vacío
    if (nombre.trim() === '') {
      alert("El nombre no puede estar vacío");
      return;
    }

    // Validación 2: Nombre duplicado (solo si NO estamos editando)
    if (editIndex === null && nombres.includes(nombre)) {
      alert("¡Este nombre ya existe!");
      return;
    }

    // Lógica existente para agregar/editar
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
        placeholder="Escribe un nombre: "
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={handleAgregar}>
        {editIndex !== null ? 'Actualizar' : 'Agregar'}
      </button>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {nombres.map((n, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{n}</td>
              <td>
                <button onClick={() => handleEditar(index)}>Editar</button>
                <button onClick={() => handleEliminar(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;