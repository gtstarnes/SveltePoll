<script lang="ts">
	import { createEventDispatcher } from "svelte";
    import type { PollType } from "../../types/types";
    
    export let poll: PollType;
    $: totalVotes = poll.voteA + poll.voteB;
    $: percentA = Math.floor(poll.voteA / totalVotes * 100);
    $: percentB = Math.floor(poll.voteB / totalVotes * 100);

  
    const dispatch = createEventDispatcher();

    const handleVote = (option: string, id: number) => {
        dispatch('vote', {option, id})
    }
</script>

<div class="poll">
    <h2>{poll.question}</h2>
    <div class="buttons">
        <button class="percent-A" style="width: {percentA}%" on:click={()=>handleVote('a', poll.id)}>{poll.optionA}</button>
        <button class="percent-B" style="width: {percentB}%" on:click={()=>handleVote('b', poll.id)}>{poll.optionB}</button>
    </div>
    <div class="totals">
        <p>Votes for A: {poll.voteA}</p>
        <p>Total Votes: {totalVotes}</p>
        <p>Votes for B: {poll.voteB}</p>
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
        width: 50%;
    }
</style>