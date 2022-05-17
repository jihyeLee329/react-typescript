import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import {toDoState ,IToDo } from '../atoms'


interface IForm {
    toDo : string
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const onSubmit = ({toDo}:IForm)=>{
       setToDos((oldToDos)=>[
           {text:toDo, id:Date.now(), category:"TO_DO"},
           ...oldToDos, 
        ])
       setValue("toDo",""); //input 값 초기화
    };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add </button>
    </form>
  );
}
export default CreateToDo;
