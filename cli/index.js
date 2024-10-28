#!/usr/bin/env node

const yargs = require('yargs');
const inquirer = require('inquirer');

async function fetchPokemonList() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=4");
    const data = await response.json();
    return data.results;
}

async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    return response.json();
}

async function choosePokemon() {
    const pokemonList = await fetchPokemonList();
    const choices = pokemonList.map(p => ({ name: p.name, value: p.url }));

    const { pokemon } = await inquirer.prompt([
        {
            type: 'list',
            name: 'pokemon',
            message: 'Choose your Pokemon:',
            choices
        }
    ]);

    return fetchPokemonDetails(pokemon);
}

function selectMoves(moves) {
    return moves
        .slice(0, 5)
        .map(move => ({
            name: move.move.name,
            url: move.move.url
        }));
}

function ChooseMove(moves) {
    return moves[Math.floor(Math.random() * moves.length)];
}

async function fetchMoveDetails(moves) {
    const movePromises = moves.map(move => fetch(move.url).then(res => res.json()));
    return Promise.all(movePromises);
}


async function main() {
    console.log("Welcome to the Pokemon CLI Battle Game!");
    const player1Pokemon = await choosePokemon();
    console.log('palyer 1 choose : ' + player1Pokemon.name);
    const player2Pokemon = await choosePokemon();
    console.log('player 2 choose : ' + player2Pokemon.name);

    const player1Moves = selectMoves(player1Pokemon.moves);
    const player2Moves = selectMoves(player2Pokemon.moves);
    const [player1MoveDetails, player2MoveDetails] = await Promise.all([
        fetchMoveDetails(player1Moves),
        fetchMoveDetails(player2Moves)
    ]);

    //battle
    let player1HP = 300;
    let player2HP = 300;

    console.log('Battle starts ' + player1Pokemon.name +' vs ' + player2Pokemon.name);

    while (player1HP > 0 && player2HP > 0) {

        const player1Move = ChooseMove(player1MoveDetails);
        const player2Move = ChooseMove(player2MoveDetails);

        if (player1Move.pp > player2Move.pp){
            player2HP -= player1Move.power
        }
        else{
            player1HP -= player2Move.power
        }
    }

    if (player1HP <= 0) {
        console.log('Player 1 wins!');
    } else {
        console.log('Player 2 wins!');
    }

}

yargs
    .command('start', 'Start the Pokemon battle game', {}, main)
    .demandCommand(1, 'You need at least one command before moving on')
    .help()
    .argv;