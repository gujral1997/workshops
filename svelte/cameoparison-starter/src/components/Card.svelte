<script>
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import { elasticOut } from "svelte/easing";
  const dispatch = createEventDispatcher();

  export let celeb;
  export let showprice;
  export let winner;
</script>

<style>
  .card-outer {
    height: 100%;
    width: 100%;
  }
  .card-inner {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: 50% 0 no-repeat;
    background-size: cover;
    overflow: hidden;
    padding: 0;
    text-align: center;
    border-radius: var(--border-radius);
    box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.2);
  }

  h2 {
    font-size: 1.5em;
    font-weight: bold;
  }

  .type {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .details {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 1em 0.5em 0.5em 0.5em;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 0, 0, 0.6) 35%,
      rgba(0, 0, 0, 0.9)
    );
    color: white;
  }

  .price {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4em;
    font-weight: 700;
  }

  .price.large {
    font-size: 6em;
  }

  @media (min-width: 640px) {
    .card-outer {
      height: 0;
      padding: 0 0 100% 0;
    }
  }
</style>

<div class="card-outer">
  <button
    class="card-inner"
    style="background-image: url({celeb.image})"
    on:click={() => dispatch('select')}>
    <div class="details svelte-xmkjd9">
      <h2>
        <a target="_blank" href="https://cameo.com/{celeb.id}">{celeb.name}</a>
      </h2>
      <p class="type">{celeb.type}</p>
    </div>
    {#if showprice}
      <div
        class="price"
        in:scale={{ easing: elasticOut, duration: 600 }}
        class:large={winner}>
        <span>${celeb.price}</span>
      </div>
    {/if}
  </button>
</div>
