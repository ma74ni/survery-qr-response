import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';
import Logo from '../../images/logo.svg'

const Welcome = ({handleStart}) => {
  return(
    <Container maxWidth="sm">
      <Box width={'70%'} m={'2rem auto 0'} p={4} sx={{ borderRadius: '12px', backgroundColor:'#EEF0EE' }} >
        <Stack textAlign={'center'}>
          <Box width={'165px'} height={'165px'} m={'0 auto 1rem'}>
            <img src={Logo} alt="Logo la esquina del Profe" />
          </Box>
          <Typography variant="h1" gutterBottom>
            ¡Queremos Escucharte! 
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Tu participación es esencial, así que ¡no te pierdas la oportunidad de hacer que tu voz sea escuchada! <br />
            Gracias por ser parte de este viaje con nosotros.
          </Typography>
        </Stack>
        <Box mt={4} textAlign={'center'}>
          <Button variant="contained" size="medium" onClick={handleStart}> ¡Comencemos!</Button>
        </Box>
      </Box>
      
    </Container>
  )
}

Welcome.propTypes = {
  handleStart: PropTypes.func.isRequired,
};

export default Welcome