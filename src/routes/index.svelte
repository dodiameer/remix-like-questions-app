<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, url }) => {
    const questions = await fetch("/api/questions").then((r) => r.json());
    const successMessage = url.searchParams.get("success");
    const errorMessage = url.searchParams.get("error");
    return {
      status: 200,
      props: {
        questions,
        successMessage,
        errorMessage,
      },
    };
  };
</script>

<script lang="ts">
  import AddQuestion from "$lib/AddQuestion.svelte";
  import type { Question } from "@prisma/client";
  import { optimizeForm } from "$lib/optimizeForm";
  import type { FormCallback } from "$lib/optimizeForm";
  import { fade } from "svelte/transition";

  export let questions: Question[] = [];

  export let successMessage: string = "";
  export let errorMessage: string = "";

  const deleteQuestion: (id: Question["id"]) => FormCallback =
    (id) =>
    async ({ response }) => {
      if (response.ok) {
        questions = questions.filter((question) => question.id !== id);
        successMessage = (await response.json()).success;
      } else {
        try {
          errorMessage = (await response.json()).error;
        } catch {
          errorMessage = "An error occurred.";
        }
      }
    };

  const addQuestion: FormCallback = async ({ response, form }) => {
    if (response.ok) {
      const json = await response.json();
      const newQuestion = json.question;
      successMessage = json.success;
      questions = [newQuestion, ...questions];
      form.reset();
    } else {
      try {
        errorMessage = (await response.json()).error;
      } catch {
        errorMessage = "An error occurred.";
      }
    }
  };

  $: {
    setTimeout(() => {
      errorMessage = "";
    }, 5000);
  }
  $: {
    setTimeout(() => {
      successMessage = "";
    }, 5000);
  }
</script>

<h1 class="title">Questions</h1>
{#if errorMessage}
  <div role="alert" class="alert alert-danger" in:fade>
    {errorMessage}
  </div>
{/if}
{#if successMessage}
  <div role="alert" class="alert alert-success" in:fade>
    {successMessage}
  </div>
{/if}
<ul class="space-y-3">
  {#each questions as question (question.id)}
    <li class="line space-x-2">
      <p>
        {question.text}
      </p>
      <form
        use:optimizeForm={deleteQuestion(question.id)}
        action="/api/questions?__method=DELETE"
        method="post"
      >
        <input type="hidden" name="id" value={question.id} />
        <button type="submit" class="btn btn-danger">Delete</button>
      </form>
    </li>
  {:else}
    <p>No questions asked &mdash; yet!</p>
  {/each}
</ul>
<AddQuestion formCallback={addQuestion} class="mt-6" />
