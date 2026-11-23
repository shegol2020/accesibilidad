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

// Preguntas frecuentes
document.querySelectorAll('.faq-pregunta').forEach(function (button) {
  var answer = document.getElementById(button.getAttribute('aria-controls'));

  button.addEventListener('click', function () {
    var willOpen = answer.hidden;
    answer.hidden = !willOpen;
    button.classList.toggle('abierta', willOpen);
  });
});

// Formulario de contacto
(function () {
  var form = document.getElementById('form-contacto');
  if (!form) {
    return;
  }

  var summary = document.getElementById('resumen-errores');
  var summaryList = summary.querySelector('ul');
  var summaryTitle = summary.querySelector('h2');
  var success = document.getElementById('mensaje-exito');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var checks = [
    {
      id: 'nombre',
      message: 'Escribe tu nombre',
      valid: function (field) { return field.value.trim() !== ''; }
    },
    {
      id: 'correo',
      message: 'Escribe un correo con el formato nombre@ejemplo.com',
      valid: function (field) { return emailPattern.test(field.value.trim()); }
    },
    {
      id: 'mensaje',
      message: 'Escribe tu mensaje',
      valid: function (field) { return field.value.trim() !== ''; }
    },
    {
      id: 'privacidad',
      message: 'Acepta la política de privacidad',
      valid: function (field) { return field.checked; }
    }
  ];

  function setFieldError(field, message) {
    var error = document.getElementById('error-' + field.id);
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      error.textContent = message;
      error.hidden = false;
    } else {
      field.removeAttribute('aria-invalid');
      error.textContent = '';
      error.hidden = true;
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    success.hidden = true;
    summaryList.innerHTML = '';

    var errors = [];
    checks.forEach(function (check) {
      var field = document.getElementById(check.id);
      if (check.valid(field)) {
        setFieldError(field, null);
      } else {
        setFieldError(field, check.message);
        errors.push(check);
      }
    });

    if (errors.length > 0) {
      summaryTitle.textContent = errors.length === 1
        ? 'Hay 1 error en el formulario:'
        : 'Hay ' + errors.length + ' errores en el formulario:';

      errors.forEach(function (check) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + check.id;
        a.textContent = check.message;
        a.addEventListener('click', function (e) {
          e.preventDefault();
          document.getElementById(check.id).focus();
        });
        li.appendChild(a);
        summaryList.appendChild(li);
      });

      summary.hidden = false;
      summary.focus();
      return;
    }

    summary.hidden = true;
    form.reset();
    success.hidden = false;
  });
})();
