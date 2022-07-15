import styled from "styled-components";
import { mobile } from "./Responsive.js";

export default function AuthScreen(props) {
	return (
		<Container>
			<Wrapper>{props.children} </Wrapper>
		</Container>
	);
}

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F402%2F828%2Foriginal%2Fvector-collection-of-sticky-note-illustrations.jpg&f=1&nofb=1")
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: 40%;
	padding: 20px;
    border-radius: 1rem;
	background-color: #B5D3E7;
	${mobile({ width: "75%" })}
`;