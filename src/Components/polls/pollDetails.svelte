<script lang="ts">
    import type { PollType } from "../../types/types";
    import PollStore from "../../stores/PollStore";

    export let poll: PollType;
    
    let pollData: PollType | undefined;
    $: pollData = $PollStore.find(p => p.id === poll.id);

    let totalVotes = (pollData?.voteA ?? 0) + (pollData?.voteB ?? 0);
    let percentA = Math.floor((pollData?.voteA ?? 0) / totalVotes * 100);
    let percentB = Math.floor((pollData?.voteB ?? 0) / totalVotes * 100);

    const handleVote = (option: string, id: number) => {
        PollStore.update(polls => {
            return polls.map(poll => {
                if (poll.id === id) {
                    if (option === 'a') {
                        return {...poll, voteA: poll.voteA + 1};
                    }
                    if (option === 'b') {
                        return {...poll, voteB: poll.voteB + 1};
                    }
                }
                return poll;
            });
        });

        totalVotes = (pollData?.voteA ?? 0) + (pollData?.voteB ?? 0);
        percentA = Math.floor((pollData?.voteA ?? 0) / totalVotes * 100);
        percentB = Math.floor((pollData?.voteB ?? 0) / totalVotes * 100);
    }


</script>

<div class="poll">
    <h2>{poll.question}</h2>
    <div class="buttons">
        <button class="percent-A" style="width: {percentA}%" on:click={()=>handleVote('a', poll.id)}>{poll.optionA}</button>
        <button class="percent-B" style="width: {percentB}%" on:click={()=>handleVote('b', poll.id)}>{poll.optionB}</button>
    </div>
    <div class="totals">
        <p>Votes for A: {pollData?.voteA ?? 0}</p>
        <p>Total Votes: {totalVotes}</p>
        <p>Votes for B: {pollData?.voteB ?? 0}</p>
    </div>
</div>

<style>
    button {
        background: none;
        color: inherit;
        border:none;
        padding: 0;
        font: inherit;
        outline: inherit;
        cursor: pointer;
        height: 50px;
    }
    .buttons {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        width: 50%;
        gap: 40px
    }
    .percent-A {
        border-left: 4px solid red;
        background-color: rgba(217,27,66,0.2);
    }
    .percent-B {
        border-left: 4px solid green;
        background-color: rgba(69, 196, 150,0.2);
    }
    .poll {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .totals {
        display: flex;
        gap: 20px;
        justify-content: center;
        border: 2px solid white;
        width: 60%;
        padding: 10px;
    }
</style>