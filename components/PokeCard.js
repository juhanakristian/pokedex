import React, { useState, useEffect } from "react";
import useSWR from "swr";

import { find, map } from "lodash";

async function getPokemon(key) {
  const response = await fetch(`https://pokeapi.co/${key}`);
  return await response.json();
}

function capitalize(input) {
  return input[0].toUpperCase() + input.slice(1);
}

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

export default function PokeCard({ pokemon }) {
  const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`;
  const name = capitalize(pokemon.name);

  const mainTypes = Object.keys(colors);
  const types = map(pokemon.types, (t) => t.type.name);
  const pokemonType = find(mainTypes, (t) => types.indexOf(t) > -1);
  const color = colors[pokemonType];

  return (
    <div
      style={{ backgroundColor: color }}
      className="flex flex-wrap justify-center w-48 p-5 shadow-lg h-84 rounded-4xl"
    >
      <div className="flex w-40 h-40 bg-white bg-opacity-50 rounded-full">
        <img
          className="w-full h-full p-1 mt-5"
          src={imageUrl}
          alt={pokemon.name}
        />
      </div>
      <div>
        <div className="p-1 pl-2 pr-2 mt-4 ml-8 mr-8 text-sm text-center bg-gray-800 bg-opacity-25 rounded-xl">
          #{pokemon.id.toString().padStart(3, "0")}
        </div>
        <div className="mt-1 text-center">{name}</div>
        <div className="mt-1 text-xs text-center">Type: {pokemonType}</div>
      </div>
    </div>
  );
}
