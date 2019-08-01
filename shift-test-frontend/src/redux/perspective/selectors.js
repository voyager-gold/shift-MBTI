
export const questionsSelector = ({ perspective }) => perspective.questions

export const resultSelector = ({ perspective }) => {
    const { result } = perspective
    return result ? result.toUpperCase() : undefined
}
