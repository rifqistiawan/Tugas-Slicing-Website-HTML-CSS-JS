(function(){
  "use strict";

  /* Menu mobile */
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', function(){
    var open = navLinks.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* Mode terang/gelap */
  document.getElementById('themeToggle').addEventListener('click', function(){
    document.body.classList.toggle('dark');
  });

  /* Nav aktif saat scroll */
  var navItems = document.querySelectorAll('.nav-link');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        var id = en.target.getAttribute('id');
        navItems.forEach(function(a){
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin:'-45% 0px -50% 0px' });
  document.querySelectorAll('section[id]').forEach(function(s){ io.observe(s); });

  /* Filter proyek */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projRows = document.querySelectorAll('.proj-row');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      projRows.forEach(function(row){
        var show = (f === 'all') || (row.getAttribute('data-cat') === f);
        row.classList.toggle('hidden', !show);
      });
    });
  });

  /* Salin kontak & buka tautan */
  document.querySelectorAll('.c-action').forEach(function(btn){
    btn.addEventListener('click', function(){
      var link = btn.getAttribute('data-link');
      if(link){ window.open(link, '_blank', 'noopener'); return; }
      var text = btn.getAttribute('data-copy');
      var original = btn.textContent;
      function done(){
        btn.textContent = 'tersalin ✓';
        setTimeout(function(){ btn.textContent = original; }, 1600);
      }
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        done();
      }
    });
  });

  /* Kembali ke atas */
  document.getElementById('toTop').addEventListener('click', function(){
    window.scrollTo({ top:0, behavior:'smooth' });
  });
})();
