import chalk from "chalk";
import { select } from "@inquirer/prompts";
import questions from "./quizQuestions.js";

let currentTimerId = null;

export async function showMainMenu() {
    const action = await select({
        message: "Ready to start this trivia quiz?",
        choices: [
            { name: "Start Quiz", value: "start" },
            { name: "Maybe Next Time", value: "quit" },
        ],
    });

    switch (action) {
        case "start":
            await askQuestion(0, 0);
            break;
        case "quit":
            console.log("Goodbye!");
            process.exit(0);
    }
}

export async function askQuestion(questionIndex, score) {
    // End of Quiz
    if (questionIndex >= questions.length) {
        console.log(chalk.blue(`End of quiz, you got ${score} question of ${questions.length} right!`))
        process.exit(0);
    }

    let timeLeft = 10;

    // Create the interval
    currentTimerId = setInterval(() => {
        timeLeft--;
        process.stdout.write(`\r${chalk.yellow('Time Remaining:')} ${timeLeft} seconds`);

        if (timeLeft <= 0) {
            clearInterval(currentTimerId);
            console.log(chalk.red("Time's up!"));
            // Move to next question when time is up
            checkAnswer("Timeout", questionIndex, score);
        }
    }, 1000);

    // Ask question
    const userAnswer = await select({
        message: questions[questionIndex].question,
        choices: questions[questionIndex].options.map((option) => { return { name: option, value: option } })
    });

    // Clear timer when user answers
    clearInterval(currentTimerId);
    // Check answer and move onto next question
    checkAnswer(userAnswer, questionIndex, score)
}

export function checkAnswer(userAnswer, questionIndex, score) {
    let newScore = score;
    // CORRECT ANSWER
    if (userAnswer === questions[questionIndex].answer) {
        newScore++
        console.log(chalk.green("You got it right!"))
    } else if (userAnswer === "Timeout") {
        // TIMED OUT
        console.log("Moving onto next question")
    }
    else {
        // WRONG ANSWER
        console.log(chalk.red("Not quite right..."))
    }

    // Display result for half a second
    setTimeout(() => {
        askQuestion(questionIndex + 1, newScore);
    }, 500);
}


