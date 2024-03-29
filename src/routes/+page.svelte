<script lang="ts">
    import Tabs from '../Components/Tabs.svelte'
    import AddPollForm from '../Components/AddPollForm.svelte';
	import PollsList from '../Components/polls/pollsList.svelte';
	import Header from '../Components/header.svelte';
	import Footer from '../Components/footer.svelte';
    import {PollStore} from '../stores/PollStore';
    import type { PollType } from '../types/types'

    // Tab
    const tabs = ['Active Polls', 'Create A Poll']
    let activeTab: string;

    if ($PollStore.length === 0) {
        activeTab = 'Create A Poll'
    } else {
        activeTab = 'Active Polls'
    }

    const changeTab = (e: CustomEvent<string>) => {
        const tab = e.detail
        activeTab = tab;
    }

    const createPoll = () => {
        activeTab = 'Active Polls'
    }
</script>


<main>

    <Header />
    <Tabs {tabs} {activeTab} on:changeTab={changeTab} />
    {#if activeTab === 'Active Polls'}
        <PollsList />
    {:else}
        <AddPollForm on:createPoll={createPoll}/>
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
