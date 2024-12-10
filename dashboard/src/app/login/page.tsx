'use client'
import Image from 'next/image'
import { useState, FormEvent } from 'react'
import { TextField, InputAdornment, IconButton, Checkbox } from '@mui/material'
import { Mail, Lock, Visibility, VisibilityOff } from '@mui/icons-material'

import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'

import SupportAgentIcon from '@mui/icons-material/SupportAgent'

import EmailIcon from '@mui/icons-material/Email'

import InstagramIcon from '@mui/icons-material/Instagram'
import XIcon from '@mui/icons-material/X'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ email, password, rememberMe })
  }

  return (
    <div className='container-fluid vh-100 d-flex justify-content-center align-items-center bg-white'>
      <div className='row w-100 h-100'>
        <div className='col-12 col-md-6 d-none d-md-flex p-5'>
          <Image
            src='/images/Login.png'
            alt='Shopping Woman'
            width={500}
            height={500}
            className='w-100 h-90 img-fluid p-4'
            style={{
              objectFit: 'cover',
              marginTop: '20px',
              marginBottom: '20px'
            }}
          />
        </div>

        <div className='col-12 col-md-6 d-flex flex-column justify-content-center align-items-center bg-white px-4 px-md-5 py-5'>
          <div className='text-center mb-4'>
            <Image
              src='/images/logo.png'
              alt='Logo'
              width={153}
              height={40}
              className='p-8'
            />
            <h3 className='text-dark fw-bold'>Welcome Back 👋</h3>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ width: '100%', maxWidth: '400px' }}
          >
            <div className='mb-3'>
              <label className='form-label fw-bold mb-2 text-danger'>
                Sign in
              </label>
              <TextField
                fullWidth
                variant='outlined'
                type='email'
                placeholder='Email'
                autoComplete='off'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Mail color='error' />
                    </InputAdornment>
                  )
                }}
                color='error'
              />
            </div>

            <div className='mb-3'>
              <TextField
                fullWidth
                variant='outlined'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Lock style={{ color: '#d32f2f', fontSize: '1.2rem' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                        style={{ padding: '1' }}
                      >
                        {showPassword ? (
                          <VisibilityOff
                            style={{ color: '#d32f2f', fontSize: '1.2rem' }}
                          />
                        ) : (
                          <Visibility
                            style={{ color: '#d32f2f', fontSize: '1.2rem' }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    borderRadius: '8px'
                  },
                  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d32f2f'
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ccc'
                  }
                }}
                color='error'
              />
            </div>

            <div className='mb-4'>
              {/* Forgot Password Link */}
              <div className='d-flex justify-content-end mb-2'>
                <a
                  href='#'
                  className='text-black fw-bold'
                  style={{
                    textDecoration: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  Forgot Password?
                </a>
              </div>

              {/* Remember Me Checkbox */}
              <div className='d-flex align-items-center'>
                <Checkbox
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  color='error'
                  style={{ padding: '0' }}
                />
                <span
                  style={{
                    marginLeft: '5px',
                    fontSize: '0.9rem',
                    color: '#616161'
                  }}
                >
                  Remember me
                </span>
              </div>
            </div>

            <button type='submit' className='btn btn-danger w-100 py-2'>
              Sign in
            </button>

            <p className='text-muted mt-4  text-center text-danger'>
              <span className='text-danger'> Secured by </span>{' '}
              <span className='fw-bold'>AITS HUB</span>
            </p>
          </form>

          {/* Footer */}
          <div className='customer-support-section mt-0 '>
            <div className='mt-2 text-center'>
              <div className='d-flex flex-column align-items-center'>
                <div className='d-flex justify-content-center align-items-center gap-2'>
                  <SupportAgentIcon
                    style={{ fontSize: '30px', color: 'black' }}
                  />
                  <h5 className='text-danger fw-bold mt-2 mb-0'>
                    Customer Support
                  </h5>
                </div>
                <p className='text-muted mb-3'>
                  Call/Chat with us or send an email
                </p>
              </div>
              <div className='d-flex justify-content-center gap-3'>
                <a href='#' className='d-flex align-items-center'>
                  <FacebookRoundedIcon
                    style={{ fontSize: '30px', color: 'red' }}
                  />
                </a>
                <a href='#' className='d-flex align-items-center'>
                  <WhatsAppIcon style={{ fontSize: '30px', color: 'red' }} />
                </a>
                <a
                  href='https://www.instagram.com'
                  className='d-flex align-items-center'
                >
                  <InstagramIcon style={{ fontSize: '30px', color: 'red' }} />
                </a>

                <a
                  href='https://twitter.com'
                  className='d-flex align-items-center'
                >
                  <XIcon style={{ fontSize: '30px', color: 'black' }} />
                </a>
                <a
                  href='mailto:support@example.com'
                  className='d-flex align-items-center'
                >
                  <EmailIcon style={{ fontSize: '30px', color: '#d32f2f' }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
