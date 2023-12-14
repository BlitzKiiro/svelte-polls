import { writable } from "svelte/store";

const polls = [
  {
    id: 1,
    poll: "Do you like potatos",
    option1: "Yes",
    option2: "Hell Yeah",
    option1Votes: 0,
    option2Votes: 0,
  },
];

const pollsStore = writable(polls);

export default pollsStore;
