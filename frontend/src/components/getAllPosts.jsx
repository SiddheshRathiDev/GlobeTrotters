import Post from "./post";

import { useDispatch, useSelector } from 'react-redux';

export default function GetAllPosts () {
    const loginStatus = useSelector((state) => state.auth.status);
    
    var arr = [1, 2, 3, 4]
    return (
        <>
            
           {arr.map((ele) => Post(ele))}
        </>
    );
}