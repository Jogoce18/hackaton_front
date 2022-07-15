import dayjs from "dayjs";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../contexts/UserContext.js";
import { useContext } from "react";

export default function Note ({ name, description, date, setCurrentPage, pages}) {
    const {token} = useContext(UserContext);
    const id = 1;

    function deleteMarkdown(){
        const promise = axios.delete(`https://firsthackaton.herokuapp.com/notas/${id}`,{
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

    function editMarkdown(){
        const body = {
            name,
            description
        }

        const promise = axios.patch(`https://firsthackaton.herokuapp.com/notas/${id}`,body,{
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
        <Container>
            <Prev><ion-icon name="arrow-back-circle-outline" onClick={() => setCurrentPage(pages - 1)}></ion-icon></Prev>
            <Note>
                <div>
                    {name}
                    dayjs({date}).format('DD/MM')
                </div>
                <div>
                    {description}
                </div>
            </Note>
            <Next><ion-icon name="arrow-forward-circle-outline" onClick={() => setCurrentPage(pages + 1)}></ion-icon></Next>
        </Container>
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
    ion-icon {
        font-size: 40px;
    }
`