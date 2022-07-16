
import axios from 'axios';
import { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
export default function NewNote () {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
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
         promise.then((res) => {
             navigate('/')
         })
         promise.catch((err) => {
             alert('Algo deu errado! Tente novamente.')
         })
     }
    

    return (
        <Container>
            <h2>Nova tarefa!</h2>
            <Form>
            <input
                    type="text"
                    placeholder="Nome da sua anotação"
                    value={name}
                    required                    
                    onChange={e => setName(e.target.value)} 
            />
            <input
                type="text"
                placeholder="Fale um pouquinho sobre sua anotação"
                value={description}
                required                    
                onChange={e => setDescription(e.target.value)} 
            />
            <Button type="submit">
                <p>Salvar entrada</p>
            </Button>            
            </Form>
        </Container>
    )
}

const Container=styled.div``

const Form=styled.form``

const Button=styled.button``