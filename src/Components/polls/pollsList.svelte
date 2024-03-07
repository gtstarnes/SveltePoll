<script lang="ts">
    import PollDetails from "./pollDetails.svelte";
    import Card from "./card.svelte";
    import PollStore from "../../stores/PollStore";
    import { fade, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
</script>

<div class="pollList">
    {#if $PollStore.length === 0}
        <p>Poll List Is Empty</p>
    {:else}
        {#each $PollStore as poll (poll.id)}
            <div in:fade out:scale animate:flip={{duration: 500}}>
                <Card>
                    <PollDetails {poll} />
                </Card>
            </div>
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