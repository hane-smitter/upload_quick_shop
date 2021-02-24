import React, { useState, useContext } from "react";
import { Form, Formik, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import { FormHelperText, FormControl, InputLabel } from "@material-ui/core";
import axios from "axios";
import * as yup from "yup";
import {
  Button,
  Grid,
  Container,
  Stepper,
  Step,
  StepLabel,
  Box,
  Card,
  MenuItem,
} from "@material-ui/core";

import GlobalState from "../contexts/GlobalState";
import FileInput from "./Upload.js";
import useStyles from "./Styles.js";
import Thumb from "./imgPrev/Thumb";

const Pages = () => {
  const classes = useStyles();
  const [globState, setGlobState] = useContext(GlobalState);
  
  return (
    <Container>
      <Grid container spacing={4} justify="center" alignItems="center">
        <FormikStepper>
          
          {/* STEP 1 */}
          <Card
            label="product desciption"
            variant="outlined"
            className={classes.formBox}
          >
            <FormStep>
              <Box paddingBottom={2}>
                <FileInput />
                <Thumb file={globState.image} />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  name="description"
                  multiline
                  rows={2}
                  variant="outlined"
                  rowsMax={10}
                  component={TextField}
                  label="Description"
                  value={globState.description}
                  onChange={(e) =>
                    setGlobState((globState) => ({
                      ...globState,
                      description: e.target.value,
                    }))
                  }
                />
              </Box>
            </FormStep>
          </Card>

          {/* STEP 2 */}
          <Card
            label="product category"
            variant="outlined"
            className={classes.formBox}
          >
            <FormStep>
              <Box paddingBottom={2}>
                <Field
                  name="condition"
                  select
                  component={TextField}
                  label="condition"
                  value={globState.condition}
                  onChange={(e) =>
                    setGlobState((globState) => ({
                      ...globState,
                      condition: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Used">Used</MenuItem>
                  <MenuItem value="Any">Any</MenuItem>
                </Field>
              </Box>
              <Box paddingBottom={2}>
                <Field
                  name="brand"
                  variant="outlined"
                  component={TextField}
                  label="Brand"
                  value={globState.brand}
                  onChange={(e) =>
                    setGlobState((globState) => ({
                      ...globState,
                      brand: e.target.value,
                    }))
                  }
                />
              </Box>
            </FormStep>
          </Card>

          {/* STEP 3 */}
          <Card
            style={{ overflow: "visible" }}
            label="personal info"
            variant="outlined"
            className={classes.formBox}
          >
            <FormStep
              validationSchema={yup.object().shape({
                name: yup.string().required("please Enter your name"),
                phone: yup.number("Provide a number only"),
                email: yup
                  .string()
                  .email("Invalid email")
                  .required("Please enter your email"),
                address: yup.string().required("We need your delivery address"),
                city: yup.string().required("Please enter your town"),
              })}
            >
              <Box paddingBottom={2}>
                <Field
                  name="name"
                  variant="outlined"
                  component={TextField}
                  label="Your name"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  name="phone"
                  type="number"
                  variant="outlined"
                  component={TextField}
                  label="Phone"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  name="email"
                  type="email"
                  variant="outlined"
                  component={TextField}
                  label="E-mail address"
                />
              </Box>

              <Box paddingBottom={2}>
                <Field name="city" component={TextField} label="Town / City" />
                <FormHelperText>City or Town</FormHelperText>
              </Box>

              <Box paddingBottom={2}>
                <Field
                  name="address"
                  placeholder="Hse no. and street name"
                  component={TextField}
                  label="Delivery Address"
                />
              </Box>
            </FormStep>
          </Card>
        </FormikStepper>
      </Grid>
    </Container>
  );
};

export function FormStep({ children }) {
  return <>{children}</>;
}

function FormikStepper({ children, ...props }) {

  const [globState] = useContext(GlobalState);

  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      initialValues={{
        image: "",
        condition: "",
        brand: "",
        description: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        town: "",
        city: "",
      }}
      validationSchema={currentChild.props.children.props.validationSchema}
      onSubmit={async (val, helpers) => {
        if (isLastStep()) {
          // Object.assign(val, globState);
          // uploading image
          const formData = new FormData();
          formData.append("myFile", val.image, val.image.name);

          // Details of the uploaded file
          console.log(formData);

          //backend api to upload image
          await axios.post("api/uploadfile", formData);

          delete val.image;
          console.log("val");
          console.log(val);

          await axios({
            method: "post",
            url: "https://quickshop.co.ke" /* enter url to post data to */,
            data: val,
          })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setStep((_) => ++_);
        }
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <Stepper activeStep={step} alternativeLabel>
            {childrenArray.map((child) => (
              <Step key={child.props.label}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentChild}

          <Grid container justify="center" spacing={3}>
            <Grid item>
              {step > 0 ? (
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={() => setStep((_) => --_)}
                >
                  Back
                </Button>
              ) : null}
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="secondary"
                disabled={isSubmitting}
              >
                {isLastStep() ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export { Pages, FormikStepper };