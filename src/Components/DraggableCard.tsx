import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 8px;
`;

interface IDraggableProps {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDraggableProps) {
  //   console.log(toDo, "has been rendered.");
  return (
    <Draggable draggableId={toDo} index={index} key={toDo}>
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
