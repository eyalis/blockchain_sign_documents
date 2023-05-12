import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: sans-serif;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
  font-size: 1rem;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0062cc;
  }
`;
