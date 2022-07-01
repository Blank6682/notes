## 【ZSH】windows中使用zsh美化vscode终端

### 一、安装git bash for windows SDK：

下载地址：[gitforwindows](https://links.jianshu.com/go?to=https%3A%2F%2Fgitforwindows.org%2F)

跳转后在页面底部下载，下载完成之后，默认选择路径安装，

安装之后启动git bash,右键命令行，设置语言：zh-CN，文本：可以更改字体和字符集UTF-8,

### 二、安装zsh和oh-my-zsh：

git bash的包管理器为`pacman`，用`pacman`可以安装各类linux的工具。

1. 安装zsh：`pacman -S zsh`
    安装过程一路`y`就可以了

2. 安装oh-my-zsh（参考：[ohmyzsh](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fohmyzsh%2Fohmyzsh)）：
    安装命令：`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`

   

如果提示：`Could not resolve host: raw.githubusercontent.com`，则需要配置一下host。点击跳转至：[https://www.ipaddress.com/](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.ipaddress.com%2F)  查找域名ip

配置hosts文件，该文件在：C:\Windows\System32\drivers\etc下

在末尾添加对应ip地址：xxx.xxx.xxx.xxx  raw.githubusercontent.com

再次执行安装命令即可

### 三、集成至vscode：

1.打开vscode的设置的setting.json,添加配置



```json
  "terminal.integrated.profiles.windows": {
    "GitBash": {
      "path": "C://git-sdk-64//msys2_shell.cmd",
      "args": [
        "-defterm",
        "-mingw64",
        "-no-start",
        "-here",
        "-lic",
        "cd $PWD; exec zsh"
      ]
    }
  },
  
```

`path`属性中配置git bash for windows安装目录下的msys2_shell.cmd路径，注意路径分隔符为`//`因为要转义。
 `args`前四个参数是让msys2_shell.cmd集成到终端中，后两个参数是打开终端后自动进入zsh。

将该配置项作为默认终端：

```json
"terminal.integrated.defaultProfile.windows": "GitBash",
```

配置终端字体，其他字体可自行下载字体安装配置[字体](https://www.nerdfonts.com/font-downloads)，monospac是等宽字体，

```json
"terminal.integrated.fontFamily": "Fira Code,monospace"  
```



### 五、修改zsh主题：

属主目录（C:/Users/用户名）下找到`.zshrc`文件后编辑该文件

将`ZSH_THEME`选项配置为 `agnoster`，后保存。

推荐主题有：agnoster cloud  edvardm fletcherm fwalch gozilla superjarin wezm

[主题演示地址](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)

在 `workbench.colorCustomizations` 内即可调整终端的配色,[全部支持配色的内容](https://link.zhihu.com/?target=https%3A//code.visualstudio.com/api/references/theme-color%23integrated-terminal-colors)

```json
“workbench.colorCustomizations”：{
	//如控制虚拟环境文件夹颜色
	“terminal.ansiBrightGreen”:"#c1c1c1"
}
```



### 六、添加zsh插件

1. **autosuggestion**：输入命令时可提示自动补全（灰色部分），然后按键盘 → 即可补全。

2. **syntax-highlighting**：日常用的命令会高亮显示，命令错误显示红色。

   安装命令：

   ```js
   git clone git@github.com:zsh-users/zsh-autosuggestions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
   
   git clone git@github.com:zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
   
   ```

   在`.zshrc`文件，修改配置plugin

   ```
   plugins=(
   	git
      # 记录历史输入的zsh命令，自动提示，快速使用
     zsh-autosuggestions
       # zsh 命令纠错高亮
     zsh-syntax-highlighting
     )
   ```

   

### 七、配置命令快捷键

Oh My Zsh自带, 把所有的git命令做了别名, 更快使用git命令.[全部别名地址](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git)

```
# 终端内
# gb 等于 git branch
# st 等价git status
# gcmsg 等于 git commit -m
# gm 等于git merge
# gco 等于git checkout
```

自行配置可在`.zshrc`文件，末尾添加

```json
#每次修改了这个.zshrc配置文件，需要重载一下，才能生效。
alias rl='source ~/.zshrc'
alias zshconfig='code ~/.zshrc'

alias cls='clear'

#npm

alias ni='npm install'
alias nui='npm uninstall'
alias nd='npm run dev'
alias nb='npm run build'


#git
alias g='git'
alias gc='git clone'
alias gst='git status'
alias ga='git add'
alias gaa='git add -all'
alias gp='git push'
alias gl='git pull'
alias gcmsg='git commit -m'

# 分支相关
alias gb='git branch'
alias gbr='git branch -r'
alias gba='git branch -a'

# checkout
alias gco='git checkout'
alias gcb='git checkout -b'
# merge
alias gm='git merge'
# diff
alias gd='git diff'
alias gdw='git diff --word-diff'

# 回退到上一级
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'
alias ......='cd ../../../../..'

```



## 【Git Bash】只使用Git Bash美化vscode终端

修改vscode配置setting.josn

```json
  "terminal.integrated.profiles.windows": {
    "GitBash": {
        //path为Git的安装目录
      "path": "D://Git//bin//bash.exe"
    },
    }
```

打开git bash,依次键入命令行，修改配置文件

```
cd ~
touch .bash.profile
code .bash_profile
```

配置快捷命令

```
#每次修改了这个配置文件，需要重载一下，才能生效。
alias rl='source ~/.bash_profile'
alias zshconfig='code ~/.bash_profile'

alias cls='clear'

#npm

alias ni='npm install'
alias nui='npm uninstall'
alias nd='npm run dev'
alias nb='npm run build'

#yarn 

alias y='yarn'
alias ya='yarn add'
alias yrm='yarn remove'
alias yl='yarn list'
alias yv='yarn -v'

#git
alias g='git'
alias gc='git clone'
alias gst='git status'
alias ga='git add'
alias gaa='git add -all'
alias gp='git push'
alias gl='git pull'
alias gcmsg='git commit -m'

# 分支相关
alias gb='git branch'
alias gbr='git branch -r'
alias gba='git branch -a'

# checkout
alias gco='git checkout'
alias gcb='git checkout -b'
# merge
alias gm='git merge'
# diff
alias gd='git diff'
alias gdw='git diff --word-diff'

# 回退到上一级
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'
alias ......='cd ../../../../..'
```

保存后执行

```
source ~/.bash_profile
```

