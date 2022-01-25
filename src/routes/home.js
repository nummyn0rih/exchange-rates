import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { exchange } from '../slices/ratesSlice.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date();

export default function Home() {
  const [text, setText] = useState('');
  const {
    currencies: { response },
  } = useSelector((state) => state.rates);

  const dispatch = useDispatch();

  return (
    <>
      <Box sx={{ mt: 10, color: 'primary.contrastText', textAlign: 'center' }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Курсы валют на {today.toLocaleDateString('ru-RU', options)}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: '1',
        }}
      >
        <Paper
          component='form'
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(exchange({ text }));
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
        <Box sx={{ mt: 3, color: 'primary.contrastText', textAlign: 'center' }}>
          <Typography variant='h5' component='h2' gutterBottom>
            <p>
              {response
                ? response
                : 'Введите запрос следующего вида: 15 usd in rub'}
            </p>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
