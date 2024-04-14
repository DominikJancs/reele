function generateFlagedPost(data, club) {
    const clubPost = document.querySelector(`#club_post_${club}`);
    const newFlagedPost = `
    <div class="post-mini-item" data-post-id data-post="${data.documentname}">
        <div style="background-image: url('http://localhost:8000/posts/cover/${data.documentname}')" class="post-mini-cover" data-reele="${data.documentname}">
        <div id="post-mini-action-${data.postID}" class="post-mini-action la-closed-vertical">
            <div class="post-mini-action-r">
                <p id="post-mini-title-${data.postID}"></p>
            </div>
            <div class="post-mini-action-r">
                <div class="post-mini-bt unaccept" data-post="${data.postID}"></div>
                <div id="post-mini-accept-${data.postID}" class="post-mini-bt accept" data-post="${data.postID}" data-method=""></div>
            </div>
        </div>
        <div class="post-mini-interact">
            <div class="post-mini-bt check" data-post="${data.postID}"></div>
            <div class="post-mini-bt denial" data-post="${data.postID}"></div>
        </div>
        <div class="post-mini-lin-flags">
        <p>Has: ${data.flags}</p>
        <div class="la-flag-mini"></div>
        </div>
        </div>
        <p class="no-wrap">${data.documentname}</p>
    </div>
    `;

    clubPost.innerHTML += newFlagedPost;
}