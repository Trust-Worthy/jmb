
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector('.theme-toggle');
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light');
    });

    function toggleMatrix() {
        alert("Matrix toggle placeholder - implement if needed.");
    }

    const canvas = document.getElementById("chessCanvas");
    const ctx = canvas.getContext("2d");
    const tileSize = 50;
    const board = [
        ["r", "n", "b", "q", "k", "b", "n", "r"],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ["R", "N", "B", "Q", "K", "B", "N", "R"]
    ];

    const pieceMap = {
        r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
        R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
    };

    function drawBoard() {
        for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            ctx.fillStyle = (row + col) % 2 === 0 ? "#333" : "#000";
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);

            const piece = board[row][col];
            if (piece) {
            ctx.fillStyle = "#89CFF0";
            ctx.font = "32px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(pieceMap[piece], col * tileSize + tileSize / 2, row * tileSize + tileSize / 2);
            }
        }
        }
    }

    let moveIndex = 0;
    const moves = [
        { from: [6, 4], to: [4, 4] },
        { from: [1, 4], to: [3, 4] },
        { from: [7, 6], to: [5, 5] },
        { from: [0, 1], to: [2, 2] },
        { from: [6, 3], to: [4, 3] },
        { from: [3, 4], to: [4, 3] },
        { from: [5, 5], to: [3, 4] },
        { from: [0, 6], to: [2, 5] },
        { from: [7, 5], to: [4, 2] },
        { from: [1, 3], to: [2, 3] },
        { from: [4, 2], to: [1, 5] },
        { from: [0, 5], to: [3, 2] },
        { from: [7, 3], to: [3, 7] },
        { from: [1, 7], to: [2, 7] },
        { from: [3, 7], to: [1, 7] },
        { from: [0, 4], to: [0, 6] },
        { from: [1, 5], to: [2, 5] },
        { from: [3, 2], to: [2, 3] },
        { from: [1, 7], to: [0, 7] },
        { from: [0, 6], to: [1, 7] }
    ];

    function animateMoves() {
        if (moveIndex >= moves.length) return;
        const move = moves[moveIndex];
        const piece = board[move.from[0]][move.from[1]];
        board[move.from[0]][move.from[1]] = "";
        board[move.to[0]][move.to[1]] = piece;
        drawBoard();
        moveIndex++;
        setTimeout(animateMoves, 1500);
    }

    drawBoard();
    setTimeout(animateMoves, 1500);
});