const about = document.querySelector('#about')
const aboutContent = document.querySelector('#about-content')

about.addEventListener('click', () => {
  // Add the class to the content-box of "About"
  aboutContent.classList.toggle('contentbox-active');

  // Make sure the content-box for "Contacts" closes when you open the one for "About"
  if (aboutContent.classList.contains('contentbox-active')) {
    blogContent.classList.remove('contentbox-active');
  }
});

const blog = document.querySelector('#blog')
const blogContent = document.querySelector('#blog-content')

blog.addEventListener('click', () => {
  // Add the class to the content-box of "Contacts"
  blogContent.classList.toggle('contentbox-active');

  // Make sure that the content-box of "About" closes when you open the one of "Contacts"
  if (blogContent.classList.contains('contentbox-active')) {
    aboutContent.classList.remove('contentbox-active');
  }
});
