import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export function Sudoku() {
  // Create an empty 9x9 grid
  const [grid, setGrid] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(null))
  );

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
  function generatePuzzle(grid, row, col) {
    if (row === 9) {
      setGrid(grid);
      return true;
    }

    if (grid[row][col]) {
      if (col === 8) {
        return generatePuzzle(grid, row + 1, 0);
      } else {
        return generatePuzzle(grid, row, col + 1);
      }
    }

    for (let num = 1; num <= 9; num++) {
      if (isValid(grid, row, col, num)) {
        grid[row][col] = num;
        if (col === 8) {
          if (generatePuzzle(grid, row + 1, 0)) {
            return true;
          }
        } else {
          if (generatePuzzle(grid, row, col + 1)) {
            return true;
          }
        }
        grid[row][col] = null;
      }
    }

    return false;
  }

  useEffect(() => {
    generatePuzzle(grid, 0, 0);
  }, []);

  return <View style={styles.container}>{console.log(grid)}</View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

});
