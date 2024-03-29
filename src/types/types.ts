export type PollType = {
    id: number,
    question: string,
    optionA: string,
    optionB: string,
    voteA: number,
    voteB: number
}

export type VoteType = {
    option: string,
    id: number
}