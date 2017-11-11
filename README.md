# North_for_JS
备战期末JS，记录一些奇奇怪怪的东西
一切，仅针对我自己，我只记录我容易忘或比较奇怪的东西
***

### JS数据类型
#### 1.typeof与instanceof
typeof运算符的返回值是字符串类型  

	typeof true    //"boolean"  

typeof适用于检测基本数据类型，不适合检测引用类型，因为typeof运算符对于对象数据类型中的所有的值，最后返回的结果都是"object"

typeof运算符去处理一个函数时返回"function"  
	
	typeof function(){}     //"function"  
	typeof Array            //"function"  
	typeof Number           //"function"     


instanceof运算符常用来检测引用类型  
只要在当前实例的原型链上，用instanceof检测出来的结果都是true  

	typeof null     //"object"  
	因为null是空对象的引用

#### 2.基本类型与引用类型的区别
赋值时不同 判等时不同 函数参数传递时不同  

	var a1=new Number(200);
	var b1=a1;
	a1==b1;      //true
	a1===b1;     //true
	
	b1=200;
	a1==b1;      //true
	a1===b1;     //false

-

	var a1=new Number(200);
	var b1=new Number(200);
	a1==b1;      //false
	a1===b1;	 //false

也就是说 如果是两个引用类型判等 先比较两个对象是否指向同一内存空间

#### 3.各种类型中的小点

	Number(3.15f)       //NaN  
	parseInt(3.15f)     //3  
	parseFloat(3.15f)   //3.15


Math对象的方法(一小小小部分)：  
Math.ceil()  Math.floor()  Math.round()  Math.random()  

	Math.round(3.49)    //3  

ceil floor round按小数点后一位计算  


	typeof NaN        //"number"  
	typeof Infinity   //"number"  
	NaN==NaN          //false  
	1/0               //Infinity  
	-1/Infinity       //-0

-

	var str = "abc_def_ghi_jkl_mn";
	var str1=str.split("_");       //["abc", "def", "ghi", "jkl", "mn"]
	var str2=str.split("_",3);     //["abc", "def", "ghi"]
	var str3=str.concat("_opq");   //"abc_def_ghi_jkl_mn_opq"
	var str4=str.substr(4,3);      //"def"
	var str5=str.substr(-1000,2);  //"ab"
	var str6=str.substr(1000,2);   //"" 空字符串
	var str7=str.substring(4,7);   //"def"
	var str8=str.substring(4,NaN); //"abc_"
	var str9=str.substring(4,4);   //""
	var str10=str.substring(7,4);  //"def"
	var str11=str.substring(-6,15); //"abc_def_ghi_jkl"

对上面示例做一些解释：  
split()方法用于将字符串分隔成数组 参数1为指定的分隔符 默认为',' 参数2为数组的长度 如果长度超过此值 以该值为准;如果少于该值 以少的为准

substr()方法用于截取字符串 参数1为起始位置 参数2为截取的长度 参数1不可省 参数2可省(截取到最后) 参数1为负很多时(很多意思为超过字符串的长度的值)位置为0  参数1为正很多时截取空字符串

substring()方法用于截取字符串 参数1为起始位置 参数2为终止位置 左闭右开 且参数2的位置可大于参数1(截取时永远都是从左到右 即从小到大 无论参数1 2 谁大谁小)如果任一参数小于 0 或为 NaN，则被当作0 如果任一参数大于 字符串.length，则位置被当作 字符串.length

concat()用于字符串拼接


返回undefined的情况:   
声明变量未赋值 对象的属性 函数无返回值



获取对象属性的方法:  

* for in :  遍历整个原型链上可遍历的属性  
* Object.keys()  :  Object.keys 返回一个数组，其元素来自于从给定的对象上面可直接枚举的属性 这些属性的顺序与手动遍历该对象属性时的一致(for in)    
* 属性 in 对象 ： 能够检查该对象整个原型连上的属性，包括不可遍历的属性  


数据类型转换的小点

	console.log(Boolean(undefined));   //false
	console.log(Boolean(null));        //false
	console.log(Boolean(NaN));         //false
	console.log(Boolean(""));          //false
	console.log(Boolean({}));          //true

对象类型转换成布尔类型时 都为true

	console.log(Number(undefined));     //NaN
	console.log(Number(null));          //0
	console.log(Number(""));            //0
	console.log(Number("abc"));         //NaN
	console.log(Number("123.345xx"));   //NaN
	console.log(Number("32343,345xx")); //NaN
	console.log(Number({x:1,y:2}));     //NaN

将其他类型转换为字符串类型 除了对象类型 其它类型加上' '即可  


字符串中经常配合正则使用的方法：	

	String.prototype.search(regexp);
	String.prototype.match(regexp);
	String.prototype.replace(regexp); 

