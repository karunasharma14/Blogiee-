document.addEventListener('DOMContentLoaded', function () {
    fetch('/blogs')
        .then(response => response.json())
        .then(blogs => displayBlogs(blogs));
});
  
  function addPost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
  
    if (!title || !content) {
        alert('Title and content are required.');
        return;
    }
  
    const blogItem = document.createElement('li');
    blogItem.className = 'blog-item';
    blogItem.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
    `;
  
    document.getElementById('blogs').appendChild(blogItem);
  
    fetch('/blogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    })
        .then(response => response.json())
        .then(newBlog => console.log('New blog added:', newBlog))
        .catch(error => console.error('Error adding blog:', error));
  
    // Clear form fields
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function () {
        deletePost(blogItem, title);
    });

    blogItem.appendChild(deleteButton);
  }

  function deletePost(blogItem, title) {
    const confirmed = confirm(`Are you sure you want to delete the post "${title}"?`);
    if (confirmed) {
        blogItem.remove();

        // TODO: Add code to send a request to the server to delete the post
        const url = '/blogs'; // replace with the correct server endpoint
        const data = { title }; // adjust based on your server's requirements

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(deletedPost => console.log('Post deleted:', deletedPost))
        .catch(error => console.error('Error deleting post:', error));
    }
 }
  
  function displayBlogs(blogs) {
    const blogsList = document.getElementById('blogs');
    blogsList.innerHTML = '';
  
    blogs.forEach(blog => {
        const blogItem = document.createElement('li');
        blogItem.className = 'blog-item';
        blogItem.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
        `;
        blogsList.appendChild(blogItem);
    });
  }
  