<template>
  <div v-if="img.urls" class="cont">
    <div class="img-cont">
      <img :src="img.urls.regular" :alt="img.alt_description" />
      <span>{{ img.description }}</span>
    </div>
    <button ref="likeBtn" class="like" :disabled="!canLike" @click="savePik(img)" > 💖 </button>
  </div>
  <button @click="getImg()">Get a lucky picture</button>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  emits: ["savedPik"],
  setup(props, { emit }) {
    const img = ref({});
    const canLike = ref(true);

    const getImgData = async () => {
      const API_URL = `/.netlify/functions/getImg`;
      let imgData;

      try {
        const res = await fetch(API_URL);
        imgData = await res.json();
        canLike.value = true;
      } catch (err) {
        console.log(err);
      }

      return imgData.data;
    };

    const getImg = async () => {
      img.value = await getImgData();
    };

    const savePik = async (img) => {
      try {
        fetch(`/.netlify/functions/savePik`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            img,
          }),
        });

        alert("Pik saved!");
        emit("savedPik");
        canLike.value = false;
      } catch (err) {
        console.log(err);
      }
    };

    return { getImg, img, savePik, canLike };
  },
};
</script>

<style scoped>
.img-cont {
  max-width: 540px;
  margin: 1rem 0;
}

button {
  background: rgb(50, 13, 153);
  padding: 0.5rem 1rem;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 0.25rem;
  transition: all0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

button.like {
  background: hsl(350, 80%, 86%);
  margin-bottom: 1rem;
}

button.like:active {
  background: hsl(350, 90%, 76%);
  transform: scale(1.1);
}

button:disabled {
  background: hsl(350, 80%, 90%);
  filter: grayscale(100%);
  color: #fff;
  cursor: not-allowed;
}
</style>