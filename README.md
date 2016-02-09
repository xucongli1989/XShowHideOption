# 简介
XShowHideOption是一个用于操作select的option隐藏或显示的插件，您可以指定相应的option进行显示或隐藏，而不必对其移除操作。
# 依赖
不依赖其它任何插件，且适用于IE6+、Firefox、Chrome等浏览器
# 原理
- IE：当隐藏指定的option时，先将其使用临时的select包裹起来，然后对该临时的select进行隐藏即可。显示时，按原option显示。
- 非IE：直接对option进行显示或隐藏即可

# 属性及方法
属性：

<table>
<tr>
<td>属性名</td>
<td>类型</td>
<td>默认值</td>
<td>说明</td>
</tr>
<tr>
<td>target</td>
<td>string或object</td>
<td>无</td>
<td>要操作的对象，一般为select的id或select的js对象</td>
</tr>
<tr>
<td>attr</td>
<td>string</td>
<td>"XShowHideOption-isShow"</td>
<td>显示或隐藏时自定义的option属性名，若该属性值为true，则代表该option需要显示；否则，则需要隐藏。</td>
</tr>
</table>

方法：
<table>
<tr>
<td>方法名</td>
<td>说明</td>
</tr>
<tr>
<td>init()</td>
<td>根据每一个option的attr属性的状态来初始化显示或隐藏该option</td>
</tr>
<tr>
<td>setOption(values, isShow)</td>
<td>
根据指定值来设置option是否显示或隐藏。
<br/>
values:要显示或隐藏的值数组（如果为字符串，则会自动以逗号分隔转为数组）
<br/>
isShow:是否显示
</td>
</tr>
</table>

事件：
<table>
<tr>
<td>事件名</td>
<td>说明</td>
</tr>
<tr>
<td>beforeSetOption</td>
<td>设置指定value显示或隐藏option前的回调函数，如果返回false，则不执行显示或隐藏option操作</td>
</tr>
<tr>
<td>afterSetOption</td>
<td>设置指定value显示或隐藏option后的回调函数</td>
</tr>
</table>

# 使用（具体请参见demo.html）

            <script type="text/javascript">
                var sel1=new XShowHideOption("sel1");
                sel1.beforeSetOption=function(){
                    alert("准备设置option！");
                };
                sel1.afterSetOption=function(){
                    alert("option已设置完毕！");
                };
            </script>



# 在线预览

[http://htmlpreview.github.io/?https://raw.githubusercontent.com/xucongli1989/XShowHideOption/master/XShowHideOption/demo.html](http://htmlpreview.github.io/?https://raw.githubusercontent.com/xucongli1989/XShowHideOption/master/XShowHideOption/demo.html)

注：在线预览可能不准确，请参见demo.html

![](https://raw.githubusercontent.com/xucongli1989/XShowHideOption/master/XShowHideOption/Imgs/1.jpg)