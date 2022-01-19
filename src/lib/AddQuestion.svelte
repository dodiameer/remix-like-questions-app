<script lang="ts">
  import { optimizeForm } from "$lib/optimizeForm";
  import type { FormCallback } from "$lib/optimizeForm";

  let userClass = "";
  export { userClass as class };
  export let formCallback: FormCallback;
</script>

<form
  use:optimizeForm={formCallback}
  class="space-y-3 {userClass}"
  action="/api/questions"
  method="post"
>
  <h2 class="subtitle">Ask a question!</h2>
  <div>
    <label class="label" for="text"> Question </label>
    <input
      class="input"
      id="text"
      name="text"
      type="text"
      required
      minlength="6"
      maxlength="100"
    />
  </div>
  <button type="submit" class="btn btn-primary">Ask question</button>
</form>
