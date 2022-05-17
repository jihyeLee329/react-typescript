import { useRecoilValue } from "recoil"
import {toDoSelector, toDoState} from '../atoms'
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

export default function ToDoList (){
    const [toDo, doing, done] = useRecoilValue(toDoSelector)
    // const value = useRecoilValue(toDoState); //atom에 있는 default 값 불러오기
    // const modFn = useSetRecoilState(toDoState); //atom 에 있는 default 값 변경 함수
    return (
    <div>
        <h1>To Dos</h1>
        {/* onSubmit= {handleSubmit(내가만든Fn)} , handleSubmit 함수가 data를 검사하고, data가 유효하면 내가만든 함수를 호출할거임*/}
        <hr/>
        <CreateToDo />
        <h2>To Do</h2>
        <ul>
            {toDo.map(toDo => 
            <ToDo key={toDo.id} {...toDo} />
            )}
        </ul>
        <hr /> 
        <h2>Doing</h2>
        <ul>
            {doing.map(toDo => 
            <ToDo key={toDo.id} {...toDo} />
            )}
        </ul>
        <hr />
        <h2>Done</h2>
        <ul>
            {done.map(toDo => 
            <ToDo key={toDo.id} {...toDo} />
            )}
        </ul>
    </div>
    )
}