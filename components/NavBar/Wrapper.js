import styled from "styled-components"

const Wrapper = styled.nav`
    padding: 10px 15px;
    background: #333;
    box-shadow: 0px 0px 1px 1px #403d3d;
    ul{
        margin : 0;
        li{
            display: inline-block;
            padding : 0 10px;
            margin : 0;
            a{
                font-size : 14px;
                color : #fff;
                &:hover{
                    color : #018dec;
                }
            }
        }
    }
`


export default Wrapper;