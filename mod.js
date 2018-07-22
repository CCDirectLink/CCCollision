document.body.addEventListener('simplifyInitialized', function () {
	var originalLoad = cc.ig.gameMain[cc.ig.varNames.gameMainLoadMap];
	cc.ig.gameMain[cc.ig.varNames.gameMainLoadMap] = function(data){
		onLoad(data);
		return originalLoad.apply(cc.ig.gameMain, arguments);
    };
    
    new cc.ig.Image('media\/map\/collisiontiles.png').load();
    
    simplify.options.addEntry('collision-shown', 'CHECKBOX', true, 0, undefined, true);
    var display = 'Show collisions';
    var description = 'Show collisions';
    ig.lang.labels.sc.gui.options['collision-shown'] = {name:display, description:description};
    
    
	function onLoad(data) {
        if (!sc.options.get('collision-shown'))
            return;

		var layers = data.layer;
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];

            if(layer.type === 'Collision') {
                var copy = $.extend({}, layer);
                copy.id |= 0x1000;
                copy.type = 'Background';
                copy.tilesetName = 'media\/map\/collisiontiles.png';
                layers.push(copy);
            }
        }
	}
});