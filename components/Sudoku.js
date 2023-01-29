import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export function Sudoku() {
  // Create an empty 9x9 grid
  const [grid, setGrid] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(""))
  );

  const [selectedCell, setSelectedCell] = useState([0, 0]);

  // Helper function to check if a number is valid in a given cell
  function isValid(grid, row, col, num) {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num) {
        return false;
      }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === num) {
        return false;
      }
    }

    // Check 3x3 subgrid
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }

    return true;
  }

  // Helper function to generate a new puzzle
  function generatePuzzle() {
    let newGrid = Array(9)
      .fill()
      .map(() => Array(9).fill(""));

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let count = 0;
    while (count < 40) {
      let randomRow = Math.floor(Math.random() * 9);
      let randomCol = Math.floor(Math.random() * 9);

      if (!newGrid[randomRow][randomCol]) {
        let randomIndex = Math.floor(Math.random() * numbers.length);
        let randomNum = numbers[randomIndex];

        if (isValid(newGrid, randomRow, randomCol, randomNum)) {
          newGrid[randomRow][randomCol] = randomNum;
          count++;
        }
      }
    }
    console.log("🚀 ~ file: Sudoku.js:47 ~ generatePuzzle ~ newGrid", newGrid);
    setGrid(newGrid);
  }

  function handleSelect(row, col) {
    setSelectedCell([row, col]);
  }

  function handleInput(num) {
    let row = selectedCell[0];
    let col = selectedCell[1];
    if (isValid(grid, row, col, num)) {
      let newGrid = [...grid];
      newGrid[row][col] = num;
      setGrid(newGrid);
    }
  }

  function isEditable(row, col) {
    let newGrid = grid;

    if (newGrid[row][col] !== "") {
      return false;
    }

    return true;
  }

  useEffect(() => {
    generatePuzzle();
  }, []);

  return (
    <View style={styles.container}>
      {grid.map((row, i) => (
        <View style={styles.row} key={i}>
          {row.map((element, j) => (
            <View
              style={[
                styles.cell,
                selectedCell[0] === i && selectedCell[1] === j
                  ? styles.selectedCell
                  : null,
              ]}
              key={j}
              onPress={() => handleSelect(i, j)}
            >
              <TextInput
                style={styles.cellText}
                value={element || ""}
                onChangeText={(text) => handleInput(text, i, j)}
                keyboardType="number-pad"
                maxLength={1}
                editable={isEditable(i, j)}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  selectedCell: {
    backgroundColor: "lightgray",
  },
  cellText: {
    fontSize: 30,
  },
});
