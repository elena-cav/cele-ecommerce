import { client } from "../../utils/Shopify-client";
import Link from "next/link";
import {
  Heading,
  Box,
  Image,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  CheckboxContainer,
  CheckboxControl,
  CheckboxSingleControl,
  InputControl,
  NumberInputControl,
  PercentComplete,
  RadioGroupControl,
  ResetButton,
  SelectControl,
  SliderControl,
  SubmitButton,
  SwitchControl,
  TextareaControl,
} from "formik-chakra-ui";
import * as Yup from "yup";

import { Product } from "../../types";
import NavBar from "../../components/Header";
import { useUser } from "@auth0/nextjs-auth0";
import { Formik } from "formik";
import { parse, isDate } from "date-fns";

export default function Profile() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const initialValues = {
    firstName: "",
    lastName: "",
    age: 0,
    employed: false,
    favoriteColor: "",
    toppings: ["tuna"],
    notes: "",
    employedd: false,
    select: "",
    foo: 23,
    bar: "",
  };

  const today = new Date();

  // function parseDateString(value, originalValue) {
  //   const parsedDate = isDate(originalValue)
  //     ? originalValue
  //     : parse(originalValue, "yyyy-MM-dd", new Date());

  //   return parsedDate;
  // }

  // const schema = Yup.object({
  //   birthday: Yup.date().transform(parseDateString).max(today),
  // });

  // const isValid = schema.validateSync({
  //   birthday: "2020-02-02",
  // });
  const onSubmit = () => {
    console.log("submit");
  };

  const validationSchema = Yup.object({
    Nome: Yup.string().required(),
    lastName: Yup.string().required(),
    DOB: Yup.number().required().max(today),
    email: Yup.string().email().required(),
    password: Yup.boolean().equals([true]),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors }) => (
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={800}
          p={6}
          m="10px auto"
          as="form"
          onSubmit={handleSubmit as any}
        >
          <InputControl name="firstName" label="Nome" />
          <InputControl name="lastName" label="Cognome" />
          <Input type="date" name="DOB" label="Data di nascita" />
          <InputControl name="Email" label="Email" />

          <CheckboxSingleControl name="employed">
            Modifica la Password
          </CheckboxSingleControl>
        </Box>
      )}
    </Formik>
  );
}

export async function getServerSideProps() {
  const products = await client.product.fetchAll();
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
