
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;

        var ttfLabel = new cc.LabelTTF("Hello LabelTTF", "Arial", 50);
    
        ttfLabel.x = size.width / 2;
        ttfLabel.y = size.height / 1.5;

        ttfLabel.setFontFillColor(cc.color.RED)  // 文字填充颜色
        ttfLabel.setFontSize(100)  // 字体大小
        ttfLabel.enableStroke(cc.color.YELLOW,5) // 描边
        ttfLabel.enableShadow(cc.color.WHITE,15,15,15) // 阴影

        this.addChild(ttfLabel);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

