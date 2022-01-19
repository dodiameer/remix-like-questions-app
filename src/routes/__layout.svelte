<script>
  import "../app.css";
</script>

<nav class="bg-primary-500 text-white mb-2 py-3">
  <div class="container line">
    <a href="/" class="subtitle mr-auto !mb-0">AMA</a>
    <div class="line space-x-4">
      <a href="/">Home</a>
      <a href="/answers">Answers</a>
    </div>
  </div>
</nav>
<div class="container">
  <slot />
</div>
