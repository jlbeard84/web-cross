import { Component } from '@angular/core';

import { Puzzle } from '../../core/models';

@Component({
  selector: 'app-puzzle-grid',
  templateUrl: './puzzle-grid.component.html',
  styleUrls: ['./puzzle-grid.component.scss']
})
export class PuzzleGridComponent {

    public puzzle: Puzzle = null;
    public gridCounter: number[] = [];

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
        this.puzzle = new Puzzle(this.sampleData, 9);

        for (let i = 0; i < this.puzzle.gridSize; i++) {
            this.gridCounter.push(i);
        }
    }
}
