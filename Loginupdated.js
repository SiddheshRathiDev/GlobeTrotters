import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  // const userId = useSelector(state => state.userId)

  // get the navigation object
  const navigate = useNavigate()

  // get dispatcher object
  const dispatch = useDispatch()

  const loginUser = async () => {
    if (emailId.length === 0) {
      toast.error('Please enter email')
    } else if (password.length === 0) {
      toast.error('Please enter password')
    } else {
      // call register api
      
      const response = await loginUserApi(emailId, password)
      console.log(response.data);
      // parse the response
      if (response['status'] === 200) {
        const { name, userId } = response.data;
        console.log(response.data)

         sessionStorage['name'] = name
         sessionStorage['user_id'] = userId
       
        dispatch(login(userId, name));
        // dispatch(login(name));

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

// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { login } from 'E:/Web Programming Practice/GlobeTrotter/globetrotter/src/features/authSlice'
// import { loginUser as loginUserApi } from 'E:/Web Programming Practice/GlobeTrotter/globetrotter/src/services/user'
// import {
//   Typography,
//   TextField,
//   Button,
//   Container,
//   Grid,
//   Box,
//   CssBaseline,
//   Paper,
//   FormControlLabel,
//   Checkbox,
//   Link,
// } from '@mui/material';

// function LoginUser() {
//   const [emailId, setEmailId] = useState('')
//   const [password, setPassword] = useState('')

//   // get the navigation object
//   const navigate = useNavigate()

//   // get dispatcher object
//   const dispatch = useDispatch()

//   const loginUser = async () => {
//     if (emailId.length === 0) {
//       toast.error('Please enter email')
//     } else if (password.length === 0) {
//       toast.error('Please enter password')
//     } else {
//       // call register api
      
//       const response = await loginUserApi(emailId, password)
//       // parse the response
//       if (response['status'] === 200) {
//         const { name, userId } = response.data;
//         console.log(response.data)

//          sessionStorage['name'] = name;
//          sessionStorage['userId'] = userId;
       
//         dispatch(login(userId));

//         toast.success(`Welcome back ${name}`)

//         // go back to login
//         navigate('/Post')
//       } else {
//         toast.error('Invalid user name or password')
//       }
//     }
//   }

//   return (
//     <Container component="main" maxWidth="lg">
//     <Box
//       sx={{
//         marginTop: 8,
//       }}
//     >
//       <Grid container>
//         <CssBaseline />
//         <Grid item sx={{ flex: 1, background: `linear-gradient(rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5)), url("https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600") center`, backgroundSize: 'cover', padding: '50px', display: 'flex', flexDirection: 'column', gap: '30px', color: 'white', fontSize: '100px', lineHeight: '100px' }}>
//          <Typography variant="h1">Hello World.</Typography>
//          <Typography>
//            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum, alias totam
//            numquam ipsa exercitationem dignissimos, error nam, consequatur.
//          </Typography>
         
//        </Grid>
//         <Grid
//           item
//           xs={12}
//           sm={8}
//           md={5}
//           component={Paper}
//           elevation={6}
//           square
//         >
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <Box
//               component="form"
//               noValidate
//               onSubmit={loginUser}
//               sx={{ mt: 1 }}
//             >
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//               />
//               <FormControlLabel
//                 control={<Checkbox value="remember" color="primary" />}
//                 label="Remember me"
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign In
//               </Button>
//               <Grid container>
//                 <Grid item xs>
//                   <Link href="#" variant="body2">
//                     Forgot password?
//                   </Link>
//                 </Grid>
//                 <Grid item>
//                   <Link href="#" variant="body2">
//                     {"Don't have an account? Sign Up"}
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   </Container>
// );
// };

// export default LoginUser;
