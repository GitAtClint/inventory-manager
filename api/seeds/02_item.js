/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {user_id: 1, item_name: '3d white', description: 'crest 3d white toothpaste', quantity: 0 },
    {user_id: 1, item_name: '4d white', description: 'crest 4d white toothpaste', quantity: 6 },
    {user_id: 1, item_name: 'white mouthwash', description: 'crest white mouthwash', quantity: 7 },
    {user_id: 1, item_name: '3d mouthwash', description: 'crest 3d white mouthwash', quantity: 8 },
    {user_id: 1, item_name: 'total fresh', description: 'crest total fresh toothpaste', quantity: 9 },
    
    {user_id: 2, item_name: '360 colgate', description: 'colgate 360 toothbrush - one with the spirals', quantity: 1 },
    {user_id: 2, item_name: 'basic', description: 'generic no brand', quantity: 2 },
    {user_id: 2, item_name: 'bamboo bristle', description: 'environmentally friendly', quantity: 3 },
    {user_id: 2, item_name: 'supreme2k', description: 'supreme ultra mega $2k toothbrush', quantity: 4 },
    {user_id: 2, item_name: 'metal brush', description: 'dont borrow after other guys', quantity: 5 },
    
    {user_id: 3, item_name: 'prS', description: 'cpurple liquid soap', quantity: 0 },
    {user_id: 3, item_name: 'bkS', description: 'black liquid soap', quantity: 10 },
    {user_id: 3, item_name: 'lmS', description: 'lavender mint liquid soap', quantity: 99 },
    {user_id: 3, item_name: 'vnS', description: 'vanilla liquid soap', quantity: 50 },
    {user_id: 3, item_name: 'tlFS', description: 'tea leaf foam soap', quantity: 1 },
    {user_id: 3, item_name: 'barS', description: 'bar soap goes hard', quantity: 6 },
  ]);
};
