// Dashboard.jsx
import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const cards = [
  { id: "revenue", content: "Total Revenue: $1,250.00" },
  { id: "customers", content: "New Customers: 1,234" },
  { id: "accounts", content: "Active Accounts: 45,678" },
  { id: "growth", content: "Growth Rate: 4.5%" },
  { id: "graph", content: "📊 Chart Widget Placeholder" },
];

function SortableItem({ id, content }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "20px",
    margin: "10px 0",
    borderRadius: "10px",
    background: "#f8f8f8",
    border: "1px solid #ddd",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {content}
    </div>
  );
}

export default function Dashboard() {
  const [items, setItems] = React.useState(cards);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          setItems((items) => arrayMove(items, oldIndex, newIndex));
        }
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id} content={item.content} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
