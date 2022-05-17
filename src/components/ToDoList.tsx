import React from "react";
import { useRecoilState, useRecoilValue } from "recoil"
import {Categories, categoryState, toDoSelector, toDoState} from '../atoms'
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()


export default function ToDoList (){
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event:React.FormEvent<HTMLSelectElement>)=>{
        setCategory(event.currentTarget.value as any);
    }
    // const value = useRecoilValue(toDoState); //atom에 있는 default 값 불러오기
    // const modFn = useSetRecoilState(toDoState); //atom 에 있는 default 값 변경 함수
    return (
    <div>
        <h1>To Dos</h1>
        {/* onSubmit= {handleSubmit(내가만든Fn)} , handleSubmit 함수가 data를 검사하고, data가 유효하면 내가만든 함수를 호출할거임*/}
        <hr/>
        <select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
        </select>
        <CreateToDo />
        {toDos.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
    </div>
    )
}