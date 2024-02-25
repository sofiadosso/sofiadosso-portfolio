const about = document.querySelector('#about')
const aboutContent = document.querySelector('#about-content')

about.addEventListener('click', () => {
  // Aggiungi la classe al content-box di "About"
  aboutContent.classList.toggle('contentbox-active');

  // Assicurati che il content-box di "Contacts" si chiuda quando si apre quello di "About"
  if (aboutContent.classList.contains('contentbox-active')) {
    blogContent.classList.remove('contentbox-active');
  }
});

const blog = document.querySelector('#blog')
const blogContent = document.querySelector('#blog-content')

blog.addEventListener('click', () => {
  // Aggiungi la classe al content-box di "Contacts"
  blogContent.classList.toggle('contentbox-active');

  // Assicurati che il content-box di "About" si chiuda quando si apre quello di "Contacts"
  if (blogContent.classList.contains('contentbox-active')) {
    aboutContent.classList.remove('contentbox-active');
  }
});