# Angular

**App开发模式**

Native App:基于本地(操作系统)运行的App  
 - 优点：速度快，性能高，用户体验效果好  
 - 缺点：无法跨平台，开发成本高，更新麻烦

Web App:基于高端机的浏览器运行的App  
 - 优点：跨平台，开发周期短，开发成本低，更新较简单，维护较轻松  
 - 缺点：用户体验不佳 
 
Hybrid App:基于以上两种发展出来的产物  
 - 结合原生用户体验效果好和Web App的跨平台开发的优势

混合应用：  
 通常是基于第三方跨平台移动开发框架进行开发  
 继承了Web App实时更新、开发成本低等优点  
 通过应用商店区分移动操作系统分发，用户需安装使用的移动应用  
 使用方式和Native App一致  

**Ionic介绍**  
 是一个用来开发混合手机应用的，开源的，免费的代码库  
 可以快速创建一个跨平台的移动应用  
 提供了很多UI组件，帮助开发者开发强大的应用  
 完全基于Angular框架  
 专注原生，性能优越，运行速度快  
 Ionic = Ionic CSS + Angular + Cordova  

**Angular介绍**  
Angular是一个来自谷歌的开源的前端JavaScript框架，诞生于2009年，常用于开发单页面应用

Angular2.0以后基于TypeScript，TypeScript是JavaScript的超集，兼容JavaScript。
文件扩展名为 .ts，运行前需预编译成JavaScript代码，TS加入了类型判断，编译时需要进行类型检查

**Cordova介绍**  
Cordova是一个开源的移动开发框架，允许使用标准的Web技术即HTML5、CSS3和JavaScript进行跨平台开发，插件是Cordova框架的重要组成部分，他提供了Cordova和原生组件相互通信的API，使得能够通过JavaScript调用原生功能

**Angular开发涉及到的命令**  
Angular Cli：是一个命令行界面工具，可以创建项目、添加文件以及执行其他开发任务，如测试、打包和发布

全局安装 cli：`npm install -g @angular/cli`  
创建项目：`ng new  项目名称`  
进行项目：`cd 项目名称`  
启动服务器：`ng serve --open(--open 可以自动打开浏览器并访问http://localhost:4200)`  

**模板语法**  
插值表达式：`{{}}`  
属性绑定：`[属性名]="xxx"`  
数据循环：`<div *ngFor="let item of arr;let i=index">{{item}}</div>
`  
条件判断：`<div *ngIf="xx">xxx</div>`  
事件绑定：`<button (click)=“clickFun( )”>点击</button>`  
条件选择：  

    <div [ngSwitch]="num">  /* num是变量 */
      <div *ngSwitchCase="0">ngSwitchCase 0</div>
      <div *ngSwitchCase="1">ngSwitchCase 1</div>
      <div *ngSwitchCase="2">ngSwitchCase 2</div>
      <div *ngSwitchCase="3">ngSwitchCase 3</div>
      <div *ngSwitchDefault>ngSwitchCase Default</div>
    </div>

双向数据绑定：数据通过属性绑定从组件传到输入框，用户的修改通过事件绑定传回组件，把属性值设置为最新的值  

	引入FormsModule模块
	import { FormsModule } from '@angular/forms';
 	imports: [ BrowserModule, FormsModule ]

	然后才可以使用 [(ngModel)]="xx"

**组件**

组件负责控制屏幕上的某一块区域，即视图。组件是Angular的核心理念，模块化机制是为组件化服务的

创建组件：  

	通过命令创建组件：ng g component componentName 
	在AppModule中声明组件(如果通过命令创建组件，angular会自动添加声明)：
		引入：import { ComponentName } from ‘./components/……';
		声明：在 declarations 数组中声明

使用组件：`<app-组件名></app-组件名>`  

