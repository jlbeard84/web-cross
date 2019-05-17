import { Injectable } from 'ngx-onsenui';
import { PuzzleData, PuzzleDataHeader } from '../models';

import Puzzle1 from '../data/puzzle-1.json';

@Injectable()
export class PuzzleService {
    private puzzleData: PuzzleData[] = [];

    public getPuzzleList(): PuzzleDataHeader[] {
        const headers: PuzzleDataHeader[] = [];

        if (!this.puzzleData || this.puzzleData.length === 0) {
            this.puzzleData.push(this.loadIntoPuzzleData(Puzzle1));
        }

        for (const data of this.puzzleData) {
            headers.push(data);
        }

        return headers;
    }

    private loadIntoPuzzleData(puzzleFile: any): PuzzleData {
        const puzzleData: PuzzleData = puzzleFile as PuzzleData;
        return puzzleData;
    }
}
