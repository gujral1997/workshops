<script>
  import PostForm from "../components/PostForm.svelte";

  import { onMount } from "svelte";

  let postLimit = 6;
  const apiBaseUrl =
    "https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev";
  let posts = [];
  let editingPost = {
    body: "",
    title: "",
    id: null,
  };

  onMount(async () => {
    const res = await fetch(apiBaseUrl + "/posts");
    posts = await res.json();
  });

  function addPost({ detail: post }) {
    const index = posts.findIndex((p) => p.id === post.id);
    console.log(index);

    if (index !== -1) {
      let postsUpdated = posts;
      postsUpdated.splice(index, 1, post);
      posts = postsUpdated;
    } else posts = [post, ...posts];
  }

  function editPost(post) {
    editingPost = post;
  }
  function deletePost(post) {
    if (confirm("Are you sure?")) {
      const id = post.id;
      fetch(`${apiBaseUrl}/post/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          posts = posts.filter((p) => p.id !== id);
        });
    }
  }

  function setLimit() {
    fetch(`${apiBaseUrl}/posts/${postLimit}`)
      .then((res) => res.json())
      .then((postData) => {
        posts = postData;
      });
  }
</script>

<style>
  .card .card-content .card-title {
    margin-bottom: 0;
  }

  .card .card-content p.timestamp {
    color: #999;
    margin-bottom: 0;
  }
</style>

<div class="row">
  <div class="col s6">
    <PostForm on:postCreated={addPost} {editingPost} />
  </div>
  <div class="col s3" style="margin:50px">
    <p>Limit number of posts</p>
    <input type="number" bind:value={postLimit} />
    <button on:click={setLimit} class="waves-effect waves-light btn">
      Set
    </button>
  </div>
</div>

<div class="row">
  {#if posts.length === 0}
    <h3>Loading posts...</h3>
  {:else}
    {#each posts as post}
      <div class="col s6">
        <div class="card">
          <div class="card-content">
            <p class="card-title">{post.title}</p>
            <p class="timestamp">{post.createdAt}</p>
            <p>{post.body}</p>
          </div>
          <div class="card-action">
            <a
              href="#"
              on:click={() => editPost(post)}
              class="waves-effect waves-light btn">
              Edit
            </a>
            <a
              href="#"
              on:click={() => deletePost(post)}
              class="waves-effect waves-light btn red">
              Delete
            </a>
          </div>
        </div>
      </div>
    {/each}
  {/if}
</div>
