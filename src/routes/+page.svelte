<script lang="ts">
    import Tabs from '../Components/Tabs.svelte'
    import AddPollForm from '../Components/AddPollForm.svelte';
    import type {PollType, VoteType} from '../types/types';
	import PollsList from '../Components/polls/pollsList.svelte';
	import Header from '../Components/header.svelte';
	import Footer from '../Components/footer.svelte';
    import PollStore from '../stores/PollStore';

    const tabs = ["Polls", "Add New Poll"]
    let activeTab: string;

    if ($PollStore.length === 0) {
        activeTab = "Add New Poll";
    } else {
        activeTab = "Polls";
    }

    const changeTab = (e: CustomEvent<string>) => {
        activeTab = e.detail;
    }

    const addPoll = (e: CustomEvent<PollType>) => {
        activeTab = "Polls";
    }

</script>


<main>
    <Header />
    <Tabs {tabs} {activeTab} on:changeTab={changeTab}/>
    {#if activeTab === "Polls"}
        <PollsList />
    {:else}
        <h4>Add New Poll</h4>
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
