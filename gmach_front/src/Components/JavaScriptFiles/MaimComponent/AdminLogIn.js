import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        PlusMinus
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminLogIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

  };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const FetchLogIn = async (email, password) => {
    console.log("start!! ", email, password);
    try {
      const response = await fetch(`https://localhost:7275/api/User/Admin/LogIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log("Data is: ", data);
      if (data) {
        console.log("Admin is logged in");
        window.location.href = "/Admin/Application";
      }
      else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error('Error fetching Admin:', error);
    }
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(ev) => {
                const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
                if (emailRegex.test(ev.target.value)) {
                  setEmail(ev.target.value);
                } else {
                  setEmail("");
                }
              }}

              onBlur={(ev) => {
                const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
                if (emailRegex.test(ev.target.value)) {
                  setEmail(ev.target.value);
                } else {
                  setEmail("");
                }

              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(ev) => {
                const passwordRegex = /^[a-zA-Z0-9]+$/;
                if (passwordRegex.test(ev.target.value) || ev.target.value === "") {
                  setPassword(ev.target.value);
                } else {
                  setPassword("");
                }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                if (email === "" || password === "") {
                  alert("Invalid email or password");
                } else {
                  FetchLogIn(email, password);
                }

              }}
            >
              Sign In
            </Button>


          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

/**
 *  <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>


            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
 */


/**
 * Encoded password: 
 * 
 * 
 * in JS:
 * const crypto = require('crypto');

function hashPassword(password, salt) {
    var hash = crypto.pbkdf2Sync(password, salt, 
        1000, 64, `sha512`).toString(`hex`); 
    return hash;
};

function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

let salt = generateSalt();
let hashedPassword = hashPassword('userPassword', salt);

let userPassword = 'userPassword';
let hashedPasswordToCheck = hashPassword(userPassword, salt);

if(hashedPassword === hashedPasswordToCheck) {
    console.log('Password is correct');
} else {
    console.log('Password is incorrect');
}



in C#:

* public string HashPassword(string password, string salt)
{
    var pbkdf2 = new Rfc2898DeriveBytes(password, Encoding.UTF8.GetBytes(salt), 10000);
    byte[] hash = pbkdf2.GetBytes(20);
    return Convert.ToBase64String(hash);
}
public string GenerateSalt()
{
    byte[] bytes = new byte[128 / 8];
    using (var keyGenerator = RandomNumberGenerator.Create())
    {
        keyGenerator.GetBytes(bytes);
        return BitConverter.ToString(bytes).Replace("-", "").ToLower();
    }
}
 */