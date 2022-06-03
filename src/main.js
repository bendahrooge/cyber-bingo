import { BUZZWORDS } from "./buzzwords.js"
const BINGO_SIZE = 5

const renderBingo = (board) => {
  $("table").empty()

  let label
  let isActive
  for (let i = 0; i < BINGO_SIZE; i++) {
    let row = "<tr>"
    for (let j = 0; j < BINGO_SIZE; j++) {
      label = board[i * BINGO_SIZE + j].term
      isActive =
        label === "FREE" ? true : false || board[i * BINGO_SIZE + j].flipped
      row += `<td data-idx="${i * BINGO_SIZE + j}" class="${
        isActive ? "active" : ""
      }">${label}</td>`
    }

    $("table").append(`${row}</tr>`)
  }
}

const generateBingo = () => {
  let word_universe = [...BUZZWORDS]

  let bingo_board = []

  while (bingo_board.length < Math.pow(BINGO_SIZE, 2)) {
    bingo_board.push(
      word_universe.splice(
        Math.floor(Math.random() * word_universe.length),
        1
      )[0]
    )
  }

  // Set the middle as a free space
  bingo_board[Math.floor(BINGO_SIZE ** 2 / 2)] = "FREE"

  let bingo_data = bingo_board.map((term) => ({
    flipped: term === "FREE" ? true : false,
    term,
  }))

  localStorage.setItem("bingo", JSON.stringify(bingo_data))
  return bingo_data
}

$(document).ready(function () {
  if (!localStorage.getItem("bingo")) {
    renderBingo(generateBingo())
  } else {
    renderBingo(JSON.parse(localStorage.getItem("bingo")))
    $(".alert").hide()
  }

  $("h1").click(() => {
    if (confirm("Are you sure you want to generate a new bingo board?")) {
      renderBingo(generateBingo())
    }
  })

  $("td").click((tile) => {
    $(tile.target).toggleClass("active")

    let bingo_data = JSON.parse(localStorage.getItem("bingo"))

    bingo_data[$(tile.target).attr("data-idx")].flipped = $(
      tile.target
    ).hasClass("active")

    localStorage.setItem("bingo", JSON.stringify(bingo_data))
  })
})
