<script lang="ts">
    import Tabs from '../Components/Tabs.svelte'

    const tabs = ["Polls", "Add New Poll"]
    let activeTab = "Polls";

    const changeTab = (e: CustomEvent<string>) => {
        activeTab = e.detail;
    }
</script>


<main>
    <h1>Svelte Poll</h1>
    <Tabs {tabs} {activeTab} on:changeTab={changeTab}/>
</main>

<style>
    main {
        text-align: center;
    }
</style>
