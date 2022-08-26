import styled from 'styled-components'

export const Ulist = styled.ul`
list-style-type: none;
padding:0;
margin: 10px 0px;
>* {
    padding: 5px 2px;
    border-bottom: solid 2px lightgray;
    word-break: break-all;
    width: 100%;
  }
`