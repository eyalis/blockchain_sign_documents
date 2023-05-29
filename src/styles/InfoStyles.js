import styled from 'styled-components';

export const Wrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #FFF;
  padding: 2rem 0;
  color: #333;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1rem;

  p {
    font-size: 1rem;
    color: #666;
    line-height: 1.5;
    font-family: Arial, sans-serif;
  }
  
  ul {
    list-style: disc;
    margin-left: 20px;
  }
  
  li {
    font-size: 1rem;
    color: #666;
    line-height: 1.5;
    font-family: Arial, sans-serif;
  }

.info-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.info-content__header {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

.info-content__text {
    font-size: 16px;
    line-height: 1.5;
    color: #666;
    margin-bottom: 20px;
}
`;