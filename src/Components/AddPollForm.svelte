<script lang="ts">
    import PollStore from "../stores/PollStore";
	import { createEventDispatcher } from "svelte";


    let fields = {question: '', optionA: '', optionB: ''};
    let errors = {question: '', optionA: '', optionB: ''};
    let valid = false;
    const dispatch = createEventDispatcher();

    const handleSubmit = () => {
        valid = true;
        if (fields.question.length < 5){
            valid = false;
            errors.question = 'Question is too short';
        } else {
            errors.question = '';
        }
        if (fields.optionA.length === 0){
            valid = false;
            errors.optionA = 'Answer is required';
        } else {
            errors.optionA = '';
        }
        if (fields.optionB.length === 0){
            valid = false;
            errors.optionB = 'Answer is required';
        } else {
            errors.optionB = '';
        }

        if(valid){
            const poll = {...fields, id: Math.random(), voteA: 0, voteB: 0};
            PollStore.update(polls => {
                return [poll, ...polls];
            })
            dispatch('addPoll');
            handleReset();
        }
    }

    const handleReset = () => {
        fields = {question: '', optionA: '', optionB: ''};
        errors = {question: '', optionA: '', optionB: ''};
    }
</script>

<form on:submit|preventDefault={handleSubmit} >
    <div class="form-field">
        <label for="question">Question</label>
        <input name="question" id="question" type="text" placeholder="Ask a Question" bind:value={fields.question} />
        <p class="error">{errors.question}</p>
    </div>
    <div class="form-field">
        <label for="answerA">Answer A</label>
        <input name="answerA" id="answerA" type="text" placeholder="Add Answer" bind:value={fields.optionA} />
        <p class="error">{errors.optionA}</p>
    </div>
    <div class="form-field">
        <label for="answerB">Answer B</label>
        <input name="answerB" id="answerB" type="text" placeholder="Add Answer" bind:value={fields.optionB} />
        <p class="error">{errors.optionB}</p>
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