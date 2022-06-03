import { BUZZWORDS } from "./buzzwords.js"
const BINGO_SIZE = 5

const generateBingo = () => {
  let word_universe = [...BUZZWORDS]

  let bingo_board = []

  while (bingo_board.length < Math.pow(BINGO_SIZE, 2)) {
    bingo_board.push(
      word_universe.splice(Math.floor(Math.random() * word_universe.length), 1)
    )
  }

  bingo_board[Math.floor((BINGO_SIZE * BINGO_SIZE) / 2)] = "FREE"

  $("table").empty()

  let label
  for (let i = 0; i < BINGO_SIZE; i++) {
    let row = "<tr>"
    for (let j = 0; j < BINGO_SIZE; j++) {
      label = bingo_board[i * BINGO_SIZE + j]
      row += `<td class="${label === "FREE" ? "active" : ""}">${label}</td>`
    }

    $("table").append(`${row}</tr>`)
  }
}

$(document).ready(function () {
  // TODO - Either store/click in local storage or make printable

  generateBingo()

  $("h1").click(() => {
    if (confirm("Are you sure you want to generate a new bingo board?")) {
      generateBingo()
    }
  })
})
