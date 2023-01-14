import { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import axios from "axios";
import useSWR from "swr";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, FormHelperText, Grid, Divider, TextField, Typography } from "@mui/material";
import { Logo } from "../../components/logo";
import { useAuthContext } from "../../contexts/auth-context";
import Router from "next/router";

const Page = () => {
  const [emailSent, setEmailSent] = useState("");
  const authContext = useAuthContext();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().min(8).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      // console.log(values);
      try {
        const url = "http://3.82.153.22:4000/admins/login";
        const res = await axios
          .post(url, {
            ...values,
          })
          .catch((error) => {
            console.log(error.response.status);
          });

        console.log(res.data);
        if (res.status == 200 && res.data.success == true) {
          authContext.signIn(res.data.user);
          globalThis.sessionStorage.setItem("signIn", "true");
          Router.push("/").catch(console.error);
        } else {
          console.log(res.data.success);
          formik.resetForm();
          helpers.setFieldError("submit", "Wrong credentials. Please Try again!");
        }
        setEmailSent(true);
      } catch (err) {
        console.error(err);
        helpers.setFieldError("submit", err.message || "Something went wrong");
        helpers.setSubmitting(false);
      }
    },
  });

  const handleRetry = () => {
    // setEmailSent(false);
  };

  const handleSkip = () => {
    // Since skip is requested, we set a fake user as authenticated
    const user = {};

    // Update Auth Context state
    authContext.signIn(user);

    // Persist the skip for AuthProvider initialize call
    globalThis.sessionStorage.setItem("skip-auth", "true");

    // Redirect to home page
    Router.push("/").catch(console.error);
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: "flex",
          flex: "1 1 auto",
        }}
      >
        <Grid container sx={{ flex: "1 1 auto" }}>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              backgroundColor: "neutral.50",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                p: 3,
              }}
            >
              <NextLink href="/" passHref>
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                  />
                </a>
              </NextLink>
            </Box>
            <Box
              sx={{
                flex: "1 1 auto",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  maxWidth: 500,
                  px: 3,
                  py: "100px",
                  width: "100%",
                }}
              >
                <div>
                  <Typography sx={{ mb: 1 }} variant="h4">
                    Welcome
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 3 }} variant="body2">
                    Sign up on the internal platform
                  </Typography>

                  <div>
                    <TextField
                      error={Boolean(formik.touched.password && formik.errors.email)}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      label="Email Address"
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      value={formik.values.email}
                      variant="outlined"
                    />
                    <Divider
                      sx={{
                        my: 3,
                      }}
                    />
                    <TextField
                      error={Boolean(formik.touched.password && formik.errors.password)}
                      fullWidth
                      helperText={formik.touched.password && formik.errors.password}
                      label="Password"
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.password}
                      variant="outlined"
                      isSecured={true}
                    />
                    <FormHelperText sx={{ mt: 1 }}>
                      Enter a valid credentials since this is fully authenticated system.
                    </FormHelperText>
                    {formik.errors.submit && (
                      <Typography color="error" sx={{ mt: 2 }} variant="body2">
                        {formik.errors.submit}
                      </Typography>
                    )}
                    <Button
                      fullWidth
                      size="large"
                      sx={{ mt: 3 }}
                      onClick={() => formik.handleSubmit()}
                      variant="contained"
                    >
                      Continue
                    </Button>
                    {/* <Button fullWidth size="large" sx={{ mt: 3 }} onClick={handleSkip}>
                      Skip authentication
                    </Button> */}
                  </div>
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              alignItems: "center",
              background: "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              "& img": {
                maxWidth: "100%",
              },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography
                align="center"
                color="inherit"
                sx={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  mb: 1,
                }}
                variant="h1"
              >
                Wanna make your vote a smart and valid.The best solution is at your fingertips.
              </Typography>
              <Typography align="center" sx={{ mb: 3 }} variant="subtitle1">
                Place your vote securely and lead towards a better tomorrow.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Page;
