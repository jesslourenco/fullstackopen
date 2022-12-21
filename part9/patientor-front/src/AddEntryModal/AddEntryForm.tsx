/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";

import { TextField, SelectField, Option, DiagnosisSelection } from "../AddEntryModal/EntryFormField";
import { NewEntry, EntryTypes, HealthCheckRating, Diagnosis, Entry } from "../types";
import { addEntry, setDiagnosisList, useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";


interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void
}
const typeOptions: Option[] = [
  { value: EntryTypes.Hospital, label: "Hospital" },
  { value: EntryTypes.OccupationalHealthcare, label: "OccupationalHealthcare" },
  { value: EntryTypes.HealthCheck, label: "HealthCheck" },
];

const ratingOptions: Option[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
];


const loadEntryFields = (entryType: EntryTypes) => {
  switch (entryType) {
    case EntryTypes.HealthCheck:
      return (
        <SelectField
          label="Health Check Rating"
          name="healthCheckRating"
          options={ratingOptions}
        />
      );
    case EntryTypes.Hospital:
      return (<>
        <Field
          label="Discharge Date"
          placeholder="YYYY-MM-DD"
          name="dischargeDate"
          component={TextField}
        />
        <Field
          label="Criteria"
          name="dischargeCriteria"
          component={TextField}
        />
      </>);
    case EntryTypes.OccupationalHealthcare:
      return (<></>);
    default:
      return null;
  }
};


export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses, patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnosisList();
  }, [dispatch]);


  return (
    <Formik
      initialValues={{
        description: '',
        specialist: '',
        type: EntryTypes.HealthCheck,
        date: '',
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description || !values.specialist || !values.type || !values.date) errors.name = requiredError;

        if (values.type === EntryTypes.HealthCheck && !values.healthCheckRating) errors.name = requiredError;

        if (values.type === EntryTypes.Hospital && !values.discharge) errors.name = requiredError;

        if (values.type === EntryTypes.OccupationalHealthcare && !values.employerName) errors.name = requiredError;
      }}>
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField label="Type of visit" name="type" options={typeOptions} />
            {loadEntryFields(values.type)}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm; 