组件的基本构成：  

	import { Component } from '@angular/core'; // @angular/core： angular的核心模块
	@Component({  // Component为装饰器（组件元数据装饰器） 用该装饰器定义了一个组件  装饰器内的属性为元数据 比如selector:xx
	selector: 'app-root', // 该组件可通过<app-root>这样一个html标签来调用 也可作为css选择器
	templateUrl: './app.component.html',  // 指定一个html文件作为组件的模板 <app-root>将展示这个html里面的内容
	styleUrls: ['./app.component.css']  //指定该组件的样式文件})

	export class AppComponent {
  		title = 'app';
	}  // 通过把上面装饰器的属性添加到这个TS类上 =>告知angular把这个类作为一个组件
	
	上行的这个TS类代码定义了这个组件的控制器
	所有的组件都需要使用@Component装饰器来注解

组件交互之父组件到子组件：

	 子组件引入 Input
 		import { Input } from '@angular/core';
  	 声明属性
 		@Input( ) 属性名;				
  	 绑定属性(下面的标签是父组件模板中子组件)
 		<app-组件名  [ 属性名 ] = “属性值”></app-组件名>

组件交互之子组件到父组件：

	子组件引入 EventEmitter ，Output
 		import { EventEmitter, Output } from '@angular/core';
 	子组件暴露 EventEmitter 属性，并用@Output（）装饰
 		@Output( ) eventName = new EventEmitter( );				
 	通过 EventEmitter 的 emits 方法传递数据
		this.eventName.emits(data)
	父组件绑定事件，通过事件对象（$event）接收数据
 		<app-组件名 ( eventName )="fun($event,data)">
	
**生命周期钩子**

Angular每个组件都存在一个生命周期，从创建，变更到销毁，Angular提供了组件生命周期钩子，把这些关键时刻暴露出来，赋予在这些关键结点和组件进行交互的能力

常见生命周期钩子(按时间顺序)：  
ngOnChanges( )：检测到组件输入属性发生变化时调用  
ngOnInit( )：在构造函数之后(也是设置完输入属性后)马上执行复杂的初始化逻辑，只调用一次  
ngDoCheck ( )：检测被Angular忽略的更改  
ngOnDestroy( )：执行组件注销时的清理工作

**服务**

服务是一个具有特定功能的独立模块，用于封装不与任何特定视图相关的业务代码，用于存储组件之间共享的数据，提高代码的利用率，方便测试和维护

服务创建：  

	创建命令：ng g service serviceName
	注入服务：
	引入：import { serviceName } from ‘./services/……';
	依赖注入：在 providers 数组中依赖注入
	声明：在 constructor 中声明

**依赖注入**

依赖注入既是设计模式，又是一种机制，当应用程序的一些部件需要另一些部件时，利用依赖注入来创建被请求的部件，并将它们注入到发出请求的部件中

**路由**

应用程序一般包含多个视图(view)。 用户通过点击链接、按钮等，在视图之间导航，Angular 中的路由是一个特性丰富的机制，可以配置和管理整个导航过程，包括建立和销毁视图

路由出口 ：`<router-outlet></router-outlet>`  
路由链接 ：`<a routerLink="/" routerLinkActive="class1 class2" ></a>  // routerLinkActive：将CSS类添加到激活路由的元素上
`   

配置路由：  

	// 一般路由
	import { RouterModule } from '@angular/router';
	RouterModule.forRoot([
       	{ path: "/", component:"组件名"}
    ]) 

	// 通配符路由
	RouterModule.forRoot([
       	{ path: "**", component:"组件名"}
    ]) 

	// 重定向路由
	RouterModule.forRoot([
       	{ path: "/www", redirectTo:"默认路由路径", pathMatch:"full"}
    ]) 

	// 动态路由
	 RouterModule.forRoot([
       	{ path: "home/:id", component:"组件名"}
    ]) 
	获取：
	在获取数据的引入 ActivatedRoute 模块
 	import { ActivatedRoute } from '@angular/router';
 	constructor（private route: ActivatedRoute）{ }
 	this.route.snapshot.params["id"]

用js也可实现路由跳转：
	
	引入 Router 模块：
 		import { Router } from '@angular/router'; 
 	构造函数中声明：
 		constructor（public _router：Router）{  }
 	调用 Router.navigate ( ) 方法
	
路由之间传递Query参数：

	传值：
 		<a [routerLink]="['/']" [queryParams]="{  }"></a>
 		Router.navigate( ['/'],{ queryParams:{  } } );
 	接收：
 		this.route.queryParams.subscribe(params=>{  });

父子路由：

	{ path : “路径”, component :“组件名”, children :[
       { path: “路径”, component:“组件名”}，……
   	]} 

**HTTP服务**

HTTP服务是 Angular 中使用 HTTP 协议与远程服务器进行通讯的一个独立模块

使用步骤：  

	根模块中引入 HttpModule 
 		import { HttpModule } from "@angular/http";
 	模块装饰器中注入
 		imports:[ HttpModule ]
	组件中引入 HTTP 服务
 		import { Http,Jsonp } from “@angular/http”;  
	组件构造函数中声明
		 constructor( public http:Http,public jsonp:Jsonp ){  }
	调用GET请求函数
 		this.http.get( url ).subscribe( data=>{  } );
 		this.jsonp.get( url?callback=JSONP_CALLBACK ).subscribe( data=>{  } );

	调用POST请求
		引入 Headers
 			import { Headers } from "@angular/http";
 		设置请求头
 			headers = new Headers( {'Content-Type':'application/x-www-form-urlencoded'} );
 			this.http.post( url,data, {headers:this.headers} ).subscribe(  );

**指令**

指令作用在特定的 DOM 元素上，可以扩展该元素的功能，为元素增加新的行为

指令分类：属性指令(改变元素的属性)、结构指令(决定元素的去留)

通用指令：  
ngClass：同时添加或移除多个 CSS 类 [ ngClass ] = "{'类名': value, … }"  
ngStyle：同时设置多个内联样式 [ ngStyle ] = "{'样式': value, … }"

ngIf、ngFor、ngSwitch（基础语法中已讲过）

路由指令：routerLink、routerLinkActive、routerOutlet

自定义指令：ng g directive directiveName

**管道(pipe)**

管道可转换数据显示的格式

使用方式：{{ data | UpperCasePipe(转为大写字母) }}   LowerCasePipe(小写字母)  
JsonPipe(转换为JSON)  
DatePipe(转换为日期格式)

自定义管道：命令：ng g pipe pipeName

**IONIC**

安装cordova、ionic：`npm install -g cordova ionic`  
创建项目：`ionic start tabs/blank`  
启动项目：`ionic serve`  

ionic项目目录结构：  

* node_modules ：node 各类依赖包
* resources ：android/ios 资源（更换图标和启动动画）
* plugins：插件文件夹，里面放置各种 cordova 安装的插件
* platforms：生成 android 或者 ios 安装包存放位置
* www：静态文件
* src：开发工作目录，页面、样式、脚本和图片都放在这个目录下
* app：应用根目录
* assets：资源目录（静态文件（图片，js 框架等））
* pages：页面文件，放置编写的页面文件，包括：html，scss，ts
* theme：主题文件，里面有一个 scss 文件，设置主题信息

创建页面：`ionic g page 页面名`

视图切换：  

	import { NavController } from 'ionic-angular';
	构造函数中声明：
		constructor(public navCtrl: NavController) { }

	navCtrl.push(视图)	
	navCtrl.pop()



