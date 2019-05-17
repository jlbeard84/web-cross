import { Component, OnInit } from '@angular/core';

import { Puzzle, PuzzleGridItem } from '../../models';

@Component({
  selector: 'app-puzzle-grid',
  templateUrl: './puzzle-grid.component.html',
  styleUrls: ['./puzzle-grid.component.scss']
})
export class PuzzleGridComponent implements OnInit {

    public isLoading: boolean = false;

    public puzzle: Puzzle = null;
    public gridCounter: number[] = [];
    public puzzleGrid: PuzzleGridItem[] = [];
    public totalDrawableCount: number;
    public remainingDrawableCount: number;
    public missCount: number;

    private readonly sampleData = [
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 0, 0, 0, 1, 1, 0,
        0, 1, 1, 0, 0, 0, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    constructor() {
    }

    public ngOnInit(): void {
        this.isLoading = true;
        this.loadPuzzle();
        this.isLoading = false;
    }

    public onCellClick(rowNum: number, colNum: number): void {
        const cell = this.getCellByRowAndCol(rowNum, colNum);

        if (cell.isSelected) {
            return;
        }

        if (cell.isDrawable) {
            this.remainingDrawableCount--;
        } else {
            this.missCount++;
        }

        cell.isSelected = true;
    }

    public isDrawn(rowNum: number, colNum: number): boolean {
        const cell = this.getCellByRowAndCol(rowNum, colNum);

        return cell.isSelected && cell.isDrawable;
    }

    public isMissed(rowNum: number, colNum: number): boolean {
        const cell = this.getCellByRowAndCol(rowNum, colNum);

        return cell.isSelected && !cell.isDrawable;
    }

    private getCellByRowAndCol(rowNum: number, colNum: number): PuzzleGridItem {
        const index = (rowNum * this.puzzle.gridSize) + colNum;
        return this.puzzleGrid[index];
    }

    private loadPuzzle(): void {
        this.puzzle = new Puzzle(this.sampleData, 9);

        for (let i = 0; i < this.puzzle.gridSize; i++) {
            this.gridCounter.push(i);
        }

        this.puzzleGrid = [];
        this.totalDrawableCount = 0;
        this.remainingDrawableCount = 0;
        this.missCount = 0;

        for (const puzzleData of this.puzzle.data) {
            const gridItem = new PuzzleGridItem();

            if (puzzleData > 0) {
                gridItem.isDrawable = true;
                this.totalDrawableCount++;
            }

            this.puzzleGrid.push(gridItem);
        }
    }
}
