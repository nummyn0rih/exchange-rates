import { useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date();

export default function App() {
  const [text, setText] = useState('');

  return (
    <Container
      maxWidth='sm'
      sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <Box sx={{ mt: 10, color: 'primary.contrastText', textAlign: 'center' }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Курсы валют на {today.toLocaleDateString('ru-RU', options)}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: '1',
        }}
      >
        <Paper
          component='form'
          onSubmit={(e) => {
            e.preventDefault();
            console.log(text);
            setText('');
          }}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder='Введите запрос'
            inputProps={{ 'aria-label': 'введите запрос' }}
            aria-describedby='helper-text'
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <IconButton
            color='primary'
            sx={{ p: '10px' }}
            aria-label='directions'
            type='submit'
          >
            <CurrencyExchangeTwoToneIcon />
          </IconButton>
        </Paper>
      </Box>
    </Container>
  );
}
