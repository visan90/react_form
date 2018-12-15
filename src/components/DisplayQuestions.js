import React from 'react';
import Dropdown from 'react-dropdown';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import 'react-dropdown/style.css';

const Wrap = styled.div`
    display: grid;
    grid-template-columns: 22px 45% 45%;
    grid-gap: calc((10% - 22px)/2);
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    @media (max-width: 550px) {
        grid-template-columns: 14px 95% 45%;
    }
    &:before{
        align-self: start;
        content: counter(count);
        counter-increment: count;
        color: #fff;
        font-weight: 700;
        background: #4CC9E9;
        border-radius: 5px;
        text-align: center;
    }
`;

const Title = styled.p`
    text-align: left;
    margin: 0;
`;

const InputText = styled.div`
    height: 40px;
    border: 1px solid #4D0F98;
    width: 200px;
    display: flex;
    @media (max-width: 550px) {
        grid-row: 2;
        grid-column: span 2;
        margin-left: calc(5% + 14px);
    }
    input{
        border: none;
        width: 180px;
        font-size: 20px;
        padding: 0 10px;
        color: #4D0F98;
    }
    
`;
const RadioButtonsWrap = styled.div`
    div:nth-of-type(2){
        margin-bottom: 12px;
        margin-top: 12px;
    }
    label{
        display: block;
        position: relative;
        padding-left: 35px;
        cursor: pointer;
        font-size: 16px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            :checked ~ span:after {
                display: block;
            }
        }

        span{
            position: absolute;
            top: 0;
            left: 0;
            height: 25px;
            width: 25px;
            background-color: #fff;
            border-radius: 50%;
            border: 1px solid #4D0F98;
            &:after{
                content: "";
                position: absolute;
                display: none;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background: #4CC9E9;
            }
        }
    }
    @media (max-width: 550px) {
        grid-row: 2;
        grid-column: span 2;
        margin-left: calc(5% + 14px);
    }

`
export class DisplayQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownValue: ''
        }
    };
    //takes the value from each input and uses them in the callback functions
    onSelect = (option) => {
        this.setState({
            dropdownValue: option
        });
        this.props.callback1(option.label)
    };
    handleSubmit = (e) => {
        this.props.callback2(e.target.value)
    };
    handleChange = (e) => {
        this.props.callback3(e.target.value)

    };
    render() {
        const defaultOption = this.state.dropdownValue;

        //check if the input type is radio, if so loop through each element and create the html structure for that
        if (this.props.type === 'radio') {
            var inputRadio = this.props.answer.map( (elem,index) => (
                <div key = {index}>
                    <label>{elem}
                        <input  onChange = {this.handleSubmit} type="radio" value={elem} name = "radio"/>
                        <span></span>
                    </label>
                </div> 
            ))
        }
        return (
            //display the html structure based on the input type
            <Wrap>
                <Title>{this.props.question}</Title>
                {this.props.type === 'dropdown' 
                    ? <Dropdown 
                        options={this.props.answer} 
                        onChange={this.onSelect} 
                        value={defaultOption} 
                        placeholder="Please choose" /> 
                    : null
                }
                {this.props.type === 'radio' 
                    ? <RadioButtonsWrap >{inputRadio}</RadioButtonsWrap> 
                    : null
                }
                {this.props.type === 'text' 
                    ? <InputText><input onChange = {this.handleChange} type = "text" /></InputText> 
                    : null
                }
            </Wrap>
        )
    }
}
DisplayQuestions.propTypes = {
    callback1: PropTypes.func,
    callback2: PropTypes.func,
    callback3: PropTypes.func,
}
