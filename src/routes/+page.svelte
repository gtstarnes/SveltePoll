<script lang="ts">
    import Tabs from '../Components/Tabs.svelte'
    import AddPollForm from '../Components/AddPollForm.svelte';
    import type {PollType} from '../types/types';

    const tabs = ["Polls", "Add New Poll"]
    let activeTab = "Polls";
    let polls: PollType[] = [];

    const changeTab = (e: CustomEvent<string>) => {
        activeTab = e.detail;
    }

    const addPoll = (e: CustomEvent) => {
        polls = [e.detail, ...polls]
        console.log(polls);
        activeTab = "Polls";
    }
</script>


<main>
    <h1>Svelte Poll</h1>
    <Tabs {tabs} {activeTab} on:changeTab={changeTab}/>
    {#if activeTab === "Polls"}
        <p>Polls</p>
    {:else}
        <h4>Add a new Poll</h4>
        <AddPollForm on:addPoll={addPoll} />
    {/if}
</main>

<style>
    main {
        text-align: center;
    }
</style>
