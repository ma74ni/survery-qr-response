import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import toast from 'react-hot-toast';

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';

const Questions = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Todo listo');

  const handleSubmit = async () => {
    try {
      // Save responses to Firestore
      await db.collection('respuestas').add(respuestas);
      // Optionally, you can clear the responses state after submitting
      setRespuestas({});
      toast.success('Registro de respuestas correcto');
    } catch (error) {
      console.error('Error submitting responses:', error);
      alert('Hubo un error al enviar las respuestas. Por favor, inténtalo de nuevo.');
    }
  };

  useEffect(() => {
    const cargarPreguntas = async () => {
      try {
        const snapshot = await db.collection('preguntas')
          .orderBy('orden', 'asc')
          .get();
        const listaDePreguntas = [];
        snapshot.forEach(doc => {
          listaDePreguntas.push({ id: doc.id, ...doc.data() });
        });
        console.log(listaDePreguntas)
        setPreguntas(listaDePreguntas);
      } catch (error) {
        toast.error('Error a cargar las preguntas.');
        console.error('Error al cargar preguntas: ', error);
      } finally {
        setLoading(false);
      }
    };

    cargarPreguntas();
  }, []);

  const handleChange = (id, valor) => {
    console.log(id)
    setRespuestas(prevState => ({ ...prevState, [id]: valor }));
    console.log(respuestas)
  };

  const handleNext = () => {
    // Check if the current question has been answered before proceeding to the next step
    if (respuestas[preguntas[activeStep].id] !== undefined) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    } else {
      // Notify the user that the question is mandatory
      toast.error('Por favor, responde la pregunta antes de continuar.');
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const handleCheckChange = (preguntaId, opcion, isChecked) => {
    setRespuestas((prevRespuestas) => {
      const newRespuestas = { ...prevRespuestas };
      if (isChecked) {
        newRespuestas[preguntaId] = [...(newRespuestas[preguntaId] || []), opcion];
      } else {
        newRespuestas[preguntaId] = (newRespuestas[preguntaId] || []).filter((item) => item !== opcion);
      }
      return newRespuestas;
    });
  };

  useEffect(() => {
    const percentage = activeStep / preguntas.length;
    let tempMessage = '';

    if (percentage === 0) {
      tempMessage = 'Todo listo';
    } else if (percentage > 0 && percentage <= 0.5) {
      tempMessage = 'Sigue así';
    } else if (percentage > 0.5 && percentage <= 0.8) {
      tempMessage = 'Vas por buen camino';
    } else if (percentage > 0.8) {
      tempMessage = 'Ya mismo terminas';
    }
    setMessage(tempMessage);
  }, [activeStep, preguntas.length]);

  if (loading) {
    return <Box textAlign={'center'}><CircularProgress /></Box>;
  }
  return (
    <Container maxWidth="sm">
      <Box
        width={'70%'}
        m={'2rem auto 0'}
        p={4}
        sx={{ borderRadius: '12px', backgroundColor: '#EEF0EE' }}
      >
        {activeStep === preguntas.length ? (
          <div>
            <Typography>Gracias por participar</Typography>
            <Button onClick={handleSubmit}>Reclamar premio</Button>
          </div>
        ) : (
          <>
            <Typography variant="h1" textAlign={'center'}>{message}</Typography>
            <Box sx={{ overflowY: 'auto', maxHeight: '70vh', margin: '1rem 0' }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {preguntas.map((pregunta, index) => (
                  <Step key={pregunta.id}>
                    <StepLabel>{pregunta.label} </StepLabel>
                    <StepContent>
                      {pregunta.tipo === 'text' && (
                        <TextField
                          label="Responde aquí..."
                          value={respuestas[pregunta.id] || ''}
                          onChange={(e) => handleChange(pregunta.id, e.target.value)}
                          fullWidth
                        />
                      )}
                      {pregunta.tipo === 'check' && (
                        <>
                         {pregunta.opciones.map((opcion, index) => (
                            <FormControlLabel
                              key={index}
                              control={<Checkbox />}
                              label={opcion}
                              onChange={(e) => handleCheckChange(pregunta.id, opcion, e.target.checked)}
                            />
                          ))}
                          {pregunta.opciones.includes('Otros (especificar)') && 
                          respuestas[pregunta.id] &&
                          respuestas[pregunta.id].includes('Otros (especificar)')&& (
                            <TextField
                              label="Responde aquí..."
                              value={respuestas[`${pregunta.id}_otros`] || ''}
                              onChange={(e) => handleChange(`${pregunta.id}_otros`, e.target.value)}
                              fullWidth
                            />
                          )}                          
                        </>
                      )}

                      {pregunta.tipo === 'number' && (
                        <TextField
                          type="number"
                          label="Responde aquí..."
                          value={respuestas[pregunta.id] || ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!isNaN(value) && value <= 100) {
                              handleChange(pregunta.id, value);
                            }
                          }}
                          fullWidth
                          inputProps={{ min: 0, max: 100 }}
                        />
                      )}
                      {pregunta.tipo === 'radio' && (
                        <>
                          <RadioGroup
                            value={respuestas[pregunta.id] || ''}
                            onChange={(e) => handleChange(pregunta.id, e.target.value)}
                          >
                            {pregunta.opciones.map((opcion, index) => (
                              <FormControlLabel
                                key={index}
                                value={opcion}
                                control={<Radio />}
                                label={opcion}
                              />
                            ))}
                          </RadioGroup>
                          {pregunta.opciones.includes('Otros (especificar)') && 
                          respuestas[pregunta.id] &&
                          respuestas[pregunta.id].includes('Otros (especificar)')&& (
                            <TextField
                              label="Responde aquí..."
                              value={respuestas[`${pregunta.id}_otros`] || ''}
                              onChange={(e) => handleChange(`${pregunta.id}_otros`, e.target.value)}
                              fullWidth
                            />
                          )} 
                        </>

                      )}
                      <Stack direction="row" spacing={2} mt={3}>
                        <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack}>Atrás</Button>
                        <Button variant="contained" onClick={handleNext}>
                          {activeStep === preguntas.length - 1 ? 'Finalizar' : 'Siguiente'}
                        </Button>
                      </Stack>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Questions;
