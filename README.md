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