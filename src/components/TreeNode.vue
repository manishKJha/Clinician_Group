<template>
  <div class="tree-node">
    <div class="node-header" :class="{ 'active-node': isSelected }" @click="selectNode">
      <span v-if="group.type === 'hospital'" class="icon-hospital">🏥</span>
      <span v-else class="icon-diagnosis">⚕️</span>

      <!-- Editable Group Name -->
      <span v-if="!isEditing">{{ group.name }}</span>
      <input 
        v-else 
        type="text" 
        v-model="editableName" 
        @blur="cancelEdit" 
        @keyup.enter="saveEdit" 
        class="edit-input"
      />

      <!-- Context Menu -->
      <button @click="toggleContextMenu" class="context-menu-btn">⋮</button>
      <div v-if="showMenu" class="context-menu">
        <button @click="editGroup">✏️ Edit group</button>
        <button @click="addChild">➕ Create child group</button>
        <button @click="deleteGroup" class="remove-group">🗑️ Remove group</button>
      </div>
    </div>

    <!-- Render Children -->
    <div class="children" v-if="group.children && group.children.length">
      <tree-node
        v-for="child in group.children"
        :key="child.id"
        :group="child"
        :selected-id="selectedId"
        @select-node="selectNode"
        @add-child="addChildToChild"
        @delete-group="deleteChildGroup"
        @edit-group="editChildGroup"
      />
    </div>
  </div>
</template>



<script>
export default {
  name: "TreeNode",
  props: {
    group: Object,
    selectedId: Number,
  },
  data() {
    return {
      showMenu: false,
      isEditing: false,
      editableName: this.group.name,
    };
  },
  computed: {
    isSelected() {
      return this.selectedId === this.group.id;
    },
  },
  methods: {
    toggleContextMenu(event) {
      event.stopPropagation();
      this.showMenu = !this.showMenu;
    },
    addChild() {
      const newChild = { id: Date.now(), name: "New Group", type: "diagnosis", children: [] };
      this.$emit("add-child", this.group.id, newChild);
      this.showMenu = false;
    },
    deleteGroup() {
      if (this.group.children && this.group.children.length > 0) {
        alert("Cannot delete a group with children. Please remove its children first.");
      } else {
        this.$emit("delete-group", this.group.id);
      }
      this.showMenu = false;
    },
    addChildToChild(parentId, child) {
      this.$emit("add-child", parentId, child);
    },
    deleteChildGroup(groupId) {
      this.$emit("delete-group", groupId);
    },
    selectNode() {
      this.$emit("select-node", this.group.id);
    },
    editGroup() {
      this.isEditing = true;
      this.showMenu = false;
      this.editableName = this.group.name; 
    },
    saveEdit() {
      const trimmedName = this.editableName.trim();
      if (trimmedName !== "") {
        this.$emit("edit-group", this.group.id, trimmedName); 
        this.group.name = trimmedName; 
      }
      this.isEditing = false; 
    },
    cancelEdit() {
      this.isEditing = false; 
      this.editableName = this.group.name; 
    },
    editChildGroup(groupId, newName) {
      this.$emit("edit-group", groupId, newName);
    },
  },
};

</script>

<style scoped>
.tree-node {
  margin-left: 20px;
}

.node-header {
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  position: relative;
}

.node-header:hover {
  background-color: #f5f5f5;
}

.active-node {
  font-weight: bold;
}

.icon-hospital,
.icon-diagnosis {
  margin-right: 10px;
}

.context-menu-btn {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
}

.context-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.context-menu button {
  display: block;
  padding: 8px 12px;
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  cursor: pointer;
}

.context-menu button:hover {
  background-color: #f0f0f0;
}

.remove-group {
  color: red;
}

.children {
  margin-left: 20px;
}

.edit-input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  font-size: 14px;
  width: 150px;
}
</style>