-

	var a=[1,2,3,4];
	a.length=0;
	console.log(a);      //[]
	注意：数组是引用类型


### 语法
#### 1.ES5无块作用域且存在预解析

	if(false){
		var a=20;
	
	}
	console.log(a);         //undefined

	//上述等同于
	var a;
	if(false){
		a=20;
	}
	console.log(a);

-

	for(var i = 0;i<5;i++){
    	console.log("in for ",i);
	}
	console.log("out of for ",i);
	
	in for 0
	in for 1
	in for 2
	in for 3
	in for 4
	out of for 5


#### 2.严格模式
针对整个脚本使用严格模式:在脚本的最上面添加'use strict'  
针对函数使用严格模式：在函数体内的最上面添加'use strict'  

* 严格模式下全局变量需要显示声明 即声明变量需使用var(es5中的严格模式)  
* 严格模式下普通函数中的this指向undefined
* 严格模式下不可改变基本类型的属性(例如不可以"a".length=10  在非严格模式下不会改变但也不会报错)
* 严格模式下禁止函数参数重名(变量可以 后定义的覆盖先定义的)
* 严格模式下禁止删除未定义的变量


		//严格模式的位置
		function isStrictMode() {
    		return this === window?false:true;
		}
		"use strict"
		console.log(isStrictMode());    //false

		"use strict"
		function isStrictMode() {
    		return this === window?false:true;
		}
		console.log(isStrictMode());    //true

		function isStrictMode() {
		"use strict"
	    	return this === window?false:true;
		}
		console.log(isStrictMode());    //true

		function isStrictMode() {
    		return this === window?false:true;
		"use strict"
		}
		console.log(isStrictMode());    //false

		在编码时将"use strict"放到你要使用严格模式的位置之前


#### 3.switch
switch与case的比对是全等(===)  

switch的两种模式

	//switch的两种模式
	var i="5";
	switch(i){
    case 5:
		console.log("number");
		break;
    case "5":
		console.log("string");
		break;
    default:
		console.log("others");	
	}
	// string
	---------------------------------------
	var l=75;
	switch(true){
    case l>90:
		console.log("还行");
		break;
    case l>80:
		console.log("真棒");
		break;
    case l>70:
		console.log("无敌");
		break;
    default:
		console.log("人中龙凤");
	}
	//无敌

switch语句的穿透性
	
	var f=1;
	switch(f){
		case 0:
			console.log(0);
		case 1:
			console.log(1);
		case 2:
			console.log(2);
		case 3:
			console.log(3);
		default:
			console.log("others");
	}
	
	1
	2
	3
	others


#### 4.对稀疏数组的遍历
两种遍历数组的方法的  
遍历对象用for in  
遍历数组、字符串用for of
	
	var a=[1,,2,3,,4];
	for(var i in a){
		console.log(i,a[i]);
	}	

	0 1
	2 2
	3 3
	5 4
	//会跳过为空的数组项

	--------------------------------------

	for(var j of a){
		console.log(j);
	}
	
	1
	undefined
	2
	3
	undefined
	4


#### 5.避免混淆=与==
在编写表达判断的语句时，要避免将==错写为=，如果发生错写，也不会报错(因为js不是编译型语言)  

结果办法：`1==a` 即将正常思维中==两边的元素位置互换 即左边为一个确值 右边为一个变量 如果将==写成=则会报错
	
	var a=1;
	if(1=a){
		xxx;
	}
	这样会报错

### 6. ++ 与 +=
这两个是有区别的，不要混淆

	var a="1";
	a++;     
	console.log(a);   //2

	var b="1";
	b+=1;
	console.log(b);   //"11" 


### 函数
#### 1.定义函数
定义函数的方法  
* 函数声明 (function xx(){})  
* 函数表达式(var xx=function(){})  
* Function构造函数实例化(var xx=new Function());

#### 2.this指向
* 普通函数中，this指向window 严格模式下指向undefined 
* 函数对象调用call或apply或bind方法时，this指向call或apply或bind的第一个参数
* 作为对象的方法时，this指向方法所属的对象
* 作为构造函数时，this指向实例化的对象

		function Person(name){
			this.name=name;
		}
		Person.prototype.sayHi=function(){
			console.log("Hi,i'm "+this.name);
		}
		var p1=new Person("Jack");
		p1.sayHi();
	
		//Hi,i'm Jack
		//属于上面中作为构造函数的规则

#### 3.typeof回顾
	
	var arr=new Array();
	typeof Array         //function
	typeof arr           //object
	
	String() Number() 等等同Array
	-------------------------------------------
	
	下面是特殊情况：
	var foo=new Function();
	typeof Function     //function
	typeof foo			//function


#### 4.函数对象
函数对象的属性   
  
