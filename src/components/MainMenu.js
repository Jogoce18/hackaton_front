import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import Note from './Note'
import { mobile } from './Resnposive';
import Logo from "./../assets/icons8-notes-100.png";


export default function MainMenu () {
    const [notes, setNotes] = useState([]);
    const { user,token } = useContext(UserContext);
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
         })
	}, []);

    
	// useEffect(() => {
	// 	const promise = axios.get('https://firsthackaton.herokuapp.com/notas', {headers: {Authorization: `Bearer ${user.token}`}});
    //     promise.then((res) => {
	// 		setNotes(res.data);
    //      setLogin(true)
	// 	});
    //     promise.catch((err) => {
    //         alert('Algo deu errado! Tente novamente.')
    //     })
	// }, []);


    const pages = Math.ceil(notes.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = notes.slice(startIndex, endIndex);
    function goHome() {
		navigate("/");
	}

    return (
        <>
      <Header>
      <Wrapper>
       <Left>
      <img src={Logo} alt="Logo" onClick={goHome} />
        </Left>
     
         <Center>
          <Nogo>WRITE IT!</Nogo>
        </Center>
        <Right>
          <MenuItem onClick={() => navigate('/sign-up')}>REGISTER</MenuItem>
          <MenuItem onClick={() => navigate('/login')}>SIGN IN</MenuItem>
        </Right>
        </Wrapper>
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
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  ${mobile({ padding: "10px 0px" })}
  img {
    width: 75px;
}

`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;


const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  font-family: 'inspire';
`;

const Nogo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const Header=styled.div`
    width: 100%;
    height: 80px;
    background-color: #B5D3E7;
    border-radius: 5px;
    margin-top: 50px;
    color: #000;
    font-size: 20px;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
    ),
    url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst2.depositphotos.com%2F2673669%2F7343%2Fv%2F950%2Fdepositphotos_73438117-stock-illustration-sticky-notes-wallpaper.jpg&f=1&nofb=1")
        center;
background-size: cover;
	

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
