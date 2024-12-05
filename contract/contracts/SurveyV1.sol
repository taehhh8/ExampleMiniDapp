// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import "./ISurvey.sol";

event AnswerSubmitted(address indexed respondent, uint8[] answers);

contract SurveyV1 is ISurvey {
    address public immutable SURVEY_FACTORY;
    uint256 public constant VERSION = 1;
    uint256 public constant TYPE = 1; // 1 for survey, 2 for poll

    string public title;
    string public description;
    uint256 public targetNumber;
    uint256 public reward;
    address public owner;
    uint256 public surveyNumber;
    uint256 public burnRate;
    Question[] public questions;
    Answer[] public answers;

    bool public finished = false;
    uint256 public timestamp;
    uint256 public lockedUntil;

    struct Question {
        string question;
        string[] options;
    }

    struct Answer {
        address respondent;
        string commit;
        uint8[] answers;
    }

    // Constructor accepts raw byte data for the questions
    constructor(string memory _title, string memory _description, Question[] memory _questions, uint256 _targetNumber, uint256 _lockedUntil, uint256 _burnRate) payable {
        SURVEY_FACTORY = msg.sender;
        surveyNumber = 0;

        // // Manually push each decoded question into storage
        for (uint i = 0; i < _questions.length; i++) {
            // Create a memory array to hold the options for this question
            string[] memory optionsMemory = new string[](_questions[i].options.length);

            // Loop through the decoded question's options and store them in memory
            for (uint j = 0; j < _questions[i].options.length; j++) {
                optionsMemory[j] = _questions[i].options[j];
            }

            // Add the full question struct to the questions array
            questions.push(Question({
                question: _questions[i].question,
                options: optionsMemory
            }));
        }

        // Create the survey with the passed data
        title = _title;
        description = _description;
        burnRate = _burnRate;
        targetNumber = _targetNumber;
        timestamp = block.timestamp;
        lockedUntil = timestamp + _lockedUntil * 1 days;
        owner = msg.sender;
        
        payable(0x000000000000000000000000000000000000dEaD).transfer(msg.value * burnRate / 10000);
        reward = (msg.value - msg.value * burnRate / 10000) / targetNumber; // 5% burn
    }

    function submitAnswer(Answer memory _answer) public {
        require(_answer.answers.length == questions.length, "Answer length must match question length");
        require(surveyNumber < targetNumber, "Survey is already full");
        require(block.timestamp < lockedUntil, "Survey is finished");
        for (uint i=0; i<questions.length; i++) {
            require(_answer.answers[i] < questions[i].options.length, "Answer out of bounds");
        }

        // Add the answer to the answers array
        answers.push(_answer);

        // Increment the survey number
        payable(msg.sender).transfer(reward);
        surveyNumber++;
    }

    function getQuestions() public view returns (Question[] memory) {
        return questions;
    }

    function getAnswers() public view returns (Answer[] memory) {
        return answers;
    }

    function finish() public {
        require(block.timestamp >= lockedUntil, "Survey is not locked yet");
        finished = true;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        require(finished, "Survey is not finished yet");
        require(address(this).balance > 0, "No balance to withdraw");
        payable(owner).transfer(address(this).balance);
    }

    // Function to return the number of remaining surveys
    function remainingSurveys() public view returns (uint256) {
        return targetNumber - surveyNumber;
    }

    function surveyInfo() public view returns (string memory, string memory, address, uint256, uint256, uint256, uint256, uint256, uint256, uint256, bool) {
        return (title, description, owner, reward, targetNumber, surveyNumber, timestamp, lockedUntil, TYPE, VERSION, finished);
    }

    // Fallback function to receive kaia
    receive() external payable {
    }
}
