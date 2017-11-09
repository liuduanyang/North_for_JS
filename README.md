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

