import React from "react";
import * as yup from "yup";
import { useRouter } from "next/router";
import { FormikHelpers } from "formik";
import { useMutation } from "react-query";
import { useTranslation } from "next-i18next";
import { AxiosError, AxiosResponse } from "axios";
import { Button, Grid, Typography } from "@mui/material";

import { CityFormData, CityInput, CityResponse } from "gql/city";
import { createCity } from "common/rest";
import { AlertStore } from "./layout/NotificationsAlert/AlertStore";
import GenericForm from "components/common/form/GenericForm";
import SubmitButton from "components/common/form/SubmitButton";
import FormTextField from "components/common/form/FormTextField";
import { ApiErrors, isAxiosError, matchValidator } from "common/api-errors";
import BootcampersLayout from "./layout/Layout";
import { useTheme } from "@mui/styles";

const validationSchema: yup.SchemaOf<CityFormData> = yup
  .object()
  .defined()
  .shape({
    countryId: yup.string().required(),
    name: yup.string().required(),
    postalCode: yup.number().required(),
  });

const defaults: CityFormData = {
  countryId: "",
  name: "",
  postalCode: 0,
} as CityFormData;

export type CityFormProps = { initialValues?: CityFormData };

export default function CreateBootcamper({
  initialValues = defaults,
}: CityFormProps) {
  const [vals, setVals] = React.useState<CityFormData>(defaults);
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const requestWrapper = (data: CityInput | null) => {
    return async () => {
      return createCity(data as CityInput);
    };
  };

  const mutation = useMutation<
    AxiosResponse<CityResponse>,
    AxiosError<ApiErrors>,
    CityInput
  >({
    mutationFn: requestWrapper(vals),
    onError: () => AlertStore.show(t("common:alerts.error"), "error"),
    onSuccess: () =>
      AlertStore.show(t("common:alerts.message-sent"), "success"),
  });

  const onSubmit = async (
    values: CityFormData,
    { setFieldError, resetForm }: FormikHelpers<CityFormData>
  ) => {
    try {
      setVals(values);
      await mutation.mutateAsync(vals as CityFormData);
      resetForm();
      router.push("/city");
      AlertStore.show("Successfully added new city", "success", 1);
    } catch (error) {
      console.error(error);
      AlertStore.show("An error occured", "error");
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>;
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)));
        });
      }
    }
  };

  return (
    <BootcampersLayout>
      <Grid
        container
        direction="column"
        component="section"
        style={{ marginLeft: "10%" }}
      >
        <Grid item xs={12} style={{ marginTop: "10%" }}>
          <Typography
            variant="h5"
            component="h2"
            style={{ marginBottom: "1%" }}
          >
            Add town
          </Typography>
        </Grid>
        <GenericForm
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Grid container spacing={1}>
            <Grid item sm={5}>
              <FormTextField
                style={{ marginTop: "2%", width: "80%" }}
                type="text"
                name="name"
                autoComplete="target-amount"
                label="City"
              />
            </Grid>
            <Grid item sm={5}>
              <FormTextField
                style={{ marginTop: "2%", width: "80%" }}
                type="text"
                name="countryId"
                autoComplete="target-amount"
                label="Country"
              />
            </Grid>
            <Grid item sm={5}>
              <FormTextField
                style={{ marginTop: "2%", width: "80%" }}
                type="number"
                name="postalCode"
                autoComplete="target-amount"
                label="Postal code"
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15%",
                marginTop: "1.1%",
              }}
            >
              <SubmitButton
                style={{ width: "50%" }}
                label="Add city"
                loading={mutation.isLoading}
                sx={{ backgroundColor: theme.palette.secondary.main }}
              />
              <Button
                onClick={() => {
                  router.push("/city");
                }}
                variant="outlined"
                sx={{
                  width: "50%",
                  marginTop: "1%",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.default,
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </GenericForm>
      </Grid>
    </BootcampersLayout>
  );
}
