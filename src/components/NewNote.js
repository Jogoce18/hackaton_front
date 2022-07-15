
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


export default function NewNote () {

    const [data, setData] = useState({name: "", description: ""})
    const navigate = useNavigate();

    // function sendNote (event) {
    //     event.preventDefault();
    //     const promise = axios.post('https://firsthackaton.herokuapp.com/notas', {
    //         name: data.name,
    //         description: data.description
    //     }, {
    //         headers: {Authorization: `Bearer ${token}`}});
    //     promise.then((res) => {
    //         navigate('/')
    //     })
    //     promise.catch((err) => {
    //         alert('Algo deu errado! Tente novamente.')
    //     })
    // }
    

    return (
        <Container>
            <h2>Nova tarefa!</h2>
            <Form>
            <input
                    type="text"
                    placeholder="Nome da sua anotação"
                    value={data.name}
                    required                    
                    onChange={(e) => setData({...data, name: e.target.value})} 
            />
            <input
                type="text"
                placeholder="Fale um pouquinho sobre sua anotação"
                value={data.description}
                required                    
                onChange={(e) => setData({...data, description: e.target.value})} 
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