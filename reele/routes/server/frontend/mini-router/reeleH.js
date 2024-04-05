// Eseményfigyelő hozzáadása a reeleBTstatic gombhoz, ami elindítja a reeleAction-t.
reeleBTstatic.addEventListener('click', (event) => {
    reeleAction(event.target);
});