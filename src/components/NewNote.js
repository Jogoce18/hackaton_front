import axios from 'axios';
import { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import { IoPencil } from 'react-icons/io5'

export default function NewNote ({setEdit,edit,nameE,descriptionE,teste}) {
    const [name,setName] = useState(nameE);
    const [description,setDescription] = useState(descriptionE);
    const {token} = useContext(UserContext);
    const navigate = useNavigate();

    function sendNote (event) {
        event.preventDefault();
        
        const body = {
            name,
            description
        }

        const promise = axios.post('https://firsthackaton.herokuapp.com/notas', body, {
             headers: {
                Authorization: `Bearer ${token}`
            }
        });
         promise.then(() => {
             navigate('/')
         })
         promise.catch(Error=>{
			alert(Error.response.data.message)
		});
     }


    return (
        <Container>
            {
                edit ? 
            <Form>
                <Formcontrol>  
                <label for="title">Title</label>
                
                <Input
                        type="text" id="text" placeholder="Enter your title" autocomplete="off" name="title"
                        value={name}
                        required                    
                        onChange={e => setName(e.target.value)}
                />
                </Formcontrol>
                <Formcontrol> 
                <label for="desc">Description</label>
                <Input
                    type="text"
                    placeholder="Description"
                    value={description}
                    required                    
                    onChange={e => setDescription(e.target.value)}
                />
                </Formcontrol>
                    <Button type="submit" onClick={(event)=>teste(event,name,description)}>
                        <p><IoPencil /></p>
                    </Button>    
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Button1 onClick={()=>setEdit(false)} >Back</Button1> 
                </Link>
            </Form>
            :
            <Form>
                <Formcontrol>  
                <label for="title">Title</label>
                
                <Input
                        type="text" id="text" placeholder="Enter your title" autocomplete="off" name="title"
                        value={name}
                        required                    
                        onChange={e => setName(e.target.value)}
                />
                </Formcontrol>
                <Formcontrol> 
                <label for="desc">Description</label>
                <Input
                    type="text"
                    placeholder="Description"
                    value={description}
                    required                    
                    onChange={e => setDescription(e.target.value)}
                />
                </Formcontrol>
                    <Button type="submit" onClick={sendNote}>
                        <p>+</p>
                    </Button>    
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Button1 type="submit" >Back</Button1> 
                </Link>
            </Form>
            } 
        </Container>
    )
}

const Container=styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
padding: 4rem 0 0 0;

`

const Form=styled.form`
width: 500px;
background-color: #ffffff;
padding: 1rem 2rem;
box-shadow: 0px 0px 10px #000 ;
font-family: 'Urbanist', sans-serif;
border-radius: 10px;`

const Formcontrol=styled.div`
    display: flex;
    flex-direction: column;
    margin: 1.5rem 0;
   
    `
const Input = styled.input`
        padding: 10px 0 ;
        width: 100%;
        font-size: 18px;
        letter-spacing: 1px;
        border: 0;
        border-bottom: 2px solid rgb(135, 206, 250);
        background-color: transparent;
        outline: none;
        `;


const Button=styled.button`

    width: 60px;
    height: 30px;
    border-radius: 5px;
    outline: none;
    border: none;
    box-shadow: 0 0 5px #000;
    background-color: #fff;
    font-size: 25px;
    cursor: pointer;
    display: block;
    margin-left: auto;

   submit:hover{
    background-color: #fff;
    box-shadow: 0 0 10px rgb(241, 241, 43);
    transition: all 0.5s;
    border: 2px solid rgb(241, 241, 43);
}`

const Button1=styled.button`
            padding: 8px 15px;
            letter-spacing: 1px;
            font-size: 25px;
            border: none;
            outline: none;
            cursor: pointer;
            border-radius: 5px;
            background: rgb(135, 206, 250);
            color: rgb(66, 65, 65);
        
        .submit:hover{
            background: darkgoldenrod;
            transition: all 0.4s;
            color: #fff;
        }
`