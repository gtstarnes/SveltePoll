import { writable } from "svelte/store";
import type { PollType } from "../types/types";


const initial: PollType[] = [];
const PollStore = writable(initial);

const vote = (option: string, id: number) => {
    PollStore.update(polls => {
        return polls.map(poll => {
            if (poll.id === id) {
                if(option === 'a'){
                    return {...poll, voteA: poll.voteA + 1}
                }
                if(option === 'b'){
                    return {...poll, voteB: poll.voteB + 1}
                }
            }
            return poll
        })
    })
}

const deletePoll = (id: number) => {
    PollStore.update(polls => {
        return polls.filter(poll => {
            return poll.id !== id;
        })
    })
}
export {PollStore, vote, deletePoll}