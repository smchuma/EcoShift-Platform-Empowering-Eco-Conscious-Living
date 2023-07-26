/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../../formik/TextField";
import useAuth from "../../hooks/useAuth";
import { BASEURL } from "../../api_url/api";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Navbar } from "../../components";

const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    const { email, password } = values;

    try {
      const response = await axios.post(
        `${BASEURL}/login`,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const userId = response?.data?.userId;
      login(accessToken, userId);
      navigate("/post");
      actions.resetForm();
      setLoading(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg(
          "No Server Response. Please check your internet connection and try again"
        );
      } else if (err.response?.status === 400) {
        setErrMsg(
          "Invalid email or Password. Please check your credentials and try again"
        );
      } else if (err.response?.status === 401) {
        setErrMsg(
          "Invalid email or Password. Please check your credentials and try again"
        );
      } else if (err.response?.status === 404) {
        setErrMsg(
          "User not found. Please check your credentials and try again"
        );
      } else {
        setErrMsg("Login Failed. Please check your credentials and try again");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Stack
        boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
        justify="center"
        align="center"
        minH="100vh"
        w="100%"
        mt="70px"
      >
        <Stack
          align="center"
          w={{ base: "400px", md: "500px" }}
          p="60px"
          boxShadow="rgba(0, 0, 0, 0.2) 0px 4px 12px"
          borderRadius="20px"
        >
          <Image mb={5} src={logo} boxSize="80px" objectFit="cover" />

          <Text fontSize="30px">Login.</Text>
          <Box w="100%">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Please enter a valid email address")
                  .required("email required"),
                password: Yup.string().required("Password is required"),
              })}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <VStack as="form" onSubmit={formik.handleSubmit} spacing={4}>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <TextField
                      name="email"
                      placeholder="enter email"
                      type="email"
                      w="100%"
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <TextField
                      name="password"
                      type="password"
                      placeholder="enter password"
                    />
                  </FormControl>

                  <Text color="red.500">{errMsg}</Text>
                  <Button
                    type="submit"
                    bg="#01836d"
                    color="white"
                    isLoading={loading}
                    loadingText="Loading"
                    w="100%"
                    _hover={{ bg: "#004e41" }}
                  >
                    Login
                  </Button>
                  <Flex>
                    <Text>Don't have an account? </Text>
                    <Link to="/register">
                      <Box ml={2} color="teal">
                        register
                      </Box>
                    </Link>
                  </Flex>
                </VStack>
              )}
            </Formik>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Login;
