# SPA 富文本应用开发

**SPA简介**

来自维基百科：单页应用（英语：single-page application，缩写SPA）是一种网络应用程序或网站的模型，它通过动态重写当前页面来与用户交互，而非传统的从服务器重新加载整个新页面。这种方法避免了页面之间切换打断用户体验，使应用程序更像一个桌面应用程序。在单页应用中，所有必要的代码（HTML、JavaScript和CSS）都通过单个页面的加载而检索[1]，或者根据需要（通常是为响应用户操作）动态装载适当的资源并添加到页面。尽管可以用位置散列或HTML5历史API来提供应用程序中单独逻辑页面的感知和导航能力，但页面在过程中的任何时间点都不会重新加载，也不会将控制转移到其他页面。[2]与单页应用的交互通常涉及到与网页服务器后端的动态通信。

**Windows App组成**

自顶向下分解：  
用户界面(窗体)：View  
数据存储：(Model)  
逻辑控制：(Controler)  

即 MVC模式

用户界面又包括：标题栏、菜单栏(系统菜单、下拉菜单、快捷菜单)、工具栏、主窗体、状态栏、对话框

**借鉴Windows 可知Web应用组成**

组成：控件、对话框、菜单、工具栏、状态栏、页面(窗体)、属性(样式、核心样式)、方法、事件

解决浮点运算bug：  

	function roundFractional(x, n) {
  		return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
	}

	roundFractional(0.1 + 0.2, 1);         // 结果：0.3
	roundFractional(0.1 * 0.2, 2);         // 结果：0.02

**自动化构建**

质量保证：静态代码检查、单元测试  
性能优化：打包合并、压缩代码、压缩图片  

**UI设计原则**  
UI设计的四个基本原则：亲密性原则、对齐原则、重复原则、对比原则  

**H5内置控件**  

  	// 按钮类控件
  	<button>按钮1</button>
  	<button autofocus>按钮2</button>
  	<button disabled>按钮3</button>
  	<input type="radio" value="yes" id="radio"><label for="radio">同意</label>
  	<input type="checkbox" id="cbox1" value="first_checkbox">
  	<label for="cbox1">这是第一个选项</label>
  	<input type="checkbox" id="cbox2" value="second_checkbox">
  	<label for="cbox2">这是第二个选项</label>
  	<input type="submit" value="提交">
  	<input type="reset" value="重置">
	<input type="image" src="xxx.jpg">

  	// 文本框
  	<input type="text">
  	<textarea cols="30" rows="10" placeholder="说点什么吧..."></textarea>
  	<input type="password">
  	<input type="email">
  	<input type="number">
  	<input type="search">
  	<input type="tel">
  	<input type="url">

	// 列表框
	<select>
    	<option value="volvo">Volvo</option>
    	<option value="saab">Saab</option>
    	<option value="opel" selected>Opel</option>
    	<option value="audi">Audi</option>
    </select>

	// 弹窗
	window.alert(message)
	
	result = window.confirm('你吃饭了吗')
    alert(result) // 点确认为true 否则为false

	result = window.prompt("你吃饭了吗", '相当于默认值 可不写');
    alert(result) // 值为填写的内容

	// range 滑竿
	<input type="range" value="50" min="0" max="100" step="10">
	
	// 进度条
	<progress max="100" value="85">
      <span id="objprogress">85</span>%
    </progress>

	// 时间日期类
	<input type="time">   // 选择时间
  	<input type="month">  // 选择年月
  	<input type="date">   //选择年月日
  	<input type="datetime-local">   // 选择年月日时间
  	<input type="week">   // 选择第几周星期几

	// 颜色选择
	<input type="color">

	// 文件选择
	<input type="file">

**数据合法性校验**  
数据合法性校验：就是对用户输入的数据进行校验  
校验的方面：空值 输入数据类型 范围 符合模式(比如电话号码区号-号码)     
意义(价值)：保证数据的正确性、保护用户(如提示密码强度等)、保护软件  
过程：用户输入、检查数据、如果发现非法提示输入错误信息  
校验方案：  

	方案一：客户端校验、服务端校验
	方案二：
       字符级校验  对字符进行校验 利用onkeydown等事件
       字段级校验  对字段校验 比如失去焦点时对长度校验
       表单级校验  只在最终提交或计算器计算之前校验一次

	方案三：
       自己实现
       H5内置验证
       混合验证

客户端校验实现方法：  

* JavaScript 校验，这是可以完全自定义的实现方式
* HTML5 内置的校验，这不需要 JavaScript ，而且性能更好，但是不能自定义校验过程

