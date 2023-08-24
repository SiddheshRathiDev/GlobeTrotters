import { useEffect, useState } from "react";
import Post from "./post";
import { createUrl } from "../utils/utils";
import axios from "axios";

import { useDispatch, useSelector } from 'react-redux';

export default function GetIndividualsPost () {
    const [postIdArray, setPostIdArray] = useState([1, 2])
    const loginStatus = useSelector((state) => state.auth.status);
    var userId = useSelector((state) => state.auth.userId);
    var arr = [];

    useEffect(  () => {
        const path = createUrl("/api/posts/getIndividualPost/"+userId);
        axios.get(path)
        .then((resp) => {
            console.log(resp.data)
            setPostIdArray(resp.data);
        })

       
    }

        ,[]
    )


    const getSome = async () => {
        const path = createUrl("/api/posts/getIndividualPost/"+userId);

        const response = await axios.get(path)
        console.log("1=> " +response.data);
        setPostIdArray(response.data);

        arr = response.body;
    }

    

    
   
    return (
        <>
           {console.log(2)}
           {arr.map((ele) => Post(ele))}
           {console.log(3)}
        </>
    );
}