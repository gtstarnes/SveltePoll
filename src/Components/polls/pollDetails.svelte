<script lang="ts">
	import { createEventDispatcher } from "svelte";
    import type { PollType } from "../../types/types";
    
    export let poll: PollType;
    $: totalVotes = poll.voteA + poll.voteB;
    $: percentA = ((poll.voteA / totalVotes) * 100).toFixed(1);
    $: percentB = ((poll.voteB / totalVotes) * 100).toFixed(1);

  
    const dispatch = createEventDispatcher();

    const handleVote = (option: string, id: number) => {
        dispatch('vote', {option, id})
    }
</script>

<div class="poll">
    <h2>{poll.question}</h2>
    <div class="buttons">
        <button on:click={()=>handleVote('a', poll.id)}>{poll.optionA} {#if totalVotes === 0}0%{:else}({percentA})%{/if}</button>
        <button on:click={()=>handleVote('b', poll.id)}>{poll.optionB} {#if totalVotes === 0}0%{:else}({percentB})%{/if}</button>
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
    }
    .buttons {
        margin-bottom: 20px;
        display: flex;
        gap: 40px
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