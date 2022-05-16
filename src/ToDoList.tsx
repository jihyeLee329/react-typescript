import React, { useState } from "react"
import { useForm } from "react-hook-form";


interface IForm {
toDo : string
}

export default function ToDoList (){
    const {register, handleSubmit, setValue} =useForm<IForm>();
    const onSubmit = (data:IForm)=>{
        console.log('add to do', data.toDo);
        setValue("toDo", ""); //setValue = 값을 초기화해준다. 
    }
    return (
    <div>
        {/* onSubmit= {handleSubmit(내가만든Fn)} , handleSubmit 함수가 data를 검사하고, data가 유효하면 내가만든 함수를 호출할거임*/}
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("toDo", {
                required:"Please write a toDo",
            })} placeholder="Write a to do" />
            <button>Add </button>
        </form>
    </div>
    )
}