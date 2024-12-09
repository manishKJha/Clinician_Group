<template>
  <div>
    <h1>Clinician Groups</h1>
    <draggable
      v-model="groups"
      group="tree"
      item-key="id"
      @end="persistChanges"
    >
      <template #item="{ element }">
        <tree-node
          :group="element"
          :selected-id="selectedId"
          @select-node="selectNode"
          @add-child="addChild"
          @delete-group="deleteGroup"
          @edit-group="editGroup"
        />
      </template>
    </draggable>
  </div>
</template>

<script>

import { ref } from "vue";
import TreeNode from "../components/TreeNode.vue";
import { useTreeStore } from "../stores/treeStore";
import draggable from "vuedraggable";

export default {
  name: "ClinicianTree",
  components: { TreeNode, draggable },
  setup() {
    const treeStore = useTreeStore();
    const selectedId = ref(null); // Tracks the selected group ID

    // Select a group
    const selectNode = (id) => {
      selectedId.value = id;
    };

    // Add a child group
    const addChild = (parentId, child) => {
      treeStore.addChildToGroup(parentId, child);
    };

    // Delete a group
    const deleteGroup = (groupId) => {
      treeStore.removeGroup(groupId);
    };

    // Edit a group name
    const editGroup = (groupId, newName) => {
      const group = treeStore.findGroupById(groupId);
      if (group) {
        group.name = newName;
        treeStore.persistChanges(); // Save changes
      }
    };

    // Persist changes to the hierarchy after drag-and-drop
    const persistChanges = () => {
      treeStore.persistChanges();
    };

    return {
      groups: treeStore.groups,
      selectedId,
      selectNode,
      addChild,
      deleteGroup,
      editGroup,
      persistChanges,
    };
  },
};
</script>