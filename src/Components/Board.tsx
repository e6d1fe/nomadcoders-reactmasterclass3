import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Backboard = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  padding-top: 15px;
  border-radius: 5px;
  min-height: 300px;
  width: 300px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
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
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} index={index} toDo={toDo} />
            ))}
            {provided.placeholder}
          </div>
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
