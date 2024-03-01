<script lang="ts">
    import PollStore from "../stores/PollStore";
	import { createEventDispatcher } from "svelte";

    let options = {question: '', optionA: '', optionB: ''};
    let error = {question: '', optionA: '', optionB: ''};
    let valid = false;
    const dispatch = createEventDispatcher();

    const handleSubmit = () => {
        valid = true
        if (options.question.length < 5) {
            valid = false;
            error.question = "Question is too short"
        } else {
            error.question = ''
        }
        if (options.optionA.length === 0) {
            valid = false;
            error.optionA = "Option is required"
        } else {
            error.optionA = ''
        }
        if (options.optionB.length === 0) {
            valid = false;
            error.optionB = "Option is required"
        } else {
            error.optionB = ''
        }
        if (valid) {
            const poll = {...options, id: Math.random(), voteA: 0, voteB: 0}
            PollStore.update(polls => {
                return [poll, ...polls];
            })
            dispatch("addPoll");
            handleReset();
        }
    }

    const handleReset = () => {
        options = {question: '', optionA: '', optionB: ''};
        error = {question: '', optionA: '', optionB: ''};
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <div class="form-field">
        <label for="question">Question: </label>
        <input type="text" placeholder="Ask your question" bind:value={options.question} />
        <p class="error">{error.question}</p>
    </div>
    <div class="form-field">
        <label for="optionA">Option A: </label>
        <input type="text" placeholder="Add option 1" bind:value={options.optionA} />
        <p class="error">{error.optionA}</p>
    </div>
    <div class="form-field">
        <label for="optionB">Option B: </label>
        <input type="text" placeholder="Add option 2" bind:value={options.optionB} />
        <p class="error">{error.optionB}</p>
    </div>
    <div>
        <button type="submit">Submit</button>
        <button type="reset" on:click={handleReset}>Reset</button>
    </div>
</form>

<style>
    form{
        width: 600px;
        margin: 0 auto;
        text-align: center;
    }

    .form-field{
        margin: 18px auto;
    }

    input{
        width: 100%;
        border-radius: 2px;
        height: 30px;
    }
    .form-field label{
        display: block;
        margin: 5px auto;
        text-align: left;
    }
    .error {
        color: red;
    }
</style>