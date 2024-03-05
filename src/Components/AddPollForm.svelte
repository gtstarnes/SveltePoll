<script lang="ts">
    import PollStore from "../stores/PollStore";
	import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let poll = {question: '', optionA: '', optionB: ''}
    let error = {question: '', optionA: '', optionB: ''}
    let valid = false;

    const handleSubmit = () => {
        valid = true
        if (poll.question.length < 5){
            valid = false;
            error.question = 'QUESTION IS TOO SHORT'
        } else {
            error.question = '';
        }
        if (poll.optionA.length === 0){
            valid = false;
            error.optionA = 'OPTION IS REQUIRED'
        } else {
            error.optionA = '';
        }
        if (poll.optionB.length === 0){
            valid = false;
            error.optionB = 'OPTION IS REQUIRED'
        } else {
            error.optionB = '';
        }

        if(valid) {
            const p = {...poll, id: Math.random(), voteA: 0, voteB: 0}
            PollStore.update(polls => {
                return [p, ...polls]
            })
            dispatch('addPoll')
            handleReset();
        }
    }

    const handleReset = () => {
        poll = {question: '', optionA: '', optionB: ''}
        error = {question: '', optionA: '', optionB: ''}
    }

</script>

<form on:submit|preventDefault={handleSubmit}>
    <div class="form-field">
        <label for="question">Question</label>
        <input type="text" name="question" id="question" placeholder="Question" bind:value={poll.question} />
        <p class="error">{error.question}</p>
    </div>
    <div class="form-field">
        <label for="optionA">Option A</label>
        <input type="text" name="optionA" id="optionA" placeholder="Option A" bind:value={poll.optionA} />
        <p class="error">{error.optionA}</p>
    </div>
    <div class="form-field">
        <label for="optionB">Option B</label>
        <input type="text" name="optionB" id="optionB" placeholder="OptionB" bind:value={poll.optionB} />
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