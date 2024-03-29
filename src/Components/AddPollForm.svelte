<script lang="ts">
    import {PollStore} from "../stores/PollStore";
	import { createEventDispatcher } from "svelte";
    let poll = {question: '', optionA: '', optionB: ''}
    let error = {question: '', optionA: '', optionB: ''}
    const dispatch = createEventDispatcher();

    const hasError = () => {
        error = {question: '', optionA: '', optionB: ''}
        if (poll.question.length < 10){
            error.question = "QUESTION MUST BE LONGER THAN 10 CHARACTERS"
        }
        if (poll.optionA.trim() === ''){
            error.optionA = "Option is required"
        }
        if (poll.optionB.trim() === ''){
            error.optionB = "Option is required"
        }
        if (error.question !== '' || error.optionA !== '' || error.optionB !==''){
            return true
        } else {
            return false
        }
    }
    
    const createPoll = () => {
        if (hasError()) {
            return
        }
        const newPoll = {...poll, id: Math.random(), voteA: 0, voteB: 0}
        PollStore.update(polls => {
            return [newPoll, ...polls]
        })
        dispatch('createPoll')
    }
</script>

<form>
    <div class='form-field'>
        <label for="question">Question</label>
        <input type="text" placeholder="Add a Question" id="question" name="question" bind:value={poll.question} />
        <div class="error">{error.question}</div>
    </div>
    <div class='form-field'>
        <label for="optionA">Option A</label>
        <input type="text" placeholder="Add Option A" id="optionA" name="optionA" bind:value={poll.optionA} />
        <div class="error">{error.optionA}</div>
    </div>
    <div class='form-field'>
        <label for="optionB">Option B</label>
        <input type="text" placeholder="Add Option B" id="optionB" name="optionB" bind:value={poll.optionB} />
        <div class="error">{error.optionB}</div>
    </div>
    <div>
        <button type="submit" on:click={createPoll}>Submit</button>
        <button type="reset" >Reset</button>
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