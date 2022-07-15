import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import Note from './Note';

export default function MainMenu () {
    const [notes, setNotes] = useState([]);
    const { user,token} = useContext(UserContext);
    const navigate = useNavigate();
    const [itensPerPage, setItensPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(0);
    const [login, setLogin]  = useState(false);

	useEffect(() => {
        if(token){
            setLogin(true);
        }
	    const promise = axios.get('https://firsthackaton.herokuapp.com/notas', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        promise.then((res) => {
	 	    setNotes(res.data);
	 	});

        promise.catch(Error => {
             alert(Error.response.data.message)
         });

	}, []);

    const pages = Math.ceil(notes.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = notes.slice(startIndex, endIndex);

    return (
        <>
       <Header>
            <h2 onClick={() => navigate('/login')}>Login</h2>
            <ion-icon name="log-in-outline" onClick={() => navigate('/login')}></ion-icon>
            {
                login ? <h2>Oi, { user }! </h2> : <h2>Bem-vinda(o)!</h2>
            }   
            <h2 onClick={() => navigate('/sign-up')}>Cadastro</h2>
       </Header>
       <Container>
            <Notes>
            {
                currentItens.length > 0 ? currentItens.map((note, index) => <Note key={index} name={note.name} description={note.description} date={note.noteId} setCurrentPage={setCurrentPage} pages={pages}/> )
                : <h2>Você não possui nenhuma nota!</h2>
            }
            </Notes>
       </Container>
       </>
    )
}


const Header=styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: #B5D3E7;
    border-radius: 5px;
    margin-top: 50px;
    color: #000;
    font-size: 20px;
    

    ion-icon {
        font-size: 60px;
    }
`

const Container=styled.div`
    width: 100%;
    height: 100%;
    margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F402%2F828%2Foriginal%2Fvector-collection-of-sticky-note-illustrations.jpg&f=1&nofb=1");
`


const Notes=styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: #B5D3E7;
    border-radius: 5px;
`
