import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {toDoState ,IToDo, categoryState } from '../atoms'


interface IForm {
    toDo : string,
    category :string
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const onSubmit = ({toDo}:IForm)=>{
       setToDos((oldToDos)=>[
           {text:toDo, id:Date.now(), category},
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
