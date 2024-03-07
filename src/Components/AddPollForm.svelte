<script lang="ts">
    import PollStore from "../stores/PollStore";
	import { createEventDispatcher } from "svelte";

    let pollFields = {question: '', optionA: '', optionB: ''};
    let error = {question: '', optionA: '', optionB: ''};
    let valid = false;
    const dispatch = createEventDispatcher()

    const submitPoll = () => {
        valid = true
        if (pollFields.question.length < 5) {
            valid = false;
            error.question = 'Questions should be longer than 5 characters';
        } else {
            error.question = '';
        }
        if (pollFields.optionA.length === 0) {
            valid = false;
            error.optionA = 'Option is required';
        } else {
            error.optionA = '';
        }
        if (pollFields.optionB.length === 0) {
            valid = false;
            error.optionB = 'Option is required';
        } else {
            error.optionB = '';
        }

        if(valid) {
            const poll = {
                ...pollFields, voteA: 0, voteB: 0, id: Math.random()
            }
            PollStore.update(polls => {
                return [poll, ...polls]
            })
            dispatch('addPoll');
            resetPoll();
        }
    }

    const resetPoll = () => {
        pollFields = {question: '', optionA: '', optionB: ''};
        error = {question: '', optionA: '', optionB: ''};
    }
</script>

<form on:submit|preventDefault={submitPoll}>
    <div class="form-field">
        <label for="question">Question</label>
        <input type="text" name="question" id="question" placeholder="Question" bind:value={pollFields.question} />
        <p class="error">{error.question}</p>
    </div>
    <div class="form-field">
        <label for="optionA">Option A</label>
        <input type="text" name="optionA" id="optionA" placeholder="Option A" bind:value={pollFields.optionA} />
        <p class="error">{error.optionA}</p>
    </div>
    <div class="form-field">
        <label for="optionB">Option B</label>
        <input type="text" name="optionB" id="optionB" placeholder="Option B" bind:value={pollFields.optionB} />
        <p class="error">{error.optionB}</p>
    </div>
    <div>
        <button type="submit">Submit</button>
        <button type="reset" on:click={resetPoll}>Reset</button>
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