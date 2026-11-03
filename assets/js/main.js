/* Complejo Los Leones — sitio MyM. JS mínimo: menú del celular y WhatsApp flotante. */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  /* Barra superior: oculta sobre la portada, aparece al pasar los 80 px de scroll */
  var top = document.getElementById('top');
  var marcado = false;
  function alScroll() {
    if (marcado) return;
    marcado = true;
    requestAnimationFrame(function () {
      var bajo = window.scrollY > 80;
      top.classList.toggle('solido', bajo);
      marcado = false;
    });
  }
  window.addEventListener('scroll', alScroll, { passive: true });
  alScroll();

  /* Menú del celular */
  var boton = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  function cerrarMenu() {
    top.classList.remove('abierto');
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir menú');
  }
  boton.addEventListener('click', function () {
    var abierto = top.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) cerrarMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarMenu();
  });

  /* Portada. Cuando las fotos cargaron, el texto empieza a entrar sobre la laguna; a los 3,4 s (cuando terminó de entrar el lema) arranca un
     fundido lento (2,5 s) cada 5 s por todas las fotos. Se frena fuera de pantalla o con la pestaña en
     segundo plano; con "reducir movimiento" el texto se muestra quieto. */
  var hero = document.querySelector('.hero');
  var fondos = document.querySelector('.hero-fondos');
  var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var heroVisible = true;
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; }).observe(hero);
  }
  /* escala inicial de la línea dorada: ancho de la ventana ÷ 72 px */
  function escalaLinea() {
    document.documentElement.style.setProperty('--linea-escala', (window.innerWidth / 72).toFixed(2));
  }
  escalaLinea();
  window.addEventListener('resize', escalaLinea);

  if (hero && fondos) {
    var fotos = Array.prototype.slice.call(fondos.querySelectorAll('img'));
    var actual = 0;
    /* las demás fotos se agregan recién cuando terminó de cargar la página (no compiten con la primera) */
    function cargarResto() {
      var movil = window.matchMedia('(max-width:700px)').matches;
      (fondos.getAttribute(movil ? 'data-movil' : 'data-pc') || '').split(',').forEach(function (n) {
        if (!n) return;
        var img = new Image();
        img.alt = '';
        img.decoding = 'async';
        img.src = 'assets/img/fondo-' + n + (movil ? '-movil-720' : '') + '.jpg';
        img.srcset = 'assets/img/fondo-' + n + (movil ? '-movil-720' : '') + '.webp';
        fondos.appendChild(img);
        fotos.push(img);
      });
    }
    if (document.readyState === 'complete') cargarResto(); else window.addEventListener('load', cargarResto);
    function mostrar(i) {
      fotos[actual].classList.remove('activa');
      fotos[i].classList.add('activa');
      actual = i;
    }
    function lento() {
      function siguiente() {
        if (heroVisible && !document.hidden) {
          var sig = (actual + 1) % fotos.length;
          if (fotos[sig].complete) mostrar(sig);
        }
        setTimeout(siguiente, 5000);
      }
      setTimeout(siguiente, 3400);
    }
    function apertura() {
      hero.classList.add('arranca');
      lento();
    }
    /* arranca cuando cargó la primera foto (tope 2,5 s para redes lentas) */
    var primera = fotos[0];
    var lista = primera.complete ? Promise.resolve() : new Promise(function (ok) { primera.onload = primera.onerror = ok; });
    var tope = new Promise(function (ok) { setTimeout(ok, 2500); });
    Promise.race([lista, tope]).then(apertura);
  }

  /* Aparición al scrollear: cada pieza .rev se muestra cuando entra en pantalla, escalonada */
  var revs = document.querySelectorAll('.rev');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      var n = 0;
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.transitionDelay = (n * (en.target.classList.contains('act') ? 70 : 120)) + 'ms';
          n++;
          en.target.classList.add('visto');
          obs.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    revs.forEach(function (el) { obs.observe(el); });
  } else {
    revs.forEach(function (el) { el.classList.add('visto'); });
  }

  /* Coverflow de actividades: la foto central al frente; avanza sola cada 1,5 s (se frena con el mouse encima,
     al tocar, fuera de pantalla o con "reducir movimiento"). Clic en una foto lateral la trae al centro;
     en celular se desliza con el dedo. */
  var cf = document.getElementById('coverflow');
  if (cf) {
    var items = Array.prototype.slice.call(cf.querySelectorAll('.cf-item'));
    var n = items.length, actualCf = 0, relojCf = null, cfVisible = false, cfPausa = false;
    function pintar() {
      items.forEach(function (it, i) {
        var d = ((i - actualCf) % n + n) % n;
        if (d > n / 2) d -= n;
        it.setAttribute('data-pos', Math.abs(d) <= 3 ? String(d) : 'x');
        it.classList.toggle('centro', d === 0);
      });
    }
    function irCf(i) { actualCf = ((i % n) + n) % n; pintar(); }
    function marcha() {
      clearInterval(relojCf);
      if (quieto) return;
      relojCf = setInterval(function () {
        if (cfVisible && !cfPausa && !document.hidden) irCf(actualCf + 1);
      }, 1500);
    }
    items.forEach(function (it, i) {
      it.addEventListener('click', function () { irCf(i); marcha(); });
    });
    /* en PC: pausa solo mientras el mouse está sobre la foto central */
    cf.addEventListener('mouseover', function (e) { var it = e.target.closest('.cf-item'); cfPausa = !!(it && it.classList.contains('centro')); });
    cf.addEventListener('mouseleave', function () { cfPausa = false; });
    var x0 = null;
    cf.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; cfPausa = true; }, { passive: true });
    cf.addEventListener('touchend', function (e) {
      if (x0 !== null) {
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 40) irCf(actualCf + (dx < 0 ? 1 : -1));
      }
      x0 = null; cfPausa = false; marcha();
    }, { passive: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        var antes = cfVisible;
        cfVisible = e[0].isIntersecting;
        if (cfVisible && !antes) { setTimeout(function () { if (cfVisible && !cfPausa) irCf(actualCf + 1); }, 400); marcha(); }
      }, { threshold: 0.3 }).observe(cf);
    } else { cfVisible = true; }
    pintar();
    marcha();
  }

  /* Cinta de egresaditos: corre sola (CSS); se pausa cuando no está en pantalla */
  var cinta = document.querySelector('.cinta');
  if (cinta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { cinta.classList.toggle('quieta', !e[0].isIntersecting); }, { rootMargin: '100px 0px' }).observe(cinta);
  }

  /* Puntaje de reseñas: cuenta de 0,0 a 4,5 cuando aparece */
  var score = document.querySelector('.score-num[data-contar]');
  if (score && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e, obs) {
      if (!e[0].isIntersecting) return;
      obs.disconnect();
      var fin = parseFloat(score.getAttribute('data-contar').replace(',', '.'));
      if (quieto) { score.textContent = fin.toFixed(1).replace('.', ','); return; }
      var t0 = null;
      function paso(t) {
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / 1400);
        k = 1 - Math.pow(1 - k, 3);
        score.textContent = (fin * k).toFixed(1).replace('.', ',');
        if (k < 1) requestAnimationFrame(paso);
      }
      requestAnimationFrame(paso);
    }, { threshold: 0.5 }).observe(score);
  }

  /* Recorrido 360: el video se carga la primera vez que se acerca a la pantalla, se reproduce en bucle
     mientras está a la vista y se pausa cuando sale. */
  var recorrido = document.querySelector('.video-marco video');
  if (recorrido && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) {
        var f = recorrido.querySelector('source[data-src]');
        if (f) { f.src = f.getAttribute('data-src'); f.removeAttribute('data-src'); recorrido.load(); }
        if (!quieto) { var pr = recorrido.play(); if (pr && pr.catch) pr.catch(function () {}); }
      } else {
        recorrido.pause();
      }
    }, { rootMargin: '200px 0px' }).observe(recorrido);
  }

})();
