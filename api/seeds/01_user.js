/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {first_name: 'joe', last_name: 'dirt', username: 'JoesMeterorite', password: 'qwerty'},
    {first_name: 'ronald', last_name: 'duck', username: 'playaquack', password: '123quakador@'},
    {first_name: 'tom', last_name: 'tommyboy', username: 'tomithon', password: 'mYrEaLnAmEtIm'}
  ]);
};