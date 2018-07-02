
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();

        var size = cc.winSize;
     
        var setMenuItem = new cc.MenuItemFont('设置',function(){
            cc.log("设置了！")
        },this)

        var cancelMenuItem = new cc.MenuItemFont('取消',function(){
            cc.log("取消了！")
        },this)

        setMenuItem.x=size.width*0;
        setMenuItem.y=size.height*0;        
        
        cancelMenuItem.x=size.width*0.1;
        cancelMenuItem.y=size.height*0;

        var playMenuItem = new cc.MenuItemImage(res.PlayBtnNormal_png,res.PlaytBtnSelected_png,function(){
            cc.log("playMenuItem");
        },this);

        var aboutMenuItem = new cc.MenuItemImage(res.AboutBtnNormal_png,res.AboutBtnSelected_png,function(){
            cc.log("aboutMenuItem");
        },this);

        playMenuItem.x=size.width*0.2;
        playMenuItem.y=size.height*0;

        aboutMenuItem.x=size.width*0.3;
        aboutMenuItem.y=size.height*0;

        /*首先创建两个菜单项 musicOnItem、musicOffItem
        创建开关菜单项，参数为已创建的两个菜单项*/
        var toggleMenuItem = new cc.MenuItemToggle(musicOnItem,musicOffItem,function(){
            cc.log('开关按钮')
        },this);

        var menu = new cc.Menu(setMenuItem,cancelMenuItem,playMenuItem,aboutMenuItem,toggleMenuItem)

        this.addChild(menu);

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

