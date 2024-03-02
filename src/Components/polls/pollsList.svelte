<script lang="ts">
    import type { PollType } from "../../types/types"
    import PollDetails from "./pollDetails.svelte";
    import Card from "./card.svelte";
    import PollStore from "../../stores/PollStore";
	
    let polls = $PollStore;

</script>

<div class="pollList">
    {#if polls.length === 0}
        <p>There are no polls to show</p>
    {:else}
        {#each polls as poll (poll.id)}
            <Card>
                <PollDetails pollData={poll} />
            </Card>
        {/each}
    {/if}
</div>

<style>
    .pollList {
        display: flex;
        flex-direction: column;
        gap: 40px;
        width: 60%;
    }
</style>