import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist';

//atom은 두 가지를 요구 함 
// 1. key, 고유의 이름이어야 함 
// 2. default 값. 
// 생성함 아톰은 어떤 컴포넌트던지 독립적이다 .
// atom 을 사용한 컴포넌트에서, atom을 관찰하다가 값 변경이 일어나면 리렌더링이 일어난다. 
// 연결하는 방법은 App으로 가서 useRecoilValue(생성한 atom)
// ex : const isDark = useRecoilValue(isDarkAtom);   
// 여기서 변수 isDark 는 false 값이 될 거임
// state 값을 변경하고자 할 때는  useSetRecoilState을 사용
// useSetRecoilState(atom)  이러면 setter 해줄 수 있는 함수를 받음
// ex : const setterFn = useSetRecoilState(isDarkAtom);  isDarkAtom의 state를 변경할 수 있는 함수를 받음
// value 변경 방식은 기존 setState 와 동일 함!  setterFn(true)  이런식으로
export const isDarkAtom = atom({
    key: "isDark",
    default : false,
});

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
    "DELETE" = "DELETE"
}

// selector 은 atom 의 output을 변형시키는 도구 
export interface IToDo{
    text:string,
    id:number,
    category : Categories;
}

export const categoryState = atom<Categories>({
    key:'category',
    default:Categories.TO_DO,
});



const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage,
});

export const toDoState = atom<IToDo[]>({
    key:'toDo',
    default:[],
    effects_UNSTABLE: [persistAtom],
})
// export const toDoList = atom({
//     key: 'toDoList',
//     default: [],
    
// });
// atom 의 아웃풋을 변경해주는게 selector() 인데, 
// get function 이 있어야 atom을 받을 수 있다. 
// 아래의 selector 은 toDoState라는 아톰을 바라보고 있고, 아톰이 변하면 selecotr도 변함

export const toDoSelector = selector({
    key:'toDoSelector',
    get:({get}) =>{
        const toDos = get(toDoState);
        const category = get(categoryState);
        return  toDos.filter(toDo => toDo.category === category);
    }
})
