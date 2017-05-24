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
	
	function getElementByClassName(className, tag, parent) {
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
	window["Lemontree"]["getElementByClassName"] = getElementByClassName;
	
	function toggleDisplay(node, value) {
		
		if (!(node = $(node))) {
			return false;
		};
		
		if (node.style.display != "none") {
			node.style.display = "none";
		} else {
			node.style.display = value || "";
		};
		return true;
	};
	window["Lemontree"]["toggleDisplay"] = toggleDisplay;
	
	function insertAfter(node, referenceNode) {
		
		if (!(node = $(node))) {
			return false;
		};
		
		if (!(referenceNode = $(referenceNode))) {
			return false;
		};
		return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
		
		//当referenceNode是最后一个子节点的情况下
		//referenceNode.nextSibling是null， 不能实现
	};
	window["Lemontree"]["insertAfter"] = insertAfter;
	
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
			
			//没有子节点
			parent.appendChild(newChild);
		};
		
		//返回父元素，方便以.连缀处理
		return parent;
		
		//也可以操作并没有添加进文档中的元素
	};
	window["Lemontree"]["prependChild"] = prependChild;
	
})();
