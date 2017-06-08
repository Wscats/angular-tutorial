<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

# 节点关系型API

在html文档中的每个节点之间的关系都可以看成是家谱关系，包含父子关系，兄弟关系等等，下面我们依次来看看每一种关系。

## 父关系型API
|方法|用途|
|-|-|
|parentNode|每个节点都有一个parentNode属性，它表示元素的父节点。Element的父节点可能是Element，Document或DocumentFragment。|
|parentElement|返回元素的父元素节点，与parentNode的区别在于，其父节点必须是一个Element，如果不是，则返回null|

## 兄弟关系型API
|方法|用途|
|-|-|
|previousSibling|节点的前一个节点，如果该节点是第一个节点，则为null。注意有可能拿到的节点是文本节点或注释节点，与预期的不符，要进行处理一下。|
|previousElementSibling|返回前一个元素节点，前一个节点必须是Element，注意IE9以下浏览器不支持。|
|nextSibling|节点的后一个节点，如果该节点是最后一个节点，则为null。注意有可能拿到的节点是文本节点，与预期的不符，要进行处理一下。|
|nextElementSibling|返回后一个元素节点，后一个节点必须是Element，注意IE9以下浏览器不支持。|

## 子关系型api
|方法|用途|
|-|-|
|childNodes|返回一个即时的NodeList，表示元素的子节点列表，子节点可能会包含文本节点，注释节点等。|
|children|一个即时的HTMLCollection，子节点都是Element，IE9以下浏览器不支持。|
|firstNode|第一个子节点|
|lastNode|最后一个子节点|
|hasChildNodes方法|可以用来判断是否包含子节点。|
