import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
export async function fetchEvents({ signal, searchTerm }) {
  let url = "http://localhost:3000/events";
  if (searchTerm) {
    url += "?search=" + searchTerm;
  }
  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error; //Always throw an error
  }

  const { events } = await response.json();

  return events;
}

export async function createNewEvent(eventData) {
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while creating the events");
    error.code = response.status;
    error.info = await response.json();
    throw error; //Always throw an error
  }

  const { event } = await response.json();

  return event;
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch("http://localhost:3000/events/images", {
    signal,
  });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the images");
    error.code = response.status;
    error.info = await response.json();
    throw error; //Always throw an error
  }

  const { images } = await response.json();

  return images;
}

export async function fetchEvent({ id, signal }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
  });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching this Event");
    error.code = response.status;
    error.info = await response.json();
    throw error; //Always throw an error
  }

  const { event } = await response.json();

  return event;
}

export async function deleteEvent({ id, signal }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
    method: "DELETE",
  });
  if (!response.ok) {
    const error = new Error("An error occurred while Deleting this Event");
    error.code = response.status;
    error.info = await response.json();
    throw error; //Always throw an error
  }
  return response.json();
}
