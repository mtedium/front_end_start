<template>
  <div class="about">
    <h1>This is an about page</h1>
      <a-space wrap>
        <a-button type="primary" danger>Primary</a-button>
        <a-button danger>Default</a-button>
        <a-button type="dashed" danger>Dashed</a-button>
        <a-button type="text" danger>Text</a-button>
        <a-button type="link" danger>Link</a-button>
      </a-space>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