* length:形参个数   
* arguments:实参的个数  
* caller:获取调用当前函数的函数  
	如果函数是从 JavaScript 程序的顶层调用的，则caller为null
	
		var obj = {
    		foo1:function(){
        		console.log(this.foo1.caller);
    		},
    		foo2:function abc(){ //写函数名与不写函数名的区别
        		this.foo1();
    		}
		};
		obj.foo1();      //null
		obj.foo2();		 //函数abc的函数体


* callee:  
  callee 是 arguments 对象的一个属性，它可以用于引用该函数的函数体内当前正在执行的函数，常用来执行递归。ES5严格模式下不可用  

		function dg(n){
    	if (n <= 0)
        	return 1;
    	else
        	return n * arguments.callee(n - 1);
		};
		dg(5);        //120

* prototype  
	函数的原型对象

* constructor  
  prototype的属性 指向构造器


函数对象的方法

* call
* apply
* bind
	[bind详解](https://segmentfault.com/a/1190000002662251)
* toString、valueOf


#### 5.预解析
JS解析和执行的过程：  
1.全局预解析阶段，将全局变量(var)和函数声明(function)前置  
2.全局顺序执行阶段，变量赋值，函数调用等正常操作  
3.当遇到函数调用时，在执行函数内代码前，进行函数范围的预解析  
4.当存在函数嵌套时，以此类推，会进行多次函数预解析  


	AA();
	function AA(){
    	console.log("AA_1");
	}
	var AA = function AA(){
    	console.log("AA_2");
	};
	AA();

	AA_1
	AA_2
	在同一作用域内，如果一个函数和一个变量重名，且变量未赋值，该标识符指向函数，例如上例输出AA_1
	
	或 一个变量和另一个变量重名，且下面的变量未赋值，该标识符指向上一个变量代表的数据或引用

	例
	var a=333;
	var a;
	console.log(a);      //333

	function ab(){console.log("111")};
	var ab;
	ab;               //ƒ ab(){console.log("111")}

#### 6.作用域

ES5中使用立即执行表达式(IIFE)来模拟块作用域

JS采用的是词法作用域(即静态作用域)，在编码阶段就决定好了作用域，与在哪里调用无关  

	var name="Jack";
	function echo(){
		console.log(name);
	}
	function env(){
		var name="Bill";
		echo();
	}
	env();            //Jack

通过new Function创建的函数不一定遵循静态作用域

#### 7.闭包

闭包是指一个函数或函数的引用与一个引用环境绑定在一起。引用环境是一个存储该函数每个非局部变量的表

不合理使用闭包(或过多使用闭包)会导致：空间浪费 内存泄露 性能消耗  

	html:
	<div id="d1">div1</div>
    <div id="d2">div2</div>
    <div id="d3">div3</div>
	
	js:
	for(var i=1;i<4;i++){
      document.getElementById("d"+i).onclick=function(){
        alert(i);
      };
    }
	//结果 无论点击哪个div都弹出4
	出错点在于三个函数中的i都指向同一块作用域的i了

	利用闭包解决问题
	for(var i=1;i<4;i++){
      !function(i){
        document.getElementById("d"+i).onclick=function(){
          alert(i);
        };
      }(i);
    }

-

	//利用闭包模仿类(或保护私有变量)
	(function(){
		var _userId=2333;
		var _typeId='user';
		var export={};

		function converter(userId){
			return +userId;
		}

		export.getUserId=function(){
			return converter(_userId);
		}
		export.getTypeId=function(){
			return _typeId;
		}
		window.export=export;
	}());


#### 8.执行上下文环境及作用域
详见红宝书73页

	//一个涉及到预解析和执行环境及作用域的例子
	function changeColor(){
		if(color==='blue'){
			color="red";
		}
		else if(color===undefined){
			color="yellow";
		}
	}
	changeColor();
	console.log(color);      //yellow
	var color="blue";
	console.log(color);      //blue

	----------------------------------------
	上述代码相当于
	function changeColor(){
		if(color==='blue'){
			color="red";
		}
		else if(color===undefined){
			color="yellow";
		}
	}
	var color;          //此时color为undefined
	changeColor();
	console.log(color);
	color="blue";
	console.log(color);	

代码执行时过程:  
先进性预解析，然后按顺序执行，执行函数调用时，先在函数内进行预解析，将执行环境弹入环境栈的栈顶，并生成作用域链，然后执行函数，函数执行完毕后执行环境弹出环境栈，销毁函数即作用域链(如果涉及到闭包或有变量引用则另当别论)  
有些笼统待补全


### 对象
#### 1.对象是什么
对象是若干无序属性的集合  

#### 2.创建对象
方法：  
1.通过字面量创建  
2.通过Object构造函数创建  
3.通过Object的create静态方法创建

#### 3.对象属性的分类
1.数据属性  
2.访问器属性  
3.内置属性  

#### 4.对象的数据属性的特性
* value 属性的值  
* writable 确定属性是否可写  
* configurable 确定属性是否能删除和其他特性是否可配置(其他的特性的false 和 true不可不修改)  
* enumerable 确定属性是否可枚举(是否可for in遍历到)

		var obj={
			x:1,
			y:2
		};
		Object.defineProperty(obj,"x",{enumerable:false});
		for(var k in obj){console.log(k,obj[k])} 
		//y   2  
		//x并没有遍历到


如果Object.defineProperty的第二个参数是没有定义的属性则 四个特性都是false（value默认为undefined 但可通过value特性设置）  

	Object.defineProperty(a,"z",{});
	Object.getOwnPropertyDescriptor(a,"z");  
	//{value: undefined, writable: false, enumerable: false, configurable: false}

可一次性为一个对象的多个属性添加或修改特性
	
	var a={x:1};
	Object.defineProperties(a,{
		a:{value:1,enumerable:true},
		b:{value:2,enumerable:true},
		c:{value:3,enumerable:true}
	});
	a
	//{x: 1, a: 1, b: 2, c: 3}

全局变量(window对象的属性)的默认配置为：  
{value:具体情况具体分析, writable: true, enumerable: true, configurable: false}

#### 5.对象的访问器属性
	var o={
		_x:1,
		get x(){               
			return this._x;
		},
		set x(val){
			this._x=val;
		}
	};
	console.log(o.x);    //调用get方法     1
	o.x=2;               //调用set方法
	console.log(o.x,o._x);   //2 2

如果只有get方法则只是只读属性 即无法通过set方法去改变值  但是可以通过直接访问属性的方式去改变值 即 o._x=10 有效    

get和set不是对象的方法 不可按照方法进行调用 应以上述例子为准 

可通过set方法在对属性进行修改时进行数据过滤、约束  即可对修改加以限制 作用不止于此
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
	var p1={
		_name:"Jack",
		_age:23,
		set age(val){
			if(val>0&&val<150){
				this._age=val;
			}
			else{
				console.log("请设置正常属性");
			}
		},
		get age(){	
			return this._age;
		}
	};

	p1.age=178;             //请设置正常属性

实现了过滤的效果 set和get内都可以加函数实现某种功能


#### 6.对象的访问器属性的特性
* configurable 确定属性是否能删除和其他特性是否可配置(其他的特性的false 和 true不可不修改)  
* enumerable 确定属性是否可枚举(是否可for in遍历到)
* get 在读取属性时调用
* set 在写入属性时调用

两种添加访问器属性的方法  
1.直接通过字面量创建   
如5.对象的访问器属性 所示  
  
2.通过Object.defineProperty()方法添加  

	var a={_x:1};
	Object.defineProperty(a,"x",{
		configurable:true,
		enumerable:true,
		get:function(){return this._x},
		set:function(val){this._x=val}
	});
	a.x;            //1
	a.x=10;         
	a.x;            //10

注意两个方法设置set和get时的不同

同样也可以使用Object.defineProperties方法给对象添加多个访问器属性


#### 7.对象的原型继承
大多都会，粗略记

	//通过静态方法创建对象时的继承
	var a={};
	var b=Object.create(a);
	b.__proto__===a;           //true

#### 8.对象的原型继承中原型共享问题
通过静态方法继承或通过构造函数继承存在原型共享的问题，即他们的一些属性都是指向原型链中某一对象的属性，并非他们私有，如果该对象修改该属性则会影响这么一大堆对象

解决办法：  
模拟类-类继承的方式(一)  

	function Person(name,age){
    	this.name = name;
    	this.age = age;
	};
	Person.prototype.showName = function(){console.log(this.name);};
	function Student(name,age,id){
    	Person.call(this,name,age);
    	this.id = id;
	}
	Student.prototype.__proto__ = Person.prototype;
	var s1 = new Student("xxx",22,2017001);
	var s2 = new Student("www",23,2017002);
	
	s1          //new Student("xxx",22,2017001);
	s2		    //new Student("www",23,2017002);
	name age id属性均为s1 s2私有 不会出现原型共享问题


模拟类-类继承的方式(二)  

	function Person(name,age){
    	this.name = name;
    	this.age = age;
	};
	Person.prototype.showName = function(){
	    console.log(this.name);
	};
	function Student(name,age,id){
    	Person.call(this,name,age);
    	this.id = id;
	}
	Student.prototype = Object.create(Person.prototype);
	// console.log(Person.prototype.constructor); //
	// console.log(Student.prototype.constructor); //  
	//Object.create语句使Student.prototype被覆盖掉 所以访问constructor会沿着原型链访问Person.prototype的constructor
	Student.prototype.constructor = Student;
	var s1 = new Student("xxx",22,2017001);
	var s2 = new Student("www",23,2017002);

#### 9.this缺陷
* 软绑定
* call或apply
