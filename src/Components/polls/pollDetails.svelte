<script lang="ts">
    import type { PollType } from "../../types/types";
    import {deletePoll, vote} from "../../stores/PollStore";
	import { tweened } from "svelte/motion";
    export let poll: PollType;
    $: totalVotes = poll.voteA + poll.voteB
    $: percentA = Math.floor(poll.voteA / totalVotes * 100) || 0;
    $: percentB = Math.floor(poll.voteB / totalVotes * 100) || 0;

    const tweenedA = tweened(percentA);
    const tweenedB = tweened(percentB);

    $: {
        tweenedA.set(percentA)
        tweenedB.set(percentB)
    }
</script>
<div class="poll">
    <h3>{poll.question}</h3>
    <div class='buttons'>
        <button on:click={() => vote('a', poll.id)}>
            <div class="percent percent-A" style="width: {$tweenedA}%"></div>
            <span>{poll.optionA} ({percentA}%)</span>
        </button>
        <button on:click={() => vote('b', poll.id)}>
            <div class="percent percent-B" style="width: {$tweenedB}%"></div>
            <span>{poll.optionB} ({percentB}%)</span>
        </button>
    </div>
    <div class="totals">
        <div>Votes for A: {poll.voteA}</div>
        <div>Total Votes: {totalVotes}</div>
        <div>Votes for B: {poll.voteB}</div>
    </div>
    <button class="delete" on:click={() => deletePoll(poll.id)}>Delete</button>
</div>


<style>
    button {
        background: rgba(128, 128, 128, 0.5);
        color: inherit;
        border:none;
        padding: 0;
        font: inherit;
        outline: inherit;
        cursor: pointer;
        height: 50px;
        width: 100%;
        position: relative;
        margin: 10px auto;
    }
    .buttons {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        width: 50%;
        gap: 10px
    }
    .delete {
        background-color: red;
    }
    .percent {
        height: 100%;
        position: absolute;
        top: 0.1px;
        box-sizing: border-box;
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