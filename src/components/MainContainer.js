import React from 'react';
import styled from 'styled-components';
import {DisplayQuestions} from './DisplayQuestions';
import { DisplayAnswers } from './DisplayAnswers';

const MainContainerWrap = styled.div`
    position: relative;
    font-family: 'Roboto Mono', monospace;
    padding-top: 30px;
    min-height: 400px;
    height: auto;
    @media (max-width: 550px) {
        min-height: 450px;
    }
`;

const Bar = styled.div`
    position: relative;
    background: #247BA0;
    font-size: 20px;
    width: 100%;
    height: 40px;
    text-align: center;
    color: #91F9E5;
    margin: 0 0 20px;
    line-height: 40px;
`;

const QuestionWrap = styled.div`
    padding: 1rem 0;
    margin: 0 1.5rem;
    counter-reset: count; 
    list-style-type:none;
    border: 1px solid #247BA0;
    box-shadow: 0px 1px 0px 0px rgba(180,180,180, 0.6);
`;

const AnswersWrap = styled.div`
    padding: 1rem 0;
    margin: 0 1.5rem;
    border: 1px solid #247BA0;
    box-shadow: 0px 1px 0px 0px rgba(180,180,180, 0.6);
    div{
        padding: 0  0 10px 20px;
    }
`;

const Button = styled.button`
    position: absolute;

    left: 50%;
    margin-left: -65px;
    width: 130px;
    text-transform: uppercase;
    font-size: 0.75rem;
    padding: 0.7rem 1rem;
    border-radius: 3px;
    border: none;
    bottom: 3%;
    :focus {
        outline: none;
    }
    :hover {
        cursor: pointer;
    }
`;
//Define the state 
//showResults is for toggle between displayQuestions and DisplayAnswers; 
//answer1-3 - store the values from the DisplayQuestions component and using them as props in the DisplayAnswer
export class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            showResults: false,
            answer3: '',
            answer2: '',
            answer1: ''
        }
    };
    componentDidMount() {
        fetch('https://gist.githubusercontent.com/visan90/9958e3945f445e52d0fc0d919373125d/raw/aeede4bd62fdc381689ca00a7d30c9ea8df3ed70/json_questions.json')
        .then(response => response.json())
        .then(data => this.setState({ questions: data }));
    };
    //got the values of the inputs from the DisplayQuestions component and stored them in the MainComponent state
    formChild1_dropdown = (param1) => {
        this.setState({
          answer1: param1
        })
    };
    formChild1_radio = (param2) => {
        this.setState({
          answer2: param2
        })
    };
    formChild1_number = (param3) => {
        this.setState({
          answer3: param3
        })
    };

    //toggle between DisplayQuestions and DisplayAnswers
    handleClick = () => {
        this.setState({
            showResults: !this.state.showResults
        });
    };
    render() {
        //loop through every object in the json and render it into a component; 
        const showQuestions = this.state.questions.map( item => (
            <DisplayQuestions
                key = {item.question}
                question = {item.question}
                answer = {item.options}
                type = {item.inputType}
                callback1 = {this.formChild1_dropdown}
                callback2 = {this.formChild1_radio}
                callback3 = {this.formChild1_number}
            />
        ));
        //loop through the questions to display each question on the DisplayAnswers based on the input type
        //TODO: if they are more with the same input type => try to sort them by id also
        const showQuestionsInAnswers = this.state.questions.map( item => (
            item.inputType === "radio" 
                ? <DisplayAnswers
                    key = {item.question}
                    answerRadio = {this.state.answer2} 
                    questionAnswer = {item.question}
                /> 
                : null 
                || item.inputType === "dropdown" 
                ? <DisplayAnswers
                    key = {item.question}
                    answerDropdown = {this.state.answer1} 
                    questionAnswer = {item.question}
                /> 
                : null
                || item.inputType === "text" 
                ? <DisplayAnswers
                    key = {item.question}
                    answerNumber = {this.state.answer3} 
                    questionAnswer = {item.question}
                /> 
                : null 
        ));
        return(
            //display different content/style and toggle between components based on the showResults's state
            <MainContainerWrap>
                <Bar>{this.state.showResults ? "Results" : "Questionnaire"}</Bar>
                {this.state.showResults 
                    ? <AnswersWrap>{ showQuestionsInAnswers }</AnswersWrap>  
                    : <QuestionWrap>{ showQuestions }</QuestionWrap>}
                <Button 
                    style = {this.state.showResults 
                            ? {background: "#EFC7C2", color: "#247BA0"} 
                            : {background: "#247BA0", color: "#91F9E5"}}
                    onClick = {this.handleClick}>{this.state.showResults ? "Go back" : "Show results"}
                </Button>
            </MainContainerWrap>
        )
          
    }
}