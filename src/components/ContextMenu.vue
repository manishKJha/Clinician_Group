<template>
  <div class="menu-container">
    <div v-for="(action, index) in actions" :key="index" @click="perform(action)">
      {{ action.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ContextMenu",
  props: {
    actions: {
      type: Array as PropType<{ label: string; action: () => void }[]>,
      required: true,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const perform = (action: { action: () => void }) => {
      action.action();
      emit("close");
    };
    return { perform };
  },
});
</script>

<style scoped>
.menu-container {
  background: #fff;
  border: 1px solid #ccc;
  position: absolute;
  z-index: 10;
}
.menu-container div {
  padding: 8px;
  cursor: pointer;
}
</style>