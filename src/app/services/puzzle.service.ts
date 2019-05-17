import { Injectable } from 'ngx-onsenui';
import { PuzzleData, PuzzleDataHeader } from '../models';

import Puzzle1 from '../data/puzzle-1.json';
import Puzzle2 from '../data/puzzle-2.json';

@Injectable()
export class PuzzleService {
    private puzzleData: PuzzleData[] = [];

    public getPuzzleList(): PuzzleDataHeader[] {
        const headers: PuzzleDataHeader[] = [];

        this.populatePuzzleData();

        for (const data of this.puzzleData) {
            headers.push(data);
        }

        return headers;
    }

    public getPuzzleData(id: string): PuzzleData {
        this.populatePuzzleData();

        for (const puzzleData of this.puzzleData) {
            if (puzzleData.id === id) {
                return puzzleData;
            }
        }

        return null;
    }

    private populatePuzzleData(): void {
        if (!this.puzzleData || this.puzzleData.length === 0) {
            this.puzzleData = [];
            this.puzzleData.push(this.loadIntoPuzzleData(Puzzle1));
            this.puzzleData.push(this.loadIntoPuzzleData(Puzzle2));
        }
    }

    private loadIntoPuzzleData(puzzleFile: any): PuzzleData {
        const puzzleData: PuzzleData = puzzleFile as PuzzleData;
        return puzzleData;
    }
}
