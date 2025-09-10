/* script.js
  - Smooth scroll (menu)
  - Parallax simples para o hero (melhor experiência em desktop)
  - IntersectionObserver para ativar animações de fade-in
  - Submissão de formulário com validação mínima (apenas front-end)
*/

/* Helpers */
const qs = (s) => document.querySelector(s);
const qsa = (s) => document.querySelectorAll(s);

/* Atualiza ano no footer */
document.getElementById('anoAtual').textContent = new Date().getFullYear();

/* Navegação suave para links internos */
qsa('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
/* CTA no header */
qs('#cta-header').addEventListener('click', () => {
  qs('#contato').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* Parallax simples — apenas em desktop para desempenho */
const parallaxEl = document.querySelector('[data-parallax]');
let isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (parallaxEl && !isTouch) {
  window.addEventListener('scroll', () => {
    // O parallax é um ajuste sutil da posição de background
    const scrolled = window.scrollY;
    // mova a imagem mais lentamente que o scroll (fator < 1)
    parallaxEl.style.backgroundPosition = `center ${50 - scrolled * 0.03}%`;
  }, { passive: true });
}

/* Fade-in ao entrar na viewport (IntersectionObserver) */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

qsa('.section--fade').forEach(el => observer.observe(el));

/* Menu toggle (mobile) - simples */
const menuBtn = qs('.menu-toggle');
menuBtn?.addEventListener('click', () => {
  const nav = qs('.nav');
  if (!nav) return;
  nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
});

/* Formulário: validação mínima e feedback */
const form = qs('#formContato');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = qs('#nome').value.trim();
  const email = qs('#email').value.trim();
  const mensagem = qs('#mensagem').value.trim();

  if (!nome || !email || !mensagem) {
    alert('Preencha todos os campos antes de enviar.');
    return;
  }

  // Aqui você pode integrar com fetch() para enviar para sua API/serviço (ex: Netlify Forms, Formspree, Zapier)
  // Exemplo (não ativo): fetch('/api/contact', { method: 'POST', body: JSON.stringify({nome,email,mensagem}) })

  // Feedback simples
  alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
  form.reset();
});
