document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const closeButtons = document.querySelectorAll("[data-close]");
  const openLogin = document.getElementById("openLogin");
  const openRegister = document.getElementById("openRegister");

  const open = (modal) => modal.classList.remove("hidden");
  const close = (modal) => modal.classList.add("hidden");

  loginBtn.addEventListener("click", () => open(loginModal));
  registerBtn.addEventListener("click", () => open(registerModal));

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.close;
      close(document.getElementById(target));
    });
  });

  openLogin.addEventListener("click", (e) => {
    e.preventDefault();
    close(registerModal);
    open(loginModal);
  });

  openRegister.addEventListener("click", (e) => {
    e.preventDefault();
    close(loginModal);
    open(registerModal);
  });

  window.addEventListener("click", (e) => {
    if (e.target === loginModal) close(loginModal);
    if (e.target === registerModal) close(registerModal);
  });
});
