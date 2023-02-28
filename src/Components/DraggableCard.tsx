import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging ? "#74b9ff" : props.theme.cardColor)};
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 8px;
  box-shadow: ${(props) => (props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.1)" : "none")};
  font-size: 15px;
`;

const DeleteButton = styled.button`
  border: none;
  background-color: ${(props) => props.theme.cardColor};
  margin-left: 5px;
`;

interface IDraggableProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DraggableCard({ toDoId, toDoText, index, boardId }: IDraggableProps) {
  const [ToDoState, setToDoState] = useRecoilState(toDoState);
  const deleteCard = (id: number) => {
    setToDoState((oldBoards) => {
      const copyBoard = [...oldBoards[boardId]];
      const findItemIndex = copyBoard.findIndex((value) => value.id === id);
      copyBoard.splice(findItemIndex, 1);
      return { ...oldBoards, [boardId]: copyBoard };
    });
  };
  //   const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     const a = Number(event.currentTarget.id);
  //     console.log(ToDoState);
  //     setToDoState((oldToDos) => {
  //         const targetIndex = oldToDos.boardId.findIndex((toDo) => toDo.id === a)
  //     }
  //     }
  return (
    <Draggable draggableId={toDoId + ""} index={index} key={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
          <DeleteButton id={toDoId + ""} onClick={() => deleteCard(toDoId)}>
            🗑️
          </DeleteButton>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
