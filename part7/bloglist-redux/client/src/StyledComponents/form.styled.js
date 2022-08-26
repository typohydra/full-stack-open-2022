import styled from 'styled-components'

export const Form = styled.form`
  display:flex;
  flex-direction: column;
  gap: 5px;
  font-size: 17px;
  max-width: 400px;
  margin: 10px auto;
  input {
    height: 20px;
    border-radius: 3px;
    border: inset;
  }
  label {
    display:flex;
    gap: 10px;
    >input {
      flex-grow: 1;
    }
  }
`

export const CommentForm = styled.form`
  display:flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  font-size: 17px;
  margin: 10px auto;
  input {
    flex-grow: 1;
    height: 23px;
    border-radius: 3px;
    border: inset;
  }
  label {
    display:flex;
    gap: 10px;
    >input {
      flex-grow: 1;
    }
  }
`

export const Button = styled.button`
  min-height: 30px;
  border-radius: 3px;
  background: SteelBlue;
  color: white;
  border: none;
  font-weight: bold;
  padding: 0px 20px;
  margin: 3px 0px;
  &:hover {
    background: #509bd9;
  }
`

// general button
export const ButtonGen = styled.button`
  min-height: 25px;
  border-radius: 3px;
  background: lightgray;
  color: black;
  border: none;
  font-weight: bold;
  padding: 0px 20px;
  margin: 3px 2px;
  &:hover {
    background: #e6e6e6;
  }
`