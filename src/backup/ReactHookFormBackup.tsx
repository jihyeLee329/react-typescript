import React, { useState } from "react"
import { useForm } from "react-hook-form";


interface IForm {
    email: string,
    ID: string,
    password:string,
    password1:string,
    extraError?:string
}

export default function ToDoList (){
    // const [toDO, setToDo] = useState("");
    // const onChange = (event:React.FormEvent<HTMLInputElement>)=>{
    //     const {
    //         currentTarget : {value},
    //     } = event;
    //     setToDo(value);
    // };
    // const onSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
    //     event.preventDefault();
    //     console.log(toDO);
    // }
    // return (
    // <div>
    //     <form onSubmit={onSubmit}>
    //         <input value={toDO} onChange= {onChange} placeholder="Write a to do" />
    //         <button>Add </button>
    //     </form>
    // </div>

    //register 함수가 onChange, onSubmit, 이런것들 다 해줄거임
    // 그래서 이벤트핸들러 필요 없음, 그래서 props, setState 필요없음
    const {register, handleSubmit, formState:{errors}, setError} = useForm<IForm>({
        defaultValues:{
            email:"@naver.com"
        }
    }); 
    //아래의 onValid 함수는 react-hook-form이 모든 validation을 맞쳤을 때만 호출
    const onValid = (data:IForm) =>{
       if(data.password !== data.password1){
        setError("password1", {
            message :"Password are not the same"
        },
        {shouldFocus:true},
    //    setError("extraError",{
    //        message :" Server offline"
       )
    }
    }
    const onInValid = () =>{
        console.log('다 입력해')
    }

    //1. register 함수에는 인자로 문자열이 필요함
    // register(문자)  이거를 필요한 input에 스프레드연산자를 사용해 모두 넘겨준다.
    // register 함수가 반환하는 객체를 input에 props로 줌. 
    
    //2. watch 는 내가 form의 입력값들의 변화를 관찰 할 수 있게 해주는 함수 
    // 내가 입력한 값들을 추적할 수 있음. => 입력즉시 변환된 값을 반영하여 보여줌
    
    // 3.handleSubmit은 validation을 담당 함. preventDefault도 하고, 
    // 그리고 나서 우리가 작성한 코드가 진행될 수 있게 해줌
    // handleSubmit 은 두개의 인자가 필요한데, 하나는 데이터가 유효할 때 호출되는 함수(onValid 필수). 
    // 2번째는 유효하지 않을 떄 호출되는 함수(onInValid 필수아님)

    // 4. formState 는 
    console.log(errors)
    return(
        <div>
            <form style={{ display:"flex", flexDirection:"column"}} onSubmit={handleSubmit(onValid)}>
                <input {...register("email", 
                {
                    required  : "Email is required", 
                    minLength:10,
                    pattern : {
                        value: /^[A-Za-z0-9._%+-]+@naver.com/g,
                        message: "Only naver.com emails allowed"
                    }
                }
                )} placeholder="Email" />
                <span>
                    {errors?.email?.message}
                </span>
                <input {...register("ID", {
                    required  : "ID is required" ,
                    // minLength:{
                    //     value:5, 
                    //     message:"Your ID is too short"
                    // },
                    validate:(value)=> value.includes("nico") ? "no nicos allowed" : true,  //nico 라는 value 값을 포함하지 않을때만 true
                    //validate 는 함수를 값으로 가지고,  인자로 항목에 현재 쓰여지고 있는 값을 받을거임
                    // 글고 true/false 로 반환할건데 true이면 항상 검사 통과, false 이면 항상 불통
                   
                }
                )} placeholder="ID" />
                <span>
                    {errors?.ID?.message}
                </span>
                <input {...register("password", 
                {required  : "Password is required" , 
                // minLength:{
                //     value : 5, 
                //     message : "Your password is too short"
                // },
                validate : {
                    noNico : (value)=> value.includes("nico") ? "no nicos allowed" : true, 
                    values : (value) => value.length >5 ? true: "Password is too short"
                }
                })} placeholder="password" />
                <span>
                    {errors?.password?.message}
                </span>
                <input {...register("password1", 
                {required  : "Password1 is required" , minLength:{
                    value : 5, 
                    message : "Your password is too short"
                },})} placeholder="password1" />
                <span>
                    {errors?.password1?.message}
                </span>
                
                <button>Add </button>
                <span>
                    {errors?.extraError?.message}
                </span>
            </form>
        </div>
    )

}