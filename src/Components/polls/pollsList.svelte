<script lang="ts">
    import PollDetails from "./pollDetails.svelte";
    import Card from "./card.svelte";
    import PollStore from "../../stores/PollStore";
    import { fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
	

    const handleDelete = (id: number | undefined) => {
        if (typeof id === 'undefined') {
            return;
        }
        PollStore.update(polls => {
            return polls.filter(poll => {
                return poll.id != id;
            })
        })

    }

</script>

<div class="pollList">
    {#if $PollStore.length === 0}
        <p>There are no polls to show</p>
    {:else}
        {#each $PollStore as poll (poll.id)}
            <div in:fade out:scale animate:flip={{duration: 500}}>
                <Card>
                    <PollDetails pollData={poll} />
                    <div class="delete">
                        <button on:click={() => handleDelete(poll.id)}>Delete Poll</button>
                    </div>
                </Card>
            </div>
        {/each}
    {/if}
</div>

<style>
    .delete {
        width: 100%;
        margin-top: 20px;
    }
    .delete button {
        background-color: red;
        height: 40px;
        width: 10%;
        cursor: pointer;
    }
    .pollList {
        display: flex;
        flex-direction: column;
        gap: 40px;
        width: 60%;
    }
</style>