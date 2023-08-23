import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from 'E:/Web Programming Practice/GlobeTrotter/globetrotter/src/features/authSlice'
import { loginUser as loginUserApi } from 'E:/Web Programming Practice/GlobeTrotter/globetrotter/src/services/user'
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Link as MUILink,
} from '@mui/material';

function LoginUser() {
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')

  // get the navigation object
  const navigate = useNavigate()

  // get dispatcher object
  const dispatch = useDispatch()

  const loginUser = async (userId) => {
    if (emailId.length === 0) {
      toast.error('Please enter email')
    } else if (password.length === 0) {
      toast.error('Please enter password')
    } else {
      // call register api
      
      const response = await loginUserApi(emailId, password)
      // parse the response
      if (response['status'] === 200) {
        const { name } = response.data;
        console.log(response.data)

         sessionStorage['name'] = name
       
        dispatch(login(userId));

        toast.success(`Welcome back ${name}`)

        // go back to login
        navigate('/Post')
      } else {
        toast.error('Invalid user name or password')
      }
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmailId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Don't have an account?{' '}
              <MUILink component={Link} to="/register">
                Register here
              </MUILink>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={loginUser}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default LoginUser;
