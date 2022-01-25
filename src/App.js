import { Link, Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function App() {
  return (
    <Container
      maxWidth='sm'
      sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <nav>
        <Stack direction='row' spacing={2}>
          <Link to='/'>
            <Button variant='contained'>Home</Button>
          </Link>
          <Link to='/exchanges'>
            <Button variant='contained'>Exchanges</Button>
          </Link>
        </Stack>
      </nav>
      <Outlet />
    </Container>
  );
}
