import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #FFFFFF;
  padding: 2rem 0;
  color: #333;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1rem;

  p {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.5;
    font-family: Arial, sans-serif;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Input = styled.input`
  font-size: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: all 0.2s;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }
`;

export const Button = styled.button`
  font-size: 1rem;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0062cc;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
  font-size: 0.9rem;
  font-family: Arial, sans-serif;
`;
