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
    email: user ? user.name : "",
    notes: "",
    select: "",
  };

  const today = new Date();
  const onSubmit = () => {
    console.log("submit");
  };

  const validationSchema = Yup.object({
    Nome: Yup.string().required("Completa il nome"),
    lastName: Yup.string().required("Completa il cognome"),
    DOB: Yup.number().max(today),
    email: Yup.string().email(),
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
          {/* <CheckboxSingleControl name="emailcb">
            Modifica l'Email
          </CheckboxSingleControl> */}
          <Input name="email" label="Email" />
          <CheckboxSingleControl name="password">
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
