// components/DroppableContainer.tsx
"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

interface ContainerProps {
  id: string;
  children: React.ReactNode;
}

export function DroppableContainer({ id, children }: ContainerProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[200px] p-4 border-2 border-dashed border-gray-300 rounded-lg"
    >
      <SortableContext items={[]} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </div>
  );
}
