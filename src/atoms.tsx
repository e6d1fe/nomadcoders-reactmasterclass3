import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface IToDo {
  id: number;
  text: string;
}

export const minuteState = atom({
  key: "minutes",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    "In Progress": [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
