import React from "react";

interface ItemListProps {
  items: { id: number; type: string; name: string }[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default ItemList;
