import { writable } from "svelte/store";
import type { PollType } from "../types/types";

const initialPolls: PollType[] = []
const PollStore = writable(initialPolls);


export default PollStore;