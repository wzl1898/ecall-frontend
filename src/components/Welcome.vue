<template>
  <div class="container">
    <button @click="$router.push('/login')">START</button>
  </div>
</template>

<script>
export default {
    name: "Welcome",
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  /* background-color: rgb(48, 48, 48); */
  background: url("../assets/cover.jpg") no-repeat;
  background-size: 100% 100%;
}
button{
    height: 83px;
    width: 295px;
    position: absolute;
    left: 77%;
    top: 66%;
    border-radius: 60px;
    outline: none;
    background: rgb(27, 27, 27, 0.3);
    color: white;
    border: 1.5px solid white;
    font-size: 50px;
    font-weight: 900;
}
button:hover{
  animation: dark 0.5s forwards;
}
@keyframes dark {
  to {
    background: rgb(48, 48, 48);
  }
}
</style>