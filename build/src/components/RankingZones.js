import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import countryFoods from "../data/countries";
import React from "react";

export default function GamePage() {
  const { category, countryCode } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gameMode = searchParams.get("game");
  const navigate = useNavigate();

  const images = useMemo(() => countryFoods[countryCode] || [], [countryCode]);
  const [rankedFoods, setRankedFoods] = useState([null, null, null, null, null]); // 5 ranking slots

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    setRankedFoods((prevRanked) => {
      const newRanking = [...prevRanked];
      const draggedItem = newRanking.splice(source.index, 1)[0];
      newRanking.splice(destination.index, 0, draggedItem);
      return newRanking;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold text-yellow-500">
          {countryCode ? countryCode.toUpperCase() : "Select a Country"}
        </h1>
        <p className="text-lg mb-4">
          {gameMode === "ranking" ? "🔢 Rank these traditional dishes!" : "⚖️ Compare these delicious foods!"}
        </p>

        {/* Table for ranking zones */}
        <Droppable droppableId="food-list" direction="vertical">
          {(provided) => (
            <table
              className="w-full max-w-2xl mx-auto table-auto"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <thead>
                <tr>
                  <th className="px-4 py-2">Food</th>
                  <th className="px-4 py-2">Rank</th>
                </tr>
              </thead>
              <tbody>
                {images.map((food, index) => (
                  <Draggable key={food.id} draggableId={food.id} index={index}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border-t-2 border-b-2 border-gray-300"
                      >
                        <td className="px-4 py-2 flex items-center">
                          <img
                            src={food.src}
                            alt={food.name}
                            className="w-12 h-12 object-cover rounded-md mr-4"
                          />
                          {food.name}
                        </td>
                        <td className="px-4 py-2">Rank {index + 1}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
              </tbody>
            </table>
          )}
        </Droppable>

        {/* Ranking Zones 1-5 */}
        <div className="mt-6 space-y-4">
          {rankedFoods.map((food, index) => (
            <Droppable key={index} droppableId={`rank-${index}`} direction="vertical">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="border-2 border-dashed border-gray-400 p-4 flex justify-center items-center min-h-[80px] rounded-lg"
                >
                  <p className="text-gray-600 font-bold mr-4">Rank {index + 1}:</p>
                  {food ? (
                    <Draggable draggableId={food.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-2 bg-yellow-300 rounded-lg shadow-md"
                        >
                          {food.name}
                        </div>
                      )}
                    </Draggable>
                  ) : (
                    <p className="text-gray-400">Drag food here</p>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>

        <button
          onClick={() => navigate(`/game/countries?game=${gameMode}`)}
          className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-xl shadow-lg transition-all transform hover:bg-gray-700 hover:scale-105 active:scale-95"
        >
          ⬅️ Back to Countries
        </button>
      </div>
    </DragDropContext>
  );
}
