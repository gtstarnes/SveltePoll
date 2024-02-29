<script lang="ts">

</script>

<div>
    <slot></slot>
</div>

<style>
    div {
        padding: 5px;
        background-color: white;
        border-radius: 4px;
    }
    div:hover {
        filter: drop-shadow(4px 6px 12px grey);
        transition: ease-in-out;
    }
</style>