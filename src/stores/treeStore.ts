import { reactive } from "vue";

export const useTreeStore = () => {
  const groups = reactive([
    {
      id: 1,
      name: "Hospital A",
      type: "hospital",
      children: [
        {
          id: 2,
          name: "Shoulder",
          type: "diagnosis",
          children: [],
        },
        {
          id: 3,
          name: "Knee",
          type: "diagnosis",
          children: [],
        },
      ],
    },
    {
      id: 4,
      name: "Hospital B",
      type: "hospital",
      children: [],
    },
  ]);

  /** Find a group by its ID in the nested structure.  */
  const findGroupById = (groupId, groupList = groups) => {
    for (const group of groupList) {
      if (group.id === groupId) return group;
      if (group.children?.length) {
        const found = findGroupById(groupId, group.children);
        if (found) return found;
      }
    }
    return null;
  };

  /** Add a child group to a parent group by ID.   */
  const addChildToGroup = (parentId, child) => {
    const parentGroup = findGroupById(parentId);
    if (parentGroup) {
      parentGroup.children.push(child);
    } else {
      console.warn(`Parent group with ID ${parentId} not found.`);
    }
  };

  /** Remove a group by its ID.*/
  const removeGroup = (groupId) => {
    const removeRecursive = (groupId, groupList) => {
      const index = groupList.findIndex((group) => group.id === groupId);
      if (index !== -1) {
        groupList.splice(index, 1); 
        return true;
      }
      for (const group of groupList) {
        if (group.children?.length) {
          const removed = removeRecursive(groupId, group.children);
          if (removed) return true;
        }
      }
      return false;
    };

    const removed = removeRecursive(groupId, groups);
    if (!removed) {
      console.warn(`Group with ID ${groupId} not found.`);
    }
  };

  /** Edit the name of a group by its ID.   */
  const editGroupName = (groupId, newName) => {
    const group = findGroupById(groupId);
    if (group) {
      group.name = newName;
    } else {
      console.warn(`Group with ID ${groupId} not found.`);
    }
  };

  /** saving to external storage.  */
  const persistChanges = () => {
    console.log("Updated group hierarchy:", JSON.stringify(groups, null, 2));
  };

  return {
    groups,
    findGroupById,
    addChildToGroup,
    removeGroup,
    editGroupName,
    persistChanges,
  };
};