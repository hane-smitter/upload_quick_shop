import React, { useState, useContext } from "react";
import { Form, Formik, FormikConfig, FormikValues, Field } from "formik";
import { TextField } from "formik-material-ui";
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

const Pages = () => {
  const classes = useStyles();
  const [globState, setGlobState] = useContext(GlobalState);
  return (
    <Container>
      <Grid container spacing={4} justify="center" alignItems="center">
        <FormikStepper onSubmit={() => {}}>
          {/* {console.log("global context state")}
          {console.log(globState)} */}
          {/* STEP 1 */}
          <Card
            label="product desciption"
            variant="outlined"
            className={classes.formBox}
          >
            <FormStep>
              <Box paddingBottom={2}>
                <FileInput />
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
                  name="category"
                  select
                  component={TextField}
                  label="Category"
                  value={globState.category}
                  onChange={(e) =>
                    setGlobState((globState) => ({
                      ...globState,
                      category: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Home Appliances">Home Appliances</MenuItem>
                  <MenuItem value="Computers">Computers</MenuItem>
                  <MenuItem value="Smartphones">Smartphones</MenuItem>
                  <MenuItem value="Tools and Equipments">
                    Tools and Equipments
                  </MenuItem>
                  <MenuItem value="Health and Beauty">
                    Health and Beauty
                  </MenuItem>
                  <MenuItem value="Agriculture and Food">
                    Agriculture and Food
                  </MenuItem>
                  <MenuItem value="Jobs">Jobs</MenuItem>
                  <MenuItem value="Commercial Equipments And Tools">
                    Commercial Equipments And Tools
                  </MenuItem>
                  <MenuItem value="Home, Furniture and Appliances">
                    Home, Furniture and Appliances
                  </MenuItem>
                  <MenuItem value="Sports, Arts and Outdoors">
                    Sports, Arts and Outdoors
                  </MenuItem>
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Repair and Construction">
                    Repair and Construction
                  </MenuItem>
                  <MenuItem value="Mobile Phones and Tablets">
                    Mobile Phones and Tablets
                  </MenuItem>
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
                phone: yup.number(),
                email: yup
                  .string()
                  .email("Invalid email")
                  .required("Please enter your email"),
                address: yup.string().required("We need your delivery address"),
                town: yup.string().required("Please enter your town"),
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
                <Field
                  name="address"
                  placeholder="House number and street name"
                  component={TextField}
                  label="Delivery Address"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  name="town"
                  component={TextField}
                  label="Town / City"
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
  const [globState, setGlobState] = useContext(GlobalState);
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
        category: "",
        brand: "",
        description: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        town: "",
      }}
      validationSchema={currentChild.props.children.props.validationSchema}
      onSubmit={async (val, helpers) => {
        Object.assign(val, globState);
        if (isLastStep()) {
          await axios({
            method: 'post',
            url: 'https://quickshop.co.ke'/* enter url to post data to */,
            data: val
          })
          .then(respone => {
            console.log(response);
          })
          .catch(error => {
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
