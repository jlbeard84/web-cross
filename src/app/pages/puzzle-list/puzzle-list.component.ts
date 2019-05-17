import { Component, OnInit } from '@angular/core';

import { PuzzleService } from '../../services';
import { PuzzleDataHeader } from 'src/app/models';

@Component({
  selector: 'app-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.scss']
})
export class PuzzleListComponent implements OnInit {

    public isLoading: boolean = false;
    public puzzleHeaders: PuzzleDataHeader[] = [];

    constructor(
        private puzzleService: PuzzleService
    ) { }

    public ngOnInit(): void {
        this.isLoading = true;
        this.puzzleHeaders = this.puzzleService.getPuzzleList();
        this.isLoading = false;
    }

    public openPuzzle(puzzle: PuzzleDataHeader): void {
        console.log(puzzle);
    }
}
