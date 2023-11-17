# 直猎BOSS拉钩无忧智联战舰
一个浏览器拓展(仅Edge)，用于将多个招聘网站的招聘信息聚合到一个页面中，方便求职者海投。

# 开发
使用纯html、css、JavaScript和浏览器拓展方法开发。

# 加载拓展
1. 下载项目
2. 在Edge中打开管理拓展选项
3. 打开开发人员模式
4. 刷新，然后点击加载解压缩的拓展
5. 选择项目目录

注意：由于部分网站将详细的招聘信息URL隐藏在代码中，无法通过浏览器允许的正常方式获取，因此在获取部分网站的招聘详细信息时，拓展页面会呈现刷新的效果。之所以会这样，是因为点击会打开一个新的活动标签，而非新的不活动标签，为了保证点击后能留在拓展页面，拓展会在标签页的活动状态改变时强制留在拓展页面。这不会影响你手动切换页面，但是，如果使用alt+tab切换到一个招聘网站的页面(除了点击登陆打开的标签页以外)，就会立即返回拓展页面。

# 截图
![image](https://github.com/unyzhq/Strategic-Mass-Application-Partner/blob/master/%E6%88%AA%E5%9B%BE/Snipaste_2023-11-17_21-55-06.png)

![image](https://github.com/unyzhq/Strategic-Mass-Application-Partner/blob/master/%E6%88%AA%E5%9B%BE/Snipaste_2023-11-17_21-56-02.png)

![image](https://github.com/unyzhq/Strategic-Mass-Application-Partner/blob/master/%E6%88%AA%E5%9B%BE/Snipaste_2023-11-17_21-56-18.png)
