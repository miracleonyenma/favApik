<template>
  <main>
    <section>
      <header>
        <h1>A special picture for you</h1>
      </header>
      <img-cont @saved-pik="getFavPiks()" />

      <section>
        <h2>Liked Pics</h2>
        <ul v-if="favPiks.length > 0" class="favPiks">
          <li v-for="favPik in favPiks" :key="favPik.ref['@ref'].id">
            <div class="img-cont">
              <img :src="favPik.data.img.urls.small" :alt="favPik.data.img.description" class="favPik" />
            </div>
          </li>
        </ul>
        <span v-else> No fav piks</span>
      </section>
    </section>
  </main>
</template>

<script>
import { ref } from "@vue/reactivity";
import ImgCont from "./components/ImgCont.vue";

export default {
  components: { ImgCont },
  setup() {
    const favPiks = ref([]);
    const getFavPiks = async () => {
      try {
        const res = await fetch("/.netlify/functions/getFavPiks");
        const data = await res.json();

        favPiks.value = data.data.reverse()
      } catch (error) {
        console.log(error);
        favPiks.value = null
      }
    };

    return { favPiks, getFavPiks };
  },
  async mounted() {
    this.getFavPiks()
    console.log(this.favPiks);
  },
};
</script>

<style>
* {
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

main {
  padding: 1rem;
}

.img-cont {
  width: 100%;
}
.img-cont img {
  width: 100%;
  height: 100%;
  border-radius: .56rem;
  object-fit: cover;
  object-position: center;
}
.favPiks {
  display: flex;
  gap: 1rem;
  list-style-type: none;
  flex-wrap: wrap;
}

.favPiks .favPik {
  height: 8rem;
}
</style>