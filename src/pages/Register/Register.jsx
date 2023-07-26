/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../../formik/TextField";
import { BASEURL } from "../../api_url/api";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const Register = () => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    const { firstName, lastName, email, password } = values;

    try {
      await axios.post(
        `${BASEURL}/register`,
        JSON.stringify({ firstName, lastName, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      navigate("/login");
      actions.resetForm();
      setLoading(false);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg(
          "No Server Response. Please check your internet connection and try again"
        );
      } else if (err.response?.status === 400) {
        setErrMsg(
          "Email already exists. Please use a different email or login"
        );
      } else if (err.response?.status === 409) {
        setErrMsg("Email already exists. Please use a different email");
      } else {
        setErrMsg(
          "Register Failed. Please check your credentials and try again"
        );
      }
      setLoading(false);
      console.log(loading);
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
        mt="80px"
      >
        <Stack
          align="center"
          w={{ base: "400px", md: "500px" }}
          p="80px"
          boxShadow="rgba(0, 0, 0, 0.2) 0px 4px 12px"
          borderRadius="20px"
        >
          <Text fontSize="30px">Register</Text>
          <Text mb={5}>It's quick and easy.</Text>
          <Box w="100%">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object({
                firstName: Yup.string().required("First name required"),
                lastName: Yup.string().required("Last name required"),
                email: Yup.string()
                  .email("Please enter a valid email address")
                  .required("email required"),
                password: Yup.string()
                  .required("Password is required")
                  .matches(
                    passwordRegex,
                    "Please enter strong password, 8 characters"
                  ),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
                  .required("Confirm password is required"),
              })}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <VStack as="form" onSubmit={formik.handleSubmit} spacing={4}>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <TextField
                      name="firstName"
                      placeholder="enter firstName"
                      type="text"
                    />
                  </FormControl>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <TextField
                      name="lastName"
                      placeholder="enter lastName"
                      type="text"
                    />
                  </FormControl>
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
                  <FormControl id="password" isRequired>
                    <FormLabel>confirm password</FormLabel>
                    <TextField
                      name="confirmPassword"
                      type="password"
                      placeholder="enter confirm password"
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
                    Create an account
                  </Button>
                  <Flex>
                    <Text>Already have an account? </Text>
                    <Link to="/login">
                      <Box ml={2} color="teal">
                        Login
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

export default Register;
