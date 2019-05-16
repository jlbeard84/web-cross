export class Puzzle {
    public data: number[] = [];
    public gridSize: number;

    public rowCounts: number[][] = [];
    public colCounts: number[][] = [];

    constructor(data: number[], gridSize: number) {
        this.data = data;
        this.gridSize = gridSize;

        // split into rows to get row counts
        for (let i = 0; i < gridSize; i++) {
            const rowCount: number[] = [];
            let currentCount: number = 0;

            for (let j = 0; j < gridSize; j++) {
                const index = (i * gridSize) + j;

                if (this.data[index] > 0) {
                    currentCount++;
                } else {
                    if (currentCount > 0) {
                        rowCount.push(currentCount);
                    }

                    currentCount = 0;
                }
            }

            if (rowCount.length === 0) {
                rowCount.push(0);
            }

            this.rowCounts.push(rowCount);
        }

        // split into cols to get col counts
        for (let i = 0; i < gridSize; i++) {
            const colCount: number[] = [];
            let currentCount: number = 0;

            for (let j = 0; j < gridSize; j++) {
                const index = (j * gridSize) + i;

                if (this.data[index] > 0) {
                    currentCount++;
                } else {
                    if (currentCount > 0) {
                        colCount.push(currentCount);
                    }

                    currentCount = 0;
                }
            }

            if (colCount.length === 0) {
                colCount.push(0);
            }

            this.colCounts.push(colCount);
        }
    }
}
