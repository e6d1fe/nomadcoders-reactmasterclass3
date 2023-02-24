import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Backboard = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 0px 0px;
  padding-top: 15px;
  border-radius: 5px;
  min-height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 17px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "none"};
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
  padding: 20px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Backboard>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} index={index} toDo={toDo} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Backboard>
    // <div>
    //   <Title>{boardId}</Title>
    //   <Droppable droppableId={boardId}>
    //     {(provided) => (
    //       <Backboard ref={provided.innerRef} {...provided.droppableProps}>
    //         {toDos.map((toDo, index) => (
    //           <DraggableCard key={toDo} index={index} toDo={toDo} />
    //         ))}
    //         {provided.placeholder}
    //       </Backboard>
    //     )}
    //   </Droppable>
    // </div>
  );
}

export default Board;
