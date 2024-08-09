/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {first_name: 'joe', last_name: 'dirt', username: 'JoesMeterorite', password: '$2b$12$xxN9l6cwrIR0ppscijQTzuLgmHc88rTtIDdstwm83sn9NsPAFPu5W'},//'qwerty'},
    {first_name: 'ronald', last_name: 'duck', username: 'playaquack', password: '$2b$12$VFzFl16hJUUhJLLdf/zXKuCQjzeOXUbqqgdlWcP/MZxIhimO5FYVy'},//'123quakador@'},
    {first_name: 'tom', last_name: 'tommyboy', username: 'tomithon', password: '$2b$12$AHQvSYLaQkLr/90X8jwh..arY5.G8EHHWOHjzkVXRczv./ZuT0lAu'}//'mYrEaLnAmEtIm'}
  ]);
};