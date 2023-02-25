import { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { IToDo } from "../atoms";
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

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log(data);
    setValue("toDo", "");
  };
  return (
    <Backboard>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
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
              <DraggableCard key={toDo.id} index={index} toDoText={toDo.text} toDoId={toDo.id} />
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
