sc.OPTIONS_DEFINITION['show-collisions'] = {
  cat: sc.OPTION_CATEGORY.GENERAL,
  type: 'CHECKBOX',
  init: true,
  hasDivider: true,
  header: 'mod-collision',
};

sc.CollisionModAddon = ig.GameAddon.extend({
  init() {
    // preload the tileset
    new ig.Image('media/map/collisiontiles.png');
  },

  levelLoadStartOrder: -100,
  onLevelLoadStart(data) {
    if (!sc.options.get('show-collisions')) return;

    let layers = data.layer;
    for (let i = 0; i < layers.length; i++) {
      let layer = layers[i];
      if (layer.type === 'Collision') {
        layers.push({
          ...layer,
          id: layer.id | 0x1000,
          type: 'Background',
          tilesetName: 'media/map/collisiontiles.png',
        });
      }
    }
  },
});

ig.addGameAddon(() => (sc.collisionModAddon = new sc.CollisionModAddon()));
