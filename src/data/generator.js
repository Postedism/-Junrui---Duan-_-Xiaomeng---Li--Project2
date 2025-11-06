import SudokuGenerator from '../utils/SudokuGenerator';

// Cells to KEEP
const DIFFICULTY_LEVELS = {
    easy: { size: 6, cellsToKeep: 18 }, // 6x6 
    normal: { size: 9, cellsToKeep: 30 }, // 9x9 
};


/**
 * @param {string} mode - 'easy' or 'normal'
 * @returns {{puzzle: number[][], solution: number[][]}}
 */
export const getPuzzle = (mode = 'normal') => {
    const level = DIFFICULTY_LEVELS[mode] || DIFFICULTY_LEVELS['normal'];
    
    
    const generator = new SudokuGenerator(level.size);
    
    return generator.generate(level.cellsToKeep);
};