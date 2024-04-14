const sliderBody = document.querySelector('#slider_body');

function generatePost(data) {
    const shareTime = new Date(data.sharetime).toLocaleString();

    const newPost = `
        <div class="reeleItemBx">
            <div class="reeleItemInteract">
                <div class="reeleItemHeader">
                    <div class="rih-row">
                        <div class="reeleautherbx">
                            <label class="color-b-w-t p-sub">Author: </label>
                            <img class="profile_bx" src="http://localhost:8000/users/profilepicture/${data.Authorname}" alt="">
                            <label class="color-b-w-t">${data.Authorname}</label>
                            <span class="line"></span>
                        </div>
                        <label class="color-b-w-t">${shareTime}</label>
                    </div>
                    <div class="rih-row">
                        <label class="doctitle" for="">${data.documentname}</label> 
                    </div>
                    <div class="rih-row">
                        <label class="color-b-w-t" for="">By auther: ${data.byauthor}</label>
                    </div>
                </div>
                <div class="reeleBookBx">
                    <div data-reele="${data.documentname}" class="reeleBookCover">
                    <div class="reeleBookBack" style="background-image: url('http://localhost:8000/posts/cover/${data.documentname}')"></div>
                    <img class="reeleCover" src="http://localhost:8000/posts/cover/${data.documentname}" alt=""> <!-- adatok helyettesítése -->
                    <img class="reeleCover" src="../assets/blank_cover.png" alt="">
                    </div>
                </div>
            </div>
            <div class="reeleItemFooter">
                <div class="rif-item">
                    <div class="reeleInteractbutton_T"><img class="reeleInteractIcon" src="../assets/thought.svg"
                            alt=""><label class="reeleInteracttitle">Thoughts</label></div>
                </div>
                <span class="line"></span>
                <div class="rif-item">
                <div class="reeleInteractbutton" data-post="${data.documentname}"><img class="reeleInteractIcon"
                        src="../assets/article_multi.svg" alt=""><label class="reeleInteracttitle">Peek it</label></div>
                </div>
                <span class="line"></span>
                <div class="rif-item">
                    <div class="reeleInteractbutton_R" data-post="${data.documentname}"><img class="reeleInteractIcon"
                            src="${data.reelIcon}" alt=""><label class="reeleInteracttitle">${data.reelMsg}</label></div>
                </div>
            </div>
        </div>
    `;

    sliderBody.innerHTML += newPost;
}

function removePost() {
    var reeleItem = document.querySelectorAll('.reeleItemBx');
    reeleItem.forEach(element => {
        element.remove();
    });
}