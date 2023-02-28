import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  width: 1000px;
  column-gap: 10px;
  row-gap: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 50px auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
`;

const MainTitle = styled.h1`
  display: block;
  text-align: center;
  max-width: 100%;
  font-weight: 500;
  font-size: 25px;
  margin-bottom: 35px;
`;

const NewBoardInput = styled.input`
  width: 300px;
  margin-bottom: 35px;
  border: none;
  border-bottom: 1px solid white;
  border-radius: 5px;
  height: 30px;
  text-align: center;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;

    if (destination?.droppableId === source.droppableId) {
      // we're moving in the same board.
      setToDos((oldToDos) => {
        const boardCopy = [...oldToDos[source.droppableId]];
        const spliced = boardCopy.splice(source.index, 1)[0];
        boardCopy.splice(destination?.index as any, 0, spliced);
        return { ...oldToDos, [source.droppableId]: boardCopy };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      // we're moving across different boards.
      setToDos((oldToDos) => {
        const sourceCopy = [...oldToDos[source.droppableId]];
        const destinationCopy = [...oldToDos[destination.droppableId]];
        const spliced = sourceCopy.splice(source.index, 1)[0];
        destinationCopy.splice(destination.index, 0, spliced);
        return {
          ...oldToDos,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: destinationCopy,
        };
      });
    }
  };

  const { register, setValue, getValues, handleSubmit } = useForm();
  const setToDoState = useSetRecoilState(toDoState);
  const onValid = () => {
    const title = getValues("newBoard");
    setToDoState((allBoards) => {
      return { ...allBoards, [title]: [] };
    });
    setValue("newBoard", "");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <MainTitle>📌 To Do List Kanban Board</MainTitle>
        <form onSubmit={handleSubmit(onValid)}>
          <NewBoardInput placeholder="add a new board!" type="text" {...register("newBoard")} />
        </form>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
