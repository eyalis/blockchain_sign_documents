import styled from 'styled-components';

export const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const ListItem = styled.li`
    border: 1px solid #ddd;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
`;

export const SignerStatus = styled.span`
    font-weight: ${props => props.signed ? 'bold' : 'normal'};
    color: ${props => props.signed ? '#4CAF50' : '#F44336'};
`;
