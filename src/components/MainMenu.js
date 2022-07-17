import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import Note from './Note'
import { mobile } from './Responsive';
import Logo from "./../assets/icons8-notes-100.png";

export default function MainMenu () {
    const [notes, setNotes] = useState([]);
    const { user,token} = useContext(UserContext);
    const navigate = useNavigate();
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

	}, [notes]);


    function goHome () {
      navigate('/')
    }

    function addNote () {
      navigate('/newnote')
    }

    const Slider = () => {
      const [slideIndex, setSlideIndex] = useState(0);
      const handleClick = (direction) => {
        if (direction === "left") {
          setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
          setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
      }
    };

    return (
        <>
      <Header>
      <Wrapper>
       <Left>
      <img src={Logo} alt="Logo" onClick={goHome} />
        </Left>
     
         <Center>
          <Nogo>WRITE IT!</Nogo>
          <Button onClick={addNote}>+</Button>
        </Center>
        <Right>
          <MenuItem>
          {
            login ? <h2>Oi, { user.name }! </h2> : <h2></h2>
          } 
          </MenuItem>
          <MenuItem onClick={() => navigate('/sign-up')}>REGISTER</MenuItem>
          <MenuItem onClick={() => navigate('/login')}>SIGN IN</MenuItem>
        </Right>
        </Wrapper>
     </Header>
       <Container>
            <ion-icon name="arrow-back-circle-outline" direction="left" onClick={() => handleClick("left")}></ion-icon>
            <Notes>
        
            {
                notes.length > 0 ? notes.map((note, index) => <Note key={index} name={note.name} description={note.description} date={note.noteId}/> )
                : <h2>Você não possui nenhuma nota!</h2>
            }
            </Notes>
            <ion-icon name="arrow-forward-circle-outline" direction="right" onClick={() => handleClick("right")}></ion-icon>
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

const Button=styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 5px;
  border: 2px black solid;
  background-color: #ffd1dc;
  opacity: 0.6;
  font-size: 20px;
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  font-weight: bold;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  font-family: 'inspire';
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Nogo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Notetext= styled.h2 `
  margin-bottom: 20px;
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
    gap:5px;

    ion-icon {
      width: 50px;
      height: 50px;
      background-color: #fff7f7;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      bottom: 0;
      left: ${(props) => props.direction === "left" && "10px"};
      right: ${(props) => props.direction === "right" && "10px"};
      margin: auto;
      cursor: pointer;
      opacity: 0.5;
      z-index: 2;
    }
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