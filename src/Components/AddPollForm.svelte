<script lang="ts">
    import PollStore from "../stores/PollStore";
	import { createEventDispatcher } from "svelte";

    let pollData = {question: '', optionA: '', optionB: ''}
    let error = {question: '', optionA: '', optionB: ''}
    let valid = false;
    const dispatch = createEventDispatcher();

    const submitPoll = () => {
        valid = true
        if (pollData.question.length < 10) {
            valid = false
            error.question = 'Question must be longer than 10 characters'
        } else {
            error.question = ''
        }
        if (pollData.optionA.length === 0 ) {
            valid = false
            error.optionA = 'Option is required'
        } else {
            error.optionA = ''
        }
        if (pollData.optionB.length === 0 ) {
            valid = false
            error.optionB = 'Option is required'
        } else {
            error.optionB = ''
        }

        if (valid) {
            const poll = {
                ...pollData, id: Math.random(), voteA: 0, voteB: 0,
            }
            PollStore.update(polls => {
                return [poll, ...polls]
            })
            dispatch('addPoll')
            resetPoll();
        }
    }

    const resetPoll = () => {
        pollData = {question: '', optionA: '', optionB: ''}
        error = {question: '', optionA: '', optionB: ''}
    }
</script>

<form on:submit|preventDefault={submitPoll}>
    <div class="form-field">
        <label for="question">Question</label>
        <input id="question" name="question" type="text" placeholder="Question" bind:value={pollData.question}  />
        <p class="error">{error.question}</p>
    </div>
    <div class="form-field">
        <label for="optionA">Option A</label>
        <input id="optionA" name="optionA" type="text" placeholder="Option A" bind:value={pollData.optionA}  />
        <p class="error">{error.optionA}</p>
    </div>
    <div class="form-field">
        <label for="optionB">Option B</label>
        <input id="optionB" name="optionB" type="text" placeholder="Option B" bind:value={pollData.optionB}  />
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