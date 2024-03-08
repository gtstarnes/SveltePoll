import { writable } from "svelte/store";
import type { PollType } from "../types/types";

const initial: PollType[]= [];
const PollStore = writable(initial)

export default PollStore