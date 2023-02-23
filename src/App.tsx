import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    // console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // we're moving in the same board.
      setToDos((oldToDos) => {
        const boardCopy = [...oldToDos[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index as any, 0, draggableId);
        return { ...oldToDos, [source.droppableId]: boardCopy };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // we're moving across different boards.
      setToDos((oldToDos) => {
        const sourceCopy = [...oldToDos[source.droppableId]];
        const destinationCopy = [...oldToDos[destination.droppableId]];
        sourceCopy.splice(source.index, 1);
        destinationCopy.splice(destination.index, 0, draggableId);
        return {
          ...oldToDos,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: destinationCopy,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
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
