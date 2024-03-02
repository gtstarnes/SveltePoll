<script lang="ts">
	import { createEventDispatcher } from "svelte";

    export let tabs: string[];
    export let activeTab: string;
    const dispatch = createEventDispatcher();
    const changeTab = (tab: string) => {
        dispatch('changeTab', tab)
    }
</script>

<div class="tabs">
    <ul>
        {#each tabs as tab}
            <li class:active={tab === activeTab}>
                <button on:click={()=> changeTab(tab)}>{tab}</button>
            </li>
        {/each}
    </ul>
</div>

<style>
    .tabs {
        margin-bottom: 48px;
    }
    ul {
        display: flex;
        justify-content: center;
        padding: 0;
        list-style-type: none;
        color: #555;
    }
    li {
        margin: 0 16px;
        font-size: 18px;
    }
    .active {
        color: #d91b42;
        border-bottom: 2px solid #d91b42;
        padding-bottom: 8px;
    }
    button {
        background: none;
        color: inherit;
        border:none;
        padding: 0;
        font: inherit;
        outline: inherit;
        cursor: pointer;
    }
</style>