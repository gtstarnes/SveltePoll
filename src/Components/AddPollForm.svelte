<script lang="ts">
    import {PollStore} from "../stores/PollStore";
	import { createEventDispatcher } from "svelte";

    let fields = {question: '', optionA: '', optionB: ''}
    let error = {question: '', optionA: '', optionB: ''}
    let valid = false;
    const dispatch = createEventDispatcher();

    const resetPoll = () => {
        fields = {question: '', optionA: '', optionB: ''}
        error = {question: '', optionA: '', optionB: ''}
    }
    const submitPoll = () => {
        valid = true
        if (fields.question.length < 10){
            valid = false
            error.question = 'Question must be longer than 10 characters'
        } else {
            error.question = ''
        }
        if (fields.optionA.length === 0){
            valid = false
            error.optionA = 'Option is required'
        } else {
            error.optionA = ''
        }
        if (fields.optionB.length === 0){
            valid = false
            error.optionB = 'Option is required'
        } else {
            error.optionB = ''
        }

        if(valid){
            const poll = {...fields, voteA: 0, voteB: 0, id: Math.random()}
            PollStore.update(polls => {
                return [poll, ...polls]
            })
            dispatch('addPoll');
            resetPoll();
        }
    }
</script>

<form on:submit|preventDefault={submitPoll}>
    <div class="form-field">
        <label for="question">Question</label>
        <input name="question" id="question" type="text" placeholder="Question" bind:value={fields.question} />
        <p class="error">{error.question}</p>
    </div>
    <div class="form-field">
        <label for="optionA">Option A</label>
        <input name="optionA" id="optionA" type="text" placeholder="Option A" bind:value={fields.optionA} />
        <p class="error">{error.optionA}</p>
    </div>
    <div class="form-field">
        <label for="optionB">Option B</label>
        <input name="optionB" id="optionB" type="text" placeholder="Option B" bind:value={fields.optionB} />
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