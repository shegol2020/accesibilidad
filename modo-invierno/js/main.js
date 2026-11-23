// Menú desplegable "Artículos"
document.querySelectorAll('[data-dropdown]').forEach(function (dropdown) {
  var button = dropdown.querySelector('button');
  var menu = dropdown.querySelector('.submenu');

  function close(returnFocus) {
    button.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    if (returnFocus) {
      button.focus();
    }
  }

  button.addEventListener('click', function () {
    var isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    menu.hidden = isOpen;
  });

  dropdown.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      close(true);
    }
  });

  dropdown.addEventListener('focusout', function (event) {
    if (event.relatedTarget && !dropdown.contains(event.relatedTarget)) {
      close(false);
    }
  });

  document.addEventListener('click', function (event) {
    if (!dropdown.contains(event.target)) {
      close(false);
    }
  });
});
