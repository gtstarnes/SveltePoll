<script lang="ts">
    import Tabs from '../Components/Tabs.svelte'
    import AddPollForm from '../Components/AddPollForm.svelte';
    import type {PollType} from '../types/types';
	import PollsList from '../Components/polls/pollsList.svelte';
	import Header from '../Components/header.svelte';
	import Footer from '../Components/footer.svelte';
    import PollStore from '../stores/PollStore';

    // Tab
    const tabs: string[] = ["Poll List", "Add New Poll"]
    let activeTab: string;
    if ($PollStore.length === 0){
        activeTab = tabs[1];
    } else {
        activeTab = tabs[0];
    }
    const changeTab = (e: CustomEvent<string>) => {
        activeTab = e.detail;
    }
    const addPoll = () => {
        activeTab = tabs[0]
    }
</script>


<main>
    <Header />
    <Tabs {tabs} {activeTab}  on:changeTab={changeTab}/>
    {#if activeTab === tabs[0]}
        <PollsList />
    {:else}
        <h4>Add New Poll</h4>
        <AddPollForm on:addPoll={addPoll}/>
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