客户端校验优点：速度快、反馈及时  

	// 设置必须填写，如果输入为空表单不会被提交，并显示错误信息
	<form action="">
    	<input type="text" required="required">
        <input type="submit">
    </form>

	// 如果 input 元素中输入的值为合法的，设置其为黄色:
	input:valid{ 
		background-color: yellow;
	}

	// 如果 input 元素中的值是非法的，设置样式为红色：
	input:invalid{ 
    	border:2px solid red;
	}

服务器端校验用户体验不好，但是必须的，是保证数据正确性的最后一步，往往开发者青睐于客户端校验与服务器端校验相结合的方式

正则的使用方法：`/a+/.test('cabc') true`

在html中使用正则:  

     <form action="">
      <input type="text" name="i_like" pattern="*a+">
      <input type="submit">
     </form>

限制长度：

	 <form action="">
       <input type="text" name="my_number" minlength="10" maxlength="20">
       <input type="submit">
     </form>

自定义错误信息：  

	// html
  	<form>
    	<label for="mail">你的电子邮箱：</label>
    	<input type="email" id="mail" name="mail">
    	<button>提交</button>
  	</form>

	// javascript
	var email = document.getElementById("mail");
  	email.addEventListener("input", function (event) {
    	if (email.validity.typeMismatch) {
      		email.setCustomValidity("你输入的不对！");
    	} else {
      		email.setCustomValidity("你输入对了！");
    	}
  	});

**组件**

组件分类：带容器组件、不带容器组件、容器+内容组件

什么是组件化：   
> 简单来说，组件就是将一段UI样式和其对应的功能作为独立的整体去看待，无论这个整体放在哪里去使用，它都具有一样的功能和样式，从而实现复用，这种整体化的细想就是组件化。不难看出，组件化设计就是为了增加复用性，灵活性，提高系统设计，从而提高开发效率。

组件化优势(自己总结):  
> 代码复用，提高开发效率。分而治之，高内聚低耦合，便于扩展和维护。

UI组件类型：菜单栏、状态栏、工具栏、模态对话框，非模态对话框、控件

模态对话框：它弹出后，本应用程序其他窗口将不再接受用户输入，只有该对话框响应用户输入，在对它进行相应操作退出后，其他窗口才能继续与用户交互  
非模态对话框：它弹出后，本程序其他窗口仍能响应用户输入，非模态对话框一般用来显示提示信息等

require.js 是复合AMD规范的

跨文档通信API：  

	// 发送消息
	window.postMessage(message,targetOrigin)
	例如:
	window.postMessage('你吃饭了吗','*')

	postMessage方法支持两个参数，具体参考下表：
	message	        发送的数据
	targetOrigin	通过窗口的origin属性来指定哪些窗口能接收到消息事件，其值可以是字符串"*"（表示无限制）或者一个URI

	// 接收消息
	window.addEventListener("message",receiveMessage,false);
	function receiveMessage(event){
		console.log(event.data);
		event.source(window?).postMessage('吃了',event.origin);
	}

本地存储：  

	// localStorage可以长期存储 sessionStorage随着页面的关闭而被清除

	localStorage.setItem('myCat', 'Tom');
	var cat = localStorage.getItem("myCat");
	localStorage.removeItem("myCat");

数据存储分类：服务器端存储、客户端存储

服务器端存储：cache、内存、磁盘文件、数据库  
客户端存储：cookie、localStorage、sessionStorage、Application Cache(离线缓存)、indexDB

**MVC是什么**

MVC模式（Model-View-Controller）是软件工程中的一种软件架构模式，把软件系统分为三个基本部分：模型  （Model）、视图（View）和控制器（Controller）

MVC好处：
> （1）一个模型提供不同的多个视图表现形式，也能够为一个模型创建新的视图而无须重写模型。一旦模型的数据发生变化，模型将通知有关的视图，每个视图相应地刷新自己。
（2）模型可复用。因为模型是独立于视图的，所以可以把一个模型独立地移植到新的平台工作。
（3）提高开发效率。在开发界面显示部分时，你仅仅需要考虑的是如何布局一个好的用户界面；开发模型时，你仅仅要考虑的是业务逻辑和数据维护，这样能使开发者专注于某一方面的开发，提高开发效率。  
总的来说MVC设计模式可以方便开发人员分工协作,提高开发效率,增强程序的可维护性和拓展性而且还利用Controller将Model与View分离,降低它们之间的耦合度。