import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { makeBlankQuestion, duplicateQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    const published = questions.filter(
        (question: Question): boolean => question.published,
    );
    return published;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    const deepCopy = questions.map((question: Question) => ({
        ...question,
        options: [...question.options],
    }));
    const nonempty = deepCopy.filter(
        ({ body, expected, options }: Question) => {
            return (
                body.length !== 0 ||
                expected.length !== 0 ||
                options.length !== 0
            );
        },
    );

    console.log(nonempty);

    return nonempty;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    const matched = questions.find(
        (question: Question): boolean => question.id === id,
    );
    return matched ? matched : null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    const matched = questions.filter(
        (question: Question): boolean => question.id !== id,
    );
    return matched;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    const names = questions.map(({ name }: Question): string => name);
    return names;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    const totalPoints = questions.reduce(
        (current: number, { points }: Question): number => (current += points),
        0,
    );
    return totalPoints;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    const publishedQuestions = getPublishedQuestions(questions);

    return sumPoints(publishedQuestions);
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */

function CSV(question: Question): string {
    const { id, name, options, points, published } = question;

    return `${id},${name},${options.length},${points},${published}`;
}
export function toCSV(questions: Question[]): string {
    const CSVheading = `id,name,options,points,published`;

    const CSVquestions = questions.map(
        (question: Question): string => "\n" + CSV(question),
    );
    return CSVheading + CSVquestions.join("");
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    const answers: Answer[] = questions.map(
        ({ id }: Question): Answer => ({
            questionId: id,
            text: "",
            submitted: false,
            correct: false,
        }),
    );
    return answers;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    const newQuestions = questions.map(
        (question: Question): Question => ({ ...question, published: true }),
    );
    return newQuestions;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    const firstType: string = questions[0]?.type;
    const sameType = questions.every(
        ({ type }: Question): boolean => type === firstType,
    );

    return sameType;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    return [...questions, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    const questionsCopy = [...questions];
    const targetIdx = questionsCopy.findIndex(
        ({ id }: Question): boolean => id === targetId,
    );

    questionsCopy[targetIdx] = { ...questionsCopy[targetIdx], name: newName };

    return questionsCopy;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    const targetIdx = questions.findIndex(
        ({ id }: Question): boolean => id === targetId,
    );
    const questionsCopy = [...questions];
    questionsCopy[targetIdx] = {
        ...questionsCopy[targetIdx],
        type: newQuestionType,
    };
    if (questionsCopy[targetIdx].type !== "multiple_choice_question") {
        questionsCopy[targetIdx].options = [];
    }
    return questionsCopy;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    const targetIdx = questions.findIndex(
        ({ id }: Question): boolean => id === targetId,
    );

    const questionsCopy = [...questions];

    if (targetOptionIndex === -1) {
        questionsCopy[targetIdx] = {
            ...questionsCopy[targetIdx],
            options: [...questionsCopy[targetIdx].options, newOption],
        };
    } else {
        questionsCopy[targetIdx] = {
            ...questionsCopy[targetIdx],
            options: [...questionsCopy[targetIdx].options],
        };
        questionsCopy[targetIdx].options.splice(
            targetOptionIndex,
            1,
            newOption,
        );
    }

    return questionsCopy;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    const targetIdx = questions.findIndex(
        ({ id }: Question): boolean => id === targetId,
    );
    const duplicate = duplicateQuestion(newId, questions[targetIdx]);
    const arrayCopy = [...questions];
    arrayCopy.splice(targetIdx + 1, 0, duplicate);
    return arrayCopy;
}
