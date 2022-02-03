import React from "react";
import * as yup from "yup";
import { useRouter } from "next/router";
import { FormikHelpers } from "formik";
import { useMutation } from "react-query";
import { useTranslation } from "next-i18next";
import { AxiosError, AxiosResponse } from "axios";
import { Button, Grid, Typography } from "@mui/material";

import { CityFormData, CityInput, CityResponse } from "gql/city";
import { editCity } from "common/rest";
import { AlertStore } from "../layout/NotificationsAlert/AlertStore";
import GenericForm from "components/common/form/GenericForm";
import SubmitButton from "components/common/form/SubmitButton";
import FormTextField from "components/common/form/FormTextField";
import BootcampersLayout from "../layout/Layout";
import { ApiErrors, isAxiosError, matchValidator } from "common/api-errors";
import { useViewCity } from "common/hooks/city";
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

export default function EditBootcamper({
  initialValues = defaults,
}: CityFormProps) {
  const theme = useTheme();

  const router = useRouter();
  const id = window.location.pathname.split("/")[3];

  const editWrapper = (id: string) => {
    return async (values: CityFormData) => {
      return editCity(id, values);
    };
  };

  const info = useViewCity(id);

  if (!info.isLoading) {
    initialValues.countryId = info.data?.countryId || "";
    initialValues.name = info.data?.name || "";
    initialValues.postalCode = info.data?.postalCode || 0;
  }

  const { t } = useTranslation();

  const mutation = useMutation<
    AxiosResponse<CityResponse>,
    AxiosError<ApiErrors>,
    CityInput
  >({
    mutationFn: editWrapper(id),
    onError: () => AlertStore.show(t("common:alerts.error"), "error"),
    onSuccess: () =>
      AlertStore.show(t("common:alerts.message-sent"), "success"),
  });

  const onSubmit = async (
    values: CityFormData,
    { setFieldError, resetForm }: FormikHelpers<CityFormData>
  ) => {
    try {
      await mutation.mutateAsync(values);
      resetForm();
      AlertStore.show("Successfully edited city", "success");
      router.push("/city");
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
          <Typography variant="h5" component="h2">
            Edit info
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
                value={initialValues.name}
              />
            </Grid>
            <Grid item sm={5}>
              <FormTextField
                style={{ marginTop: "2%", width: "80%" }}
                type="text"
                name="countryId"
                autoComplete="target-amount"
                label="Country"
                value={initialValues.countryId}
              />
            </Grid>
            <Grid item sm={5}>
              <FormTextField
                style={{ marginTop: "2%", width: "80%" }}
                type="number"
                name="postalCode"
                autoComplete="target-amount"
                label="Postal code"
                value={initialValues.postalCode}
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
                label="Edit city"
                loading={mutation.isLoading}
                sx={{ backgroundColor: theme.palette.secondary.main }}
              />
              <Button
                href="/city"
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
            <Grid item xs={12}></Grid>
          </Grid>
        </GenericForm>
      </Grid>
    </BootcampersLayout>
  );
}
