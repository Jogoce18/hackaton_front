import dayjs from "dayjs";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../contexts/UserContext.js";
import { useContext, useState } from "react";
import NewNote from "./NewNote.js";
import MDEditor from "@uiw/react-md-editor";

export default function Note ({ name, description, date, setCurrentPage, pages}) {
    const {token} = useContext(UserContext);
    const [edit,setEdit] = useState(false);

    function deleteMarkdown(date){

        const promise = axios.delete(`https://firsthackaton.herokuapp.com/notas/${date}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        promise.then(()=>{
            alert("Deletado com sucesso!")
        });

        promise.catch(Error=>{
            alert(Error.response.data.message);
        })
    }

    function editMarkdown(event,name,description,date){
        event.preventDefault();

        const body = {
            name,
            description
        }

        const promise = axios.patch(`https://firsthackaton.herokuapp.com/notas/${date}`,body,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        promise.then(()=>{
            alert("Editado com sucesso!")
        });

        promise.catch(Error=>{
            alert(Error.response.data.message);
        })
    }

    return (
            
            <NoteF>
                <Notetext1>
                    {name}
                </Notetext1>
                <h3>{dayjs(date).format('DD/MM')}</h3>
                <MDEditor.Markdown source={description} style={{ whiteSpace: 'pre-wrap' }} />
                <Button onClick={()=>deleteMarkdown(date)} >Delete</Button>
                <Button1 onClick={()=>setEdit(true)}>Edit</Button1>
                {
                    edit ? <NewNote setEdit={setEdit} edit={true} nameE={name} descriptionE={description} teste={(event,name,description)=>editMarkdown(event,name,description,date)} /> : ''
                }
            </NoteF>
           
       
    )
}

const Container=styled.div`

`

const Prev=styled.div`
    ion-icon {
        font-size: 40px;
    }
`

const Next=styled.div`
font-size: 1.9rem;
padding-bottom: 7px;
position: relative;
display: inline;
`
const NoteF=styled.div`
background: #fff;
padding: 1rem 1.5rem 1rem;
width: 32rem;
box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
border-radius: 5px;
margin: 1rem 2rem;
font-family: 'Urbanist', sans-serif;
    `
const Notetext=styled.div`
font-size: 1.3rem;
letter-spacing: 0.5px;
padding: 1rem 0;
font-family: 'Urbanist', sans-serif;
        `
const Notetext1=styled.div`
font-size: 1.3rem;
letter-spacing: 0.5px;
padding: 1rem 0;
font-weight: bold;
font-family: 'Urbanist', sans-serif;

        `
   
const Button1=styled.button`
            padding: 8px 15px;
            letter-spacing: 1px;
            font-size: 15px;
            border: none;
            outline: none;
            cursor: pointer;
            border-radius: 5px;
            background: rgb(135, 206, 250);
            color: rgb(66, 65, 65);
       
        .Button:hover{
            background: darkgoldenrod;
            transition: all 0.4s;
            color: #fff;
        }
        `
    const Button=styled.button`
            padding: 8px 15px;
            letter-spacing: 1px;
            font-size: 15px;
            border: none;
            outline: none;
            cursor: pointer;
            border-radius: 5px;
            background: rgb(135, 206, 250);
            color: rgb(33, 65, 6);
            margin:5px;
        
        .Button:hover{
            background: darkgoldenrod;
            transition: all 0.4s;
            color: #fff;
        }
        `