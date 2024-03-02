<script lang="ts">
    import type { PollType } from "../../types/types";
    import PollStore from "../../stores/PollStore";
	import { tweened } from "svelte/motion";

    export let pollData: PollType;
  
    $: poll = $PollStore.find(p => {
        return p.id === pollData.id;
    })
    
    $: totalVotes = (poll?.voteA ?? 0) + (poll?.voteB ?? 0);
    $: percentA = Math.floor((poll?.voteA ?? 0) / totalVotes * 100 ) ?? 0;
    $: percentB = Math.floor((poll?.voteB ?? 0) / totalVotes * 100 ) ?? 0;

    const  tweenedA = tweened(percentA);
    const  tweenedB = tweened(percentB);
    $: tweenedA.set(percentA);
    $: tweenedB.set(percentB);
    
    const handleVote = (option: string, id: number | undefined) => {
        if (typeof poll === "undefined") {
            return
        }
        PollStore.update(polls => {
            return polls.map(poll => {
                if (poll.id === id) {
                    if (option === 'a') {
                        return {...poll, voteA: poll.voteA + 1}
                    } 
                    if (option === 'b') {
                        return {...poll, voteB: poll.voteB + 1}
                    }
                }
                return poll
            })
        })
    }
</script>
<div class="poll">
    <h2>{poll?.question}</h2>
    <div class="buttons">
        <button on:click={() => handleVote('a', poll?.id)}>
            <div class="percent percent-A" style="width: {$tweenedA}%"></div>
            <span>{poll?.optionA}</span>
        </button>
        <button on:click={() => handleVote('b', poll?.id)}>
            <div class="percent percent-B" style="width: {$tweenedB}%"></div>
            <span>{poll?.optionB}</span>
        </button>
    </div>
    <div class="totals">
        <p>Votes for A: {poll?.voteA ?? 0}</p>
        <p>Total Votes: {totalVotes}</p>
        <p>Votes for B: {poll?.voteB ?? 0}</p>
    </div>
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
    span {
        display: inline-block;
        padding: 10px 20px;
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