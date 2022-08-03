import { Interaction } from "../data-types/interfaces";

export function postId() {
    fetch("api/participants/", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
    .then((data) =>
        {
    console.log(data);
    }).catch((error) => {
    console.log(error);
    });
}

export function postInteraction(i: Interaction) {
    fetch("api/interactions/", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(i),
        }).then((response) => response.json())
    .then((data) =>
        {
    console.log(data);
    }).catch((error) => {
    console.log(error);
    });
}


