(() => {
  const topbar = document.querySelector(".topbar");
  const burger = document.querySelector(".burger");
  const drawer = document.querySelector(".drawer");
  const form = document.querySelector(".contact-form");
  const formNote = document.querySelector(".form-note");

  const onScroll = () => {
    if (!topbar) return;
    topbar.classList.toggle("scrolled", window.scrollY > 16);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger && drawer) {
    burger.addEventListener("click", () => {
      const open = drawer.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("show"));
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const nome = String(data.get("nome") || "").trim();
      const telefone = String(data.get("telefone") || "").trim();
      const servico = String(data.get("servico") || "").trim();
      const pet = String(data.get("pet") || "").trim();
      const mensagem = String(data.get("mensagem") || "").trim();

      const texto = [
        "Olá! Vim pelo site da Estilo Pet Shop.",
        nome && `Nome: ${nome}`,
        telefone && `Meu WhatsApp: ${telefone}`,
        servico && `Serviço: ${servico}`,
        pet && `Pet: ${pet}`,
        mensagem && `Detalhes: ${mensagem}`,
      ]
        .filter(Boolean)
        .join("\n");

      const url = `https://wa.me/5548991709363?text=${encodeURIComponent(texto)}`;
      window.open(url, "_blank", "noopener,noreferrer");

      if (formNote) {
        formNote.textContent = "Abrindo o WhatsApp da Estilo Pet Shop…";
        formNote.classList.add("show");
      }
    });
  }
})();
