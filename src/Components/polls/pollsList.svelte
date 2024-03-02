<script lang="ts">
    import type { PollType } from "../../types/types"
    import PollDetails from "./pollDetails.svelte";
    import Card from "./card.svelte";
    import PollStore from "../../stores/PollStore";
	
    $: polls = $PollStore;

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
    {#if polls.length === 0}
        <p>There are no polls to show</p>
    {:else}
        {#each polls as poll (poll.id)}
                <Card>
                    <PollDetails pollData={poll} />
                    <div class="delete">
                        <button on:click={() => handleDelete(poll.id)}>Delete Poll</button>
                    </div>
                </Card>
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