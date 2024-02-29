<script lang="ts">
    import type { PollType } from "../../types/types"
    import PollDetails from "./pollDetails.svelte";
    import Card from "./card.svelte";

    export let polls: PollType[] = []
</script>

<div class="pollList">
    {#each polls as poll (poll.id)}
        <Card>
            <PollDetails {poll} on:vote />
        </Card>
    {/each}
</div>

<style>
    .pollList {
        display: flex;
        flex-direction: column;
        gap: 40px;
    }
</style>