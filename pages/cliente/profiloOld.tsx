import { client } from "../../utils/Shopify-client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../pages/Form.module.css";
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
  Button,
  FormErrorMessage,
  FormHelperText,
  Flex,
} from "@chakra-ui/react";

import * as Yup from "yup";

import { Product } from "../../types";
import NavBar from "../../components/Header";
import { useUser } from "@auth0/nextjs-auth0";
import { options } from "next-auth/client";

export default function Profile() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data: any) => setResult(JSON.stringify(data));
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
  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          {...register("firstName")}
          placeholder="Nome"
        />
        <input
          className={styles.input}
          {...register("lastName")}
          placeholder="Cognome"
        />
        <input
          className={styles.input}
          {...register("DOB")}
          placeholder="Data di nascita"
        />

        <input
          className={styles.input}
          {...register("Phone")}
          placeholder="Telefono"
        />
        <input
          className={styles.input}
          {...register("address1")}
          placeholder="Indirizzo"
        />
        <input className={styles.input} {...register("address2")} />
        <input
          className={styles.input}
          {...register("city")}
          placeholder="Citta`"
        />
        <input
          className={styles.input}
          {...register("country")}
          placeholder="Paese"
        />
        <input
          className={styles.input}
          {...register("zip")}
          placeholder="CAP"
        />

        <select className={styles.select} {...register("category")}>
          {options.map((opt) => {
            return <option key={opt} value={opt}></option>;
          })}
        </select>

        {/* <p>{result}</p> */}
        <input type="submit" />
      </form>
    </div>
  );
}

export async function getServerSideProps() {
  const products = await client.product.fetchAll();
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
