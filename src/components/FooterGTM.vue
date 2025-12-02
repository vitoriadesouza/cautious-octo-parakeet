<template>
  <footer class="footer">
    <div class="footer-content">

      <div class="logo-area">
        <h1 class="logo">GTM</h1>
        <p class="slogan">Entretenimento sem limites.</p>
      </div>

      <div class="links">
        <a href="/">Início</a>
        <a href="/movies">Filmes</a>
        <a href="/series">Séries</a>
      </div>

      <div class="developers">
        <span>Desenvolvido por:</span>
        <span class="names">
          <a href="https://github.com/vitoriadesouza" target="_blank" rel="noopener noreferrer">Vitória de Souza</a>
          &amp;
          <a href="https://github.com/kauabarros-24" target="_blank" rel="noopener noreferrer">Kauã Martins Barros</a>
        </span>
      </div>
      <p class="copy">
        © {{ new Date().getFullYear() }} GTM — Todos os direitos reservados.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0a0a0a;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  margin-top: 60px;
  border-top: 1px solid rgba(255,255,255,0.08);
}

.footer-content {
  text-align: center;
  color: #ccc;
  width: 100%;
}

.logo-area {
  margin-bottom: 20px;
}

.logo {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 2px;
}

.slogan {
  font-size: 14px;
  opacity: 0.6;
}

.links {
  display: flex;
  justify-content: center;
  gap: 26px;
  margin: 18px 0 25px 0;
  flex-wrap: wrap;
}

.links a {
  color: #ccc;
  text-decoration: none;
  font-size: 15px;
  transition: 0.2s;
}

.links a:hover {
  color: #fff;
}

.developers {
  font-size: 13px;
  opacity: 0.6;
  margin-bottom: 10px;
}

.developers .names a {
  font-weight: 500;
  color: #fff;
  margin: 0 4px;
  text-decoration: none;
  transition: 0.2s;
}

.developers .names a:hover {
  color: #e50914;
}

.copy {
  opacity: 0.5;
  font-size: 13px;
  margin-top: 10px;
}
</style>
