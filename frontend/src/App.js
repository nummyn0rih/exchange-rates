import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date();

export default function App() {
  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4, color: 'primary.contrastText', textAlign: 'center' }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Курсы валют на {today.toLocaleDateString('ru-RU', options)}
        </Typography>
      </Box>
    </Container>
  );
}
