<script lang="ts">
    import Tabs from '../Components/Tabs.svelte'
    import AddPollForm from '../Components/AddPollForm.svelte';
	import PollsList from '../Components/polls/pollsList.svelte';
	import Header from '../Components/header.svelte';
	import Footer from '../Components/footer.svelte';
    import PollStore from '../stores/PollStore';
    import type { PollType } from '../types/types'

    // Tab
    const tabs = ["Current Polls", "Add New Poll"];
    let activeTab = "Add New Poll";
    const changeTab = (e: CustomEvent<string>) => {
        activeTab = e.detail;
    }
    const addPoll = () => {
        activeTab = "Current Polls"
    }

</script>


<main>

    <Header />
    <Tabs {tabs} {activeTab} on:changeTab={changeTab} />
    {#if activeTab === "Current Polls"}
        <PollsList />
    {:else}
        <AddPollForm on:addPoll={addPoll} />
    {/if}
    <Footer />

</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode',
         'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
</style>
