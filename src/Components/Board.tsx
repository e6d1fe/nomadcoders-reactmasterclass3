import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

const Backboard = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 0px 0px;
  padding-top: 15px;
  border-radius: 5px;
  min-height: 350px;
  width: 320px;
  display: flex;
  flex-direction: column;
`;

const BoardTitle = styled.h2`
  text-align: center;
  font-weight: 500;
  margin-bottom: 10px;
  font-size: 17px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "none"};
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

const InputField = styled.input`
  border: none;
  padding: 8px;
  text-align: center;
  ::placeholder {
    color: lightgrey;
  }
`;

const DeleteBoardButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 7px;
  font-size: 11px;
  font-weight: 200;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

export interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDoState = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDoState((allBoards) => {
      return { ...allBoards, [boardId]: [...allBoards[boardId], newToDo] };
    });
    setValue("toDo", "");
  };

  const onClickDelete = () => {
    setToDoState((allBoards) => {
      const allBoardsCopy = { ...allBoards };
      delete allBoardsCopy[boardId];
      return { ...allBoardsCopy };
    });
  };

  return (
    <Backboard>
      <BoardTitle>{boardId}</BoardTitle>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputField
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`add a task to ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoText={toDo.text}
                toDoId={toDo.id}
                boardId={boardId}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
      <DeleteBoardButton onClick={onClickDelete}>DELETE BOARD</DeleteBoardButton>
    </Backboard>
  );
}

export default Board;
