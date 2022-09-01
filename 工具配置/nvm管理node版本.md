### 一、卸载node

找到node目录，删除即可

系统属性->环境变量->系统环境变量中的path->node的路径



### 二、多版本并行nvm管理

1、首先卸载node(可直接去对应的node地址，把node包删除)
 2、[下载nvm](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fcoreybutler%2Fnvm-windows%2Freleases)

- **nvm-noinstall.zip**：绿色免安装版本，但是使用之前需要配置
- **nvm-setup.zip**：下载之后点击安装，无需配置就可以使用，方便(推荐)。
- **Source code(zip)**：zip压缩的源码
- **Sourc code(tar.gz)**：tar.gz的源码，一般用于*nix系统

3、解压*nvm-setup.zip后傻瓜式安装即可，然后通过nvm -v查看是否安装成功。
 4、如果是私有源，npm config set registry 私有源地址
 5、安装指定版本的node
 nvm install <node的版本>   // 例如nvm install 16.13.0  最好不要安装结尾为单数的版本例如：16.13.1
 5、使用具体版本的node
 nvm use <node版本>
 如果出现错误，使用管理员权限打开控制台，重试即可。



### 三、nvm的常用语法

```csharp
  nvm install stable   //安装最新稳定版 node

  nvm install <version> // 安装指定版本，可模糊安装，如：安装v4.0.0，可nvm install v4.0.0 或者 nvm install 4.4

  nvm uninstall <version>//删除已安装的指定版本，语法与install类似

  nvm use <version>      //切换使用指定的版本node

  nvm ls                         //列出所有安装的版本

  nvm ls-remote            // 列出所有远程服务器的版本（官方node version list）

  nvm current               //显示当前的版本

  nvm alias <name> <version> //给不同的版本号添加别名

  nvm unalias <name>     //删除已定义的别名

  nvm reinstall-packages <version>   //在当前版本 node 环境下，重新全局安装指定版本号的 npm 包
```

### 四、nrm 切换npm源

```rust
1、安装：
npm install -g nrm
2、查看当前使用的源:
npm ls
3、切换源
nrm use （源）  // nrm use taobao
4、添加源
nrm add (名称) （源地址）
5、测试源的延迟
nrm test npm
```