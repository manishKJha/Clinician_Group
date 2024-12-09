import { reactive } from "vue";

export function useTree(treeData: any) {
  const addNode = (parent: { children: any[]; }, child: any) => {
    parent.children = parent.children || [];
    parent.children.push(child);
  };

  const deleteNode = (parent: { children: any[]; }, child: any) => {
    if (parent.children) {
      parent.children = parent.children.filter((node) => node !== child);
    }
  };

  return reactive({ addNode, deleteNode });
}