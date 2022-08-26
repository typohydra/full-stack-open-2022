import styled from 'styled-components'

export const CenteredBox = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  text-align: center;
`

export const Page = styled.div`
  max-width: 700px;
  margin: auto;
`

export const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items:center;
  flex-wrap: wrap;
  padding: 15px;
  text-align: center;
  background-color: lightgray;
  margin-bottom: 20px;
  gap: 5px;
  font-size: 18px;
  a {
    text-decoration: none;
    color: black;
  }
  a:hover {
    color: SteelBlue;
  }
`

export const BlogDisplay = styled.div`
  >h1 {
    margin: 5px 0px;
  }
  background:  #f2f2f2;
  padding: 20px;
  margin: 20px 0px;
  word-break: break-all;
`