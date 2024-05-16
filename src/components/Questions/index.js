import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';


const Questions = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});

  const handleChange = (label, valor) => {
    setRespuestas(prevState => ({...prevState, [label]: valor }));
  };

   const handleSubmit = async () => {
    try {
      // Save responses to Firestore
      await db.collection('respuestas').add(respuestas);
      // Optionally, you can clear the responses state after submitting
      setRespuestas({});
      alert('Respuestas enviadas exitosamente.');
    } catch (error) {
      console.error('Error submitting responses:', error);
      alert('Hubo un error al enviar las respuestas. Por favor, inténtalo de nuevo.');
    }
  };

  useEffect(() => {
    const cargarPreguntas = async () => {
      const snapshot = await db.collection('preguntas').get();
      const listaDePreguntas = [];
      snapshot.forEach(doc => {
        listaDePreguntas.push({ id: doc.id,...doc.data() });
      });
      setPreguntas(listaDePreguntas);
    };

    cargarPreguntas();
  }, []);

  console.log(preguntas)
  return (
     <div>
      {preguntas.map(pregunta => (
        <div key={pregunta.id}>
          <p>{pregunta.label}</p>
          {pregunta.tipo === "text"? (
            <input type="text" placeholder="Responde aquí..." onChange={(e) => handleChange(pregunta.label, e.target.value)}/>
          ) : (
            <div>
              {pregunta.opciones.map((opcion, index) => (
                <label key={index}>
                  <input type="checkbox" name={`pregunta${pregunta.id}`} value={opcion} onChange={(e) => handleChange(pregunta.label, e.target.value)} /> {opcion}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  )

}

export default Questions