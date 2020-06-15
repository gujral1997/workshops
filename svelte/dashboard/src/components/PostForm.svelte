<script>
  import { createEventDispatcher } from "svelte";
  export let editingPost;
  $: body = editingPost.body;
  $: title = editingPost.title;
  let loading = false;
  const dispatch = createEventDispatcher();
  const apiBaseUrl =
    "https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev";
  async function onSubmit() {
    event.preventDefault();
    if (title.trim() === "" || body.trim() === "") {
      return;
    }
    loading = true;
    const newPost = { title, body };
    let url, method;
    if (editingPost.id) {
      url = `${apiBaseUrl}/post/${editingPost.id}`;
      method = "PUT";
    } else {
      url = `${apiBaseUrl}/post`;
      method = "POST";
    }

    const res = await fetch(url, {
      method,
      body: JSON.stringify(newPost),
    });
    const post = await res.json();
    dispatch("postCreated", post);
    title = body = "";
    loading = false;
  }
</script>

<style>
  form {
    margin: 50px;
  }
  .progress {
    margin: 100px;
  }
</style>

{#if !loading}
  <form on:submit={onSubmit}>
    <div class="input-field">
      <label for="title">Title</label>
      <input type="text" class="text" bind:value={editingPost.title} />
    </div>
    <div class="input-field">
      <label for="title">Body</label>
      <input type="text" class="text" bind:value={editingPost.body} />
    </div>
    <button type="submit" class="waves-effect waves-light btn">Add</button>
  </form>
{:else}
  <div class="progress">
    <div class="indeterminate" />
  </div>
{/if}
