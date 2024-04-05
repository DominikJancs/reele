const thoughtsContent = document.querySelector('.thoughts_content');

// Gondolatok generálása és hozzáadása a gondolatok tartalomhoz
function generateThought(data) {
    // A gondolat időbélyegének formázása
    const thoughtTime = new Date(data.thoughted).toLocaleString(),
    // Az oldalfejléc indexeinek lekérdezése
          headerIndexes = document.querySelector('#header-pages').getAttribute('data-pages');

          // Az új gondolat HTML kódja
    const newThought = `
    <div class="thoughts_item">
        <div class="thought_row">
        <div class="user_thought_inf">
            <div class="usericon" style='background-image: url("http://192.168.0.143:8000/users/profilepicture/${data.username}")' alt="${data.description}" title="${data.description}"></div>
            <div class="thought_inf">
                <label class="thought_username" for="">${data.username}</label>
                <p class="thought_thoughted">${thoughtTime}</p>
            </div>
        </div>
        ${data.pageIndex > 0 ? '<div class="page_index"><div class="indexBX" data-pages="'+data.pageIndex+'">'+data.pageIndex+'/'+headerIndexes+'</div></div>' : "" }
        </div>
        <div class="thought_row">
            <div class="contextBX">
                <label class="thought_context" for="">${data.text}</label>
            </div>
            <div class="voteBX">
                <button data-vote="-1" data-thought="${data.thought}" class="${data.vote < 0 ? 'downVoteBT downVoteAct' : 'downVoteBT'}"></button>
                <label data-thought-dsp="${data.thought}" class="voteCount" for="">${data.votes}</label>
            <button data-vote="1" data-thought="${data.thought}" class="${data.vote > 0 ? 'upVoteBT upVoteAct' : 'upVoteBT'}"></button>
        </div>
        </div>
    </div>
    <span class="line-vertical"></span>
    `;

    // Az új gondolat hozzáadása a gondolatok tartalmához
    thoughtsContent.innerHTML += newThought;
}

// Gondolatok eltávolítása a gondolatok tartalmából
function removeThought() {
    // Gondolatok és a hozzájuk tartozó függőleges vonalak kiválasztása
    var thoughtItem = document.querySelectorAll('.thoughts_item');
    var verticalLines = document.querySelectorAll('.line-vertical');
    // Az összes gondolat és függőleges vonal eltávolítása
    thoughtItem.forEach(element => {
        element.remove();
    });
    verticalLines.forEach(element => {
        element.remove();
    });
}