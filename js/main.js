// Select elements from DOM
let elCountUser = document.querySelector('.count_users')
let elCountPost = document.querySelector('.count_posts')
let elCountComment = document.querySelector('.count_comments')

let elUserList = document.querySelector('.users_list')
let elPostList = document.querySelector('.posts_list')
let elCommentList = document.querySelector('.comments_list')

let elUserTitle = document.querySelector('.users_title')
let elPostTitle = document.querySelector('.posts_title')
let elCommentTitle = document.querySelector('.comments_title')

let elUserEmail = document.querySelector('.users_email')
let elUserCountry = document.querySelector('.users_country')
let elUserCompany = document.querySelector('.users_company')
let elUserLink = document.querySelector('.users_link')

let elPostText = document.querySelector('.post_text')

let elCommentEmail = document.querySelector('.comments_email')
let elCommentText = document.querySelector('.comments_text')

let elUserTemplate = document.querySelector('#userTemplate').content
let elPostTemplate = document.querySelector('#postTemplate').content
let elCommentTemplate = document.querySelector('#commentTemplate').content

let storage = window.localStorage;

let storagePostId = JSON.parse(storage.getItem('arrayNode'))
let storageCommentId = JSON.parse(storage.getItem('arrayCommentNode'))
console.log(storageCommentId);

if (storagePostId) {
    ;(async function() {
            
        let responce = await fetch(`https://jsonplaceholder.typicode.com/user/${storagePostId}/posts`);
        let data = await responce.json();
        renderPosts(data, elPostList)
    })();
}

if (storageCommentId) {
    ;(async function() {
        
       
            let responce = await fetch(`https://jsonplaceholder.typicode.com/posts/${storageCommentId}/comments`);
            let data = await responce.json();
            renderComments(data, elCommentList)
    })();
}

// Render users
function renderUsers(array, wrapper) {
    wrapper.innerHTML = null;
    
    let userFragment = document.createDocumentFragment()
    
    array.forEach(item => {
        let userTemplate = elUserTemplate.cloneNode(true);
        
        userTemplate.querySelector('.users_title').textContent = item.name;
        userTemplate.querySelector('.users_title').dataset.userId = item.id
        userTemplate.querySelector('.users_email').textContent = item.email;
        userTemplate.querySelector('.users_country').textContent = item.address.city;
        userTemplate.querySelector('.users_company').textContent = item.company.name;
        userTemplate.querySelector('.users_link').href = item.website;
        userTemplate.querySelector('.users_link').textContent = item.website;
        
        userFragment.appendChild(userTemplate)
    })
    
    wrapper.appendChild(userFragment)
    elCountUser.textContent = array.length;
}

// Render posts
function renderPosts(array, wrapper) {
    wrapper.innerHTML = null;
    elCommentList.innerHTML = null;
    elCountComment.innerHTML = "0";  

    
    let postFragment = document.createDocumentFragment();
    
    array.forEach( item => {
        let postTemplate = elPostTemplate.cloneNode(true)
        
        postTemplate.querySelector('.posts_title').textContent = item.title
        postTemplate.querySelector('.posts_title').dataset.postId = item.id
        postTemplate.querySelector('.post_text').textContent = item.body
        
        postFragment.appendChild(postTemplate)
    })
    
    wrapper.appendChild(postFragment)
    elCountPost.textContent = array.length;
    
}

// Render comments
function renderComments(array, wrapper) {
    wrapper.innerHTML = null;
    
    let commentFragment = document.createDocumentFragment()
    
    array.forEach(item => {
        let commentTemplate = elCommentTemplate.cloneNode(true);
        commentTemplate.querySelector('.comments_title').textContent = item.title;
        commentTemplate.querySelector('.comments_text').textContent = item.body;
        
        commentFragment.appendChild(commentTemplate)
    })
    
    wrapper.appendChild(commentFragment)
    elCountComment.textContent = array.length
}


;(async function() {
    let responce = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await responce.json();
    renderUsers(data, elUserList)
})();


elUserList.addEventListener('click', evt => {
    
    let foundUserId = evt.target.dataset.userId
    
    if (foundUserId) {
        
        ;(async function() {
            
            let responce = await fetch(`https://jsonplaceholder.typicode.com/user/${foundUserId}/posts`);
            let data = await responce.json();
            renderPosts(data, elPostList)
            storage.setItem('arrayNode', JSON.stringify(foundUserId))
            
        })();
    }
})

elPostList.addEventListener('click', evt => {
    let foundCommentId = evt.target.dataset.postId
    
    ;(async function() {
        
        if (foundCommentId) {
            let responce = await fetch(`https://jsonplaceholder.typicode.com/posts/${foundCommentId}/comments`);
            let data = await responce.json();
            renderComments(data, elCommentList)
            storage.setItem('arrayCommentNode', JSON.stringify(foundCommentId))

        }
    })();
})