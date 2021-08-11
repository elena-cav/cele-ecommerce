import { client } from "../../utils/Shopify-client";
import Link from "next/link";
import * as api from "../../utils/api";
import {
  Heading,
  Box,
  Image,
  Text,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Select,
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
import styles from "../../pages/Form.module.css";
import { useState } from "react";
export default function Profile() {
  const { user, error, isLoading } = useUser();
  const [province, setProvince] = useState("");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const options = [
    "Agrigento",
    "Alessandria",
    "Ancona",
    "Aosta",
    "L'Aquila",
    "Arezzo",
    " Ascoli-Piceno",
    "Asti",
    "Avellino",
    "Bari",
    "Barletta-Andria-Trani",
    "Belluno",
    "Benevento",
    "Bergamo",
    "Biella",
    "Bologna",
    "Bolzano",
    "Brescia",
    "Brindisi",
    "Cagliari",
    "Caltanissetta",
    "Campobasso",
    "Carbonia Iglesias",
    "Caserta",
    "Catania",
    "Catanzaro",
    "Chieti",
    "Como",
    "Cosenza",
    "Cremona",
    "Crotone",
    "Cuneo",
    "Enna",
    "Fermo",
    "Ferrara",
    "Firenze",
    "Foggia",
    "Forli-Cesena",
    "Frosinone",
    "Genova",
    "Gorizia",
    "Grosseto",
    "Imperia",
    "Isernia",
    "La-Spezia",
    "Latina",
    "Lecce",
    "Lecco",
    "Livorno",
    "Lodi",
    "Lucca",
    "Macerata",
    "Mantova",
    "Massa-Carrara",
    "Matera",
    "Medio Campidano",
    "Messina",
    "Milano",
    "Modena",
    "Monza-Brianza",
    "Napoli",
    "Novara",
    "Nuoro",
    "Ogliastra",
    "Olbia Tempio",
    "Oristano",
    "Padova",
    "Palermo",
    "Parma",
    "Pavia",
    "Perugia",
    "Pesaro-Urbino",
    "Pescara",
    "Piacenza",
    "Pisa",
    "Pistoia",
    "Pordenone",
    "Potenza",
    "Prato",
    "Ragusa",
    "Ravenna",
    "Reggio-Calabria",
    "Reggio-Emilia",
    "Rieti",
    "Rimini",
    "Roma",
    "Rovigo",
    "Salerno",
    "Sassari",
    "Savona",
    "Siena",
    "Siracusa",
    "Sondrio",
    "Taranto",
    "Teramo",
    "Terni",
    "Torino",
    "Trapani",
    "Trento",
    "Treviso",
    "Trieste",
    "Udine",
    "Varese",
    "Venezia",
    "Verbania",
    "Vercelli",
    "Verona",
    " Vibo-Valentia",
    "Vicenza",
    "Viterbo",
  ];
  const initialValues = {
    firstName: "",
    lastName: "",
    notes: "",
    select: "",
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = (values: any) => {
    sleep(300).then(() => {
      console.log(user, "USER");
      const newCostumer = {
        customer: {
          first_name: values.firstName,
          last_name: values.lastName,
          email: user.name,
          phone: values.phone,
          verified_email: true,
          addresses: [
            {
              address1: values.address1,
              city: values.city,
              province: province,
              zip: values.zip,
              country: values.country,
            },
          ],
          send_email_welcome: false,
        },
      };
      api.postCostumer(newCostumer).catch((err) => {
        console.log(err);
      });
    });
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Inserisci il tuo nome"),
    lastName: Yup.string().required("Inserisci il tuo cognome"),
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProvince(event.target.value);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors }) => (
        <Box
          borderWidth="1px"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={800}
          p={6}
          m="10px auto"
          as="form"
          onSubmit={handleSubmit as any}
        >
          <InputControl name="firstName" label="Nome" />
          <InputControl
            borderRadius={0}
            border="none"
            name="lastName"
            label="Cognome"
          />
          <InputControl
            inputProps={{ type: "date" }}
            name="DOB"
            borderRadius={0}
            label="Data di nascita"
          />
          <InputControl
            rounded="0"
            borderRadius={0}
            name="phone"
            label="Telefono"
          />
          <Spacer />
          <InputControl name="address1" label="Indirizzo" />
          <InputControl
            style={{ borderRadius: 0, border: "none" }}
            name="address2"
          />
          <InputControl name="city" label="Citta`" />
          <FormLabel>Provincia</FormLabel>
          <Select
            value={province}
            label="Provincia"
            name="province"
            onChange={handleChange}
          >
            {options.map((opt) => {
              return <option key={opt}>{opt}</option>;
            })}
          </Select>
          <InputControl style={{ borderRadius: 0 }} name="zip" label="CAP" />
          <InputControl
            style={{ borderRadius: 0 }}
            name="country"
            label="Paese"
          />
          <SubmitButton style={{ borderRadius: 0 }}>Submit</SubmitButton>
        </Box>
      )}
    </Formik>
  );
}

export async function getServerSideProps() {
  const products = await client.product.fetchAll();
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
