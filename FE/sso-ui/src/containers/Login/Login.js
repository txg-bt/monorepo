/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Flex, Box } from 'rebass';
import PropTypes from 'prop-types';
import Button from '@txg/button';
import { useTheme } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';
import Input from '@txg/input';
import { getPathPrefix } from '../../pathPrefix';

function Login({ setToken, previousRoute }) {
  const theme = useTheme();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isButtonDisabled = !password || !email;

  async function login() {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      setToken(response.data.token);
      navigate(previousRoute);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Flex
      height="100%"
      width="100%"
      alignItems={'center'}
      paddingLeft="10%"
      backgroundColor={theme.surface01}
    >
      <Flex
        height="80%"
        width="600px"
        backgroundColor={theme.surface02}
        padding={theme.spacing05}
        flexDirection={'column'}
      >
        <Flex {...theme.heading} paddingBottom={theme.spacing04} color={theme.textColor01}>
          Login
        </Flex>

        <Flex width="100%" flexDirection={'column'} paddingTop={theme.spacing05}>
          <Box color={theme.textColor01}>Email</Box>
          <Input onChange={setEmail} type="email" value={email}></Input>
        </Flex>
        <Flex
          width="100%"
          flexDirection={'column'}
          paddingTop={theme.spacing06}
          marginBottom={theme.spacing06}
        >
          <Box color={theme.textColor01}>Password</Box>
          <Input onChange={setPassword} type="password" value={password}></Input>
        </Flex>

        <Flex paddingBottom={theme.spacing04}>
          <Link to={`${getPathPrefix()}/register`}>Don't have an account?</Link>
        </Flex>

        <Button onClick={login} isDisabled={isButtonDisabled}>
          Login
        </Button>
      </Flex>
    </Flex>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  previousRoute: PropTypes.string,
};

Login.defaultProps = {};

export default Login;
