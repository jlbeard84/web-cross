import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Puzzle, PuzzleGridItem, PuzzleData } from '../../models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PuzzleService } from 'src/app/services';

@Component({
  selector: 'app-puzzle-grid',
  templateUrl: './puzzle-grid.component.html',
  styleUrls: ['./puzzle-grid.component.scss']
})
export class PuzzleGridComponent implements OnInit, OnDestroy {

    public isLoading: boolean = false;

    public puzzleData: PuzzleData = null;
    public puzzle: Puzzle = null;
    public gridCounter: number[] = [];
    public puzzleGrid: PuzzleGridItem[] = [];
    public totalDrawableCount: number;
    public remainingDrawableCount: number;
    public missCount: number;
    public elapsedTimeDisplay: string = '0:00';

    private elapsedTime: number = 0;
    private timer: Observable<number> = null;
    private timerSubscription: Subscription = null;

    private puzzleId: string = '';

    constructor(
        private route: ActivatedRoute,
        private puzzleService: PuzzleService
    ) { }

    public ngOnInit(): void {
        this.isLoading = true;

        const puzzleId$ = this.route.paramMap.pipe(
            map((params: ParamMap) =>
              params.get('id'))
        );

        puzzleId$.subscribe((id: string) => {
            this.puzzleData = this.puzzleService.getPuzzleData(id);

            if (!this.puzzleData) {
                this.isLoading = false;
                return;
            }

            this.loadPuzzle();
            this.isLoading = false;

            this.startTimer();
        });
    }

    public ngOnDestroy(): void {
        this.stopTimer();
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

        if (this.remainingDrawableCount === 0) {
            this.stopTimer();
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

    private startTimer(): void {

        if (!this.timer && !this.timerSubscription) {
            this.timer = timer(1000, 1000);

            this.timerSubscription = this.timer.subscribe((val) => {
                this.elapsedTime = val + 1;

                const time = this.elapsedTime;
                const minutes = Math.floor(time / 60);
                const seconds = time - minutes * 60;

                let display = `${minutes}:`;

                if (seconds < 10) {
                    display = `${display}0`;
                }

                display = `${display}${seconds}`;

                this.elapsedTimeDisplay = display;
            });
        }
    }

    private stopTimer(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            this.timerSubscription = null;
        }

        if (this.timer) {
            this.timer = null;
        }
    }

    private getCellByRowAndCol(rowNum: number, colNum: number): PuzzleGridItem {
        const index = (rowNum * this.puzzle.gridSize) + colNum;
        return this.puzzleGrid[index];
    }

    private loadPuzzle(): void {
        this.puzzle = new Puzzle(this.puzzleData.data, this.puzzleData.size);

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

        this.remainingDrawableCount = this.totalDrawableCount;
    }
}
