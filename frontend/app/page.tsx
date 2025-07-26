// app/page.tsx
"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableCard } from "../components/DraggableCard";

interface Card {
  id: string;
  title: string;
  content: string;
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>([
    { id: "1", title: "Card 1", content: "This is card 1" },
    { id: "2", title: "Card 2", content: "This is card 2" },
    { id: "3", title: "Card 3", content: "This is card 3" },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Draggable Cards</h1>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={cards.map((card) => card.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4 max-w-md mx-auto">
              {cards.map((card) => (
                <DraggableCard key={card.id} id={card.id}>
                  <h3 className="font-semibold text-lg">{card.title}</h3>
                  <p className="text-gray-600">{card.content}</p>
                </DraggableCard>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
