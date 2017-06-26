/*
 * personal JS library
 * name of library：Lemontree
 */
(function () {
	
	if (!window.Lemontree) {
		window["Lemontree"] = {};
	};
	
	//检查整个库是否与当前浏览器相兼容
	function isCompatible(other) {
		
		//使用能力检测来检查必要条件
		if (other === false || !Array.prototype.push || !Object.hasOwnProperty || !document.createElement || !document.getElementsByTagName) {
			return false;
		} else {
			return true;
		}
	};
	window["Lemontree"]["isCompatible"] = isCompatible;
	
	//查找元素
	function $() {
		var elements = new Array();
		
		//查找作为参数提供的所有元素
		for (var i = 0; i < arguments.length; i++) {
			var element = arguments[i];
			
			//如果是个id
			if (typeof element === "string") {
				element = document.getElementById(element);
			};
			
			//如果参数只有一个就立即返回
			if (arguments.length === 1) {
				return element;
			} else {
				elements.push(element);
			};
		};
		return elements;
	};
	window["Lemontree"]["$"] = $;
	
	function addEvent(node, type, listener) {
		
		//使用前面的方法检查兼容性
		if (!isCompatible()) {
			return false;
		};
		
		if (!(node = $(node))) {
			return false;
		};
		
		if (node.addEventListener) {
			
			//W3C方法
			node.addEventListener(type, listener, false);
			return true;
		} else if(node.attachEvent) {
			
			//MSIE方法
			node["e" + type + listener] = listener;
			node[type + listener] = function() {
			node["e" + type + listener](window.event);
			}
			node.attachEvent("on" + type, node[type + listener]);
			return true;
		}
		return false; //两种方法皆不具备
	};
	window["Lemontree"]["addEvent"] = addEvent;
	
	function removeEvent(node, type, listener) {
		
		if (!(node = $(node))) {
			return false;
		};
		
		if (node.removeEventListener) {
			
			//W3C方法
			node.removeEventListener(type, listener, false);
			return true;
		} else if (node.detachEvent) {
			
			//MSIE方法
			node.detachEvent("on" + type, node[type + listener]);
			node[type + listener] = null;
			return true;
		}
		return false; //两种方法皆不具备
		
	};
	window["Lemontree"]["removeEvent"] = removeEvent;
	
	function getElementsByClassName(className, tag, parent) {
		parent = parent || document;
		tag = tag || "*";
		
		if (!(parent = $(parent))) {return false};
		
		//查找所有匹配的标签
		var allTags = (tag == "*" && parent.all) ? parent.all : parent.getElementsByTagName(tag);
		var mathchingElements = new Array();
		
		//创建正则检查classname
		className = className.replace(/\-/g, "\\-");
		var regex = new RegExp("(^|\\s)"+ className + "(\\s|$)");
		var element;
		
		//检查每一个元素
		for (var i = 0; i < allTags.length; i++) {
			element = allTags[i];
			
			if (regex.test(element.className)) {
				mathchingElements.push(element);
			};
		};
		return mathchingElements;
	};
	window["Lemontree"]["getElementsByClassName"] = getElementsByClassName;
	
	//tested
	function toggleDisplay(node, value) {
		value = value || "block";
		
		if (!(node = $(node))) {
			return false;
		};
		
		if (getComputedStyle(node,'display') != 'none') {
			node.style.display = 'none';
		} else {
			node.style.display = value || '';
		};
		return true;
	};
	window["Lemontree"]["toggleDisplay"] = toggleDisplay;
	
	//tested
	//在指定元素之后插入元素
	//与insertBefore相反
	function insertAfter(node, referenceNode) {
		
		if (!(node = $(node))) {
			return false;
		};
		
		if (!(referenceNode = $(referenceNode))) {
			return false;
		};
		
		if (referenceNode.nextSibling) {
			return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);	
		} else {
			var temperyNode = document.createElement("span");
			referenceNode.parentNode.appendChild(temperyNode);
			referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
			referenceNode.parentNode.removeChild(temperyNode);
		}
	};
	window["Lemontree"]["insertAfter"] = insertAfter;
	
	//清理所有子节点 tested
	function removeChildren(parent) {
		
		if (!(parent = $(parent))) {
			return false;
		};
		
		//存在子节点则删除
		while (parent.firstChild) {
			parent.firstChild.parentNode.removeChild(parent.firstChild);
		}
		
		//返回父元素，方便以.连缀处理
		return parent;
	};
	window["Lemontree"]["removeChildren"] = removeChildren;
	
	//tested
	function prependChild(parent, newChild) {
		
		if (!(parent = $(parent))) {
			return false;
		};
		
		if (!(newChild = $(newChild))) {
			return false;
		};
		
		if (parent.firstChild) {
			
			//如果存在一个子节点，就在这之前插入
			parent.insertBefore(newChild, parent.firstChild);
		} else {
			alert("没有子节点");
			//没有子节点
			parent.appendChild(newChild);
		};
		
		//返回父元素，方便以.连缀处理
		return parent;
		
		//也可以操作并没有添加进文档中的元素
	};
	window["Lemontree"]["prependChild"] = prependChild;
	
	//tested
	function bindFunction(obj, func) {
		return function() {
			func.apply(obj, arguments);
		};
	};
	window["Lemontree"]["binFunction"] = bindFunction;
	
	//获取窗口大小 tested
	function getBrowserWindowSize() {
		var de = document.documentElement;
		return {
			'width' :(window.innerWidth || (de && de.clientWidth) || document.body.width),
			'height' :(window.innerHeight || (de && de.clientHeight) || document.body.height)
		}
	};
	window["Lemontree"]["getBrowserWindowSize"] = getBrowserWindowSize;
	
	//节点类型
	window["Lemontree"]["node"] = {
		ELEMENT_NODE                : 1,
		ATTRIBUTE_NODE              : 2,
		TEXT_NODE                   : 3,
		CDATA_SECTION_NODE          : 4,
		ENTITY_REFERENCE_NODE       : 5,
		ENTITY_NODE                 : 6,
		PROCESSING_INSTRUCTION_NODE : 7,
		COMMENT_NODE                : 8,
		DOCUMENT_NODE               : 9,
		DOCUMENT_TYPE_NODE          : 10,
		DOCUMENT_FRAGMENT_NODE      : 11,
		NOTATION_NODE               : 12	
	};
	
	//查看节点类型 tested
	function checkNodeType(element) {
		var nodeType = element.nodeType;
		var nodeList = {};
		for (var i in Lemontree.node) {
			nodeList[Lemontree.node[i]] = i;
		};
		return nodeList[nodeType];	
	};
	window["Lemontree"]["checkNodeType"] = checkNodeType;
	
	//查看对象类型 tested
	function getObjectType(a) {
		var typeArray = Object.prototype.toString.call(a).split(" ");
		return function(a){
			return a.slice(0, this.length-1);
		}(typeArray[1]);
	};
	window["Lemontree"]["getObjectType"] = getObjectType;
	
	//遍历节点 tested
	function walkElementsLinear(func, node) {
		var root = node || window.document;
		var nodes = root.getElementsByTagName("*");
		for (var i = 0; i < nodes.length; i++) {
			func.call(nodes[i]);
		};
	};
		
	window["Lemontree"]["walkElementsLinear"] = walkElementsLinear;
	
	//用于处理嵌入样式的属性
	//改变了原著的camelize函数
	function camelize(s) {
		var stringArray = s.split("-");
		var stringStr = stringArray[0];
		function initialUp(s) {
			var stringArray = s.split("");
			stringArray[0] = stringArray[0].toUpperCase();
			return stringArray.join("");
		};
		for (var i = 0; i < stringArray.length; i++) {
			
			if (i == 0) {
				continue;
			} else {
				stringStr += initialUp(stringArray[i]);
			};
		};
		return stringStr;
	};
	window["Lemontree"]["camelize"] = camelize;
	
	function getEvent(e) {
		return e || window.event;
	};
	window["Lemontree"]["getEvent"] = getEvent;
	
	function stopPropagation(e) {
		e = e || getEvent(e);
		
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		};
	};
	window["Lemontree"]["stopPropagation"] = stopPropagation;
	
	function preventDefault(e) {
		e = e || getEvent(e);
		
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		};
	};
	window["Lemontree"]["preventDefault"] = preventDefault;
	
	function getTarget(e) {
		e = e || getEvent(e);
		
		//如果是W3C模型或者IE
		var target = e.target || e.srcElement;
		
		//safari中指定文本的父节点
		if (target.nodeType == Lemontree.node.TEXT_NODE) {
			target = target.parentNode;
		};
		return target;
	};
	window["Lemontree"]["getTarget"] = getTarget;
	
	//获取鼠标按键名：0为左键，1为中间键，2为右键
	//待测试，右键不行
	function getMouseButton(e) {
		e = e || getEvent(e);
		
		//初始化对象保存鼠标状态
		var whichButton = {
			"left-button": false,
			"mid-button": false,
			"right-button": false
		};
		
		//检查返回值
		if (e.toString && e.toString().indexOf("MouseEvent") != -1) {
			
			switch (e.button) {
				
				case 0 : whichButton['left-button'] = true; break;
				
				case 1 : whichButton['mid-button'] = true; break;
				
				case 2 : whichButton['right-button'] = true; break;
				
				default : break;
			};
		} else if (e.button) {
			
			switch (e.button) {
				
				case 1 : whichButton['left-button'] = true; break;
				
				case 2 : whichButton['right-button'] = true; break;
				
				case 3 : whichButton['left-button'] = true;
						 whichButton['right-button'] = true; 
						 break;
						 
				case 4 : whichButton['mid-button'] = true; break;
				
				case 5 : whichButton['left-button'] = true;
						 whichButton['mid-button'] = true; 
						 break;
				
				case 6 : whichButton['mid-button'] = true;
						 whichButton['right-button'] = true; 
						 break;
						 
				case 7 :  whichButton['left-button'] = true;
				  		  whichButton['mid-button'] = true;
				 		  whichButton['right-button'] = true; 
				 		  break;
				
				default : break;
			}
		} else {
			return false;
		};
		return whichButton;
	};
	window["Lemontree"]["getMouseButton"] = getMouseButton;
	
	//获取鼠标在相对于文档原点的位置 tested
	function getMousePosition(e) {
		e = e || getEvent(e);
		
		//safari:pageX                    W3C                                    IE
		var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
		var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
		
		return {"x" : x , "y" : y};
	};
	window["Lemontree"]["getMousePosition"] = getMousePosition;
	
	//tested
	function getKeyPress(e) {
		e = e || getEvent(e);
		
		var code  = e.keyCode;
		var value = String.fromCharCode(code);
		return {'code':code,'value':value};
	};
	window["Lemontree"]["getKeyPress"] = getKeyPress;
	
	//通过id修改单个元素样式
	function setStyleById(element, styles) {
		
		//取得对象的引用
		if (!(element = $(element))) {
			return false;
		};
		
		//循环遍历styles对象每个属性
		for (prop in styles) {
			
			if (!styles.hasOwnProperty(prop)) {continue};
			
			if (element.style.setProperty) {
				element.style.setProperty(prop, styles[prop], null);
			} else {
				element.style[camelize(prop)] = styles[prop];
			}
		};
	};
	window["Lemontree"]["setStyleById"] = setStyleById;
	
	//通过类名修改多个元素样式
	function setStyleByClassName(parent, tag, className, styles) {
		
		if (!(parent = $(parent))) {
			return false;
		};
		var elements = getElementByClassName(className, tag, parent);
		for (var i = 0; i < elements.length; i++) {
			setStyleById(elements[i], styles);
		};
		return true;
	};
	window["Lemontree"]["setStyleByClassName"] = setStyleByClassName;
	
	//通过标签名修改多个元素的样式
	function setStyleByTagName(tagName, styles, parent) {
		parent = $(parent) || document;
		var elements = parent.getElementsByTagName(tagName);
		for (var i = 0; i < elements.length; i++) {
			setStyleById(elements[i], styles);
		};
		return true;
	};
	window["Lemontree"]["setStyleByTagName"] = setStyleByTagName;
	
	//获取元素class名 tested
	function getClassNames(element) {
		
		if (!(element = $(element))) {
			return false;
		};
		return element.className.replace(/\s+/," ").split(" ");
	};
	window["Lemontree"]["getClassNames"] = getClassNames;
	
	function hasClassName(element, className) {
		
		if (!(element = $(element))) {
			return false;
		};
		var classes = getClassNames(element);
		for (var i = 0; i < classes.length; i++) {
			
			if (className === classes[i]) {
				return true;
			};
		};
		return false;
	};
	window["Lemontree"]["hasClassName"] = hasClassName;
	
	function addClassName(element, className) {
		
		if (!(element = $(element))) {
			return false;
		};
		element.className += (element.className ? " " : " ") + className;
		return true;
	};
	window["Lemontree"]["addClassName"] = addClassName;
	
	function removeClassName(element, className) {
		
		if (!(element = $(element))) {
			return false;
		};
		var classes = getClassNames(element, className);
		var length = classes.length;
		for (var i = classes.length - 1; i > 0; i--) {
			
			if (className === classes[i]) {
				delete classes[i];
			};
			element.className = classes.join(" ");
			return (length == classes.length ? false : true);
		};
	};
	window["Lemontree"]["removeClassName"] = removeClassName;
	
	//增加和移除link
	function addStyleSheet(url, media) {
		media = media || "screen";
		var link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");
		link.setAttribute("href", url);
		link.setAttribute("media", media);
		document.getElementsByTagName("head")[0].appendChild(link);
	};
	window["Lemontree"]["addStyleSheet"] = addStyleSheet;
	
	function removeStyleSheet(url, media) {
		var styles = getStyleSheet(url, media);
		for (var i = 0; i < styles.length; i ++) {
			var node = styles[i].ownerNode || styles[i].owningElement;
			styles[i].disabled = true;
			node.parentNode.removeChild(node);
		};
	};
	window["Lemontree"]["removeStyleSheet"] = removeStyleSheet;
	
	//tested
	function getComputedStyle(element, prop){
		
		if (!(element = $(element)) || !prop) {return false;}
		var value = element.style[camelize(prop)]; //检测style属性中的值
		
		if (!value) {
			
			//获取计算样式
			if (document.defaultView && document.defaultView.getComputedStyle) {
				
				//DOM方法
				var css = document.defaultView.getComputedStyle(element, null);
				value = css ? css.getPropertyValue(prop) : null;
			} else if (element.currentStyle) {
				
				//IE
				value = element.currentStyle[camelize(prop)];
			}
		};
		return (value == "auto") ? "" : value;
	};
	window["Lemontree"]["getComputedStyle"] = getComputedStyle;
	
	//获取特定范围内的随机数 tested
	function selectFrom(lowerVal, upperVal) {
		var choices = upperVal - lowerVal + 1;
		return Math.floor(Math.random() * choices + lowerVal);
	};
	window['Lemontree']['selectFrom'] = selectFrom;
	
	//继承的最优方法 tested
	function inherit(sub, sup) {
		var prototype = Object(sup.prototype);
		prototype.constructor = sub;
		sub.prototype = prototype;
	};
	window['Lemontree']['inherit'] = inherit;
	
	//IE8下的trim tested
	function trim(s) {
		return s.replace(/(^\s*)|(\s*$)/g, "");
	};
	window['Lemontree']['trim'] = trim;
	var a = '22';
})();
