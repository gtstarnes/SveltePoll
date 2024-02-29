<script lang="ts">
    import Tabs from '../Components/Tabs.svelte'
    import AddPollForm from '../Components/AddPollForm.svelte';
    import type {PollType, VoteType} from '../types/types';
	import PollsList from '../Components/polls/pollsList.svelte';

    const tabs = ["Polls", "Add New Poll"]
    let activeTab: string;
    let polls: PollType[] = [];

    if (polls.length === 0) {
        activeTab = "Add New Poll";
    } else {
        activeTab = "Polls";
    }

    const changeTab = (e: CustomEvent<string>) => {
        activeTab = e.detail;
    }

    const addPoll = (e: CustomEvent<PollType>) => {
        polls = [e.detail, ...polls]
        console.log(polls);
        activeTab = "Polls";
    }

    const handleVote = (e: CustomEvent<VoteType>) => {
        const {option, id} = e.detail;
        polls = polls.map(poll => {
            if (poll.id === id) {
                if(option === 'a'){
                    return {...poll, voteA: poll.voteA + 1}
                }
                if(option === 'b'){
                    return {...poll, voteB: poll.voteB + 1}
                }
            }
            return poll;
        })
    }
</script>


<main>
    <h1>Svelte Poll</h1>
    <Tabs {tabs} {activeTab} on:changeTab={changeTab}/>
    {#if activeTab === "Polls"}
        {#if polls.length === 0}
            <p>There are no polls to show</p>
        {:else}
            <PollsList {polls} on:vote={handleVote} />
        {/if}
    {:else}
        <h4>Add New Poll</h4>
        <AddPollForm on:addPoll={addPoll} />
    {/if}
</main>

<style>
    main {
        text-align: center;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode',
         'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
</style>
