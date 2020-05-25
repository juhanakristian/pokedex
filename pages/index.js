// @ts-nocheck
import React, { useEffect, useState } from "react";
import Head from "next/head";

import { range, reduce } from "lodash";

import PokeCard from "../components/PokeCard";

export async function getStaticProps(context) {
  let pokemons = [];
  for (const id of range(1, 150)) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    pokemons.push(pokemon);
  }

  return {
    props: {
      pokemons,
    },
  };
}

export default function Home({ pokemons }) {
  const pokecards = pokemons.map((pokemon) => (
    <PokeCard key={pokemon.id} pokemon={pokemon} />
  ));

  return (
    <div>
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <main className="p-5">
        <div className="flex justify-center">
          <h1 className="flex block text-4xl align-middle">PokeDex</h1>
        </div>
        <div className="grid grid-cols-1 gap-12 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pokecards}
        </div>
      </main>

      <footer></footer>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div,
        div#__next > div > div {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: "Lato";
          margin: 0;
          box-sizing: border-box;
        }
        html {
          background: #efefbb;
          background: linear-gradient(to right, #d4d3dd, #efefbb);
        }
      `}</style>
    </div>
  );
}
