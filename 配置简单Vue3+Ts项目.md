

### 技术栈：vue3+ts+vite+unocss

### 创建项目

```
npm init vue@3
```

根据需求选择即可选择即可

```
cd /dome-name/
git init
npm i 
```

配置Vue

```ts
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,//开启$ref
    })]
})
```



### 配置自动导入

- 自动导入配置

```
yarn add -D unplugin-vue-components unplugin-auto-import 
```

```typescript
//vite.confing.ts
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'


export default defineConfig({
  plugins: [
		...
    Components(),
    AutoImport({
      imports: ['vue','vue/macros','@vueuse/core'],//使用vueuse则加上
      dirs: ['./src/utils'],
      vueTemplate: true,
    }),
  ],
})
```

### 配置unocss

```
yarn add -D unocss
```

```typescript
//vite.confing.ts
import UnoCss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  plugins: [
		...
    UnoCss({
      presets: [
        presetUno(),
        //预设属性Css
        presetAttributify(),
        //iconify
        presetIcons(),
      ],
    }),
  ],
})
```

```ts
//main.ts
import 'uno.css'
```

### 配置iconify

在[iconnes]( https://icones.js.org/)上面找到你需要的icon集合,

```
// @iconify-json/[the-collection-you-want]  
//ex: @iconify-json/carbon
npm i -D @iconify-json/carbon
npm i  @unocss/reset
```

```typescript
//main.js
import '@unocss/reset/tailwind.css'
```

```html
<!-- use -->
<!-- i-[icon-name] -->
<span i-carbon:bat><span>
```

### 

### 配置Eslint

```
//这里使用的是antfu的eslint配置
yarn add -D eslint @antfu/eslint-config
```

```json
//添加文件 .eslintrc
{
  "extends": "@antfu"
}
```

### 问题

找不到App.vue模块的解决方法

在src文件下新增文件`env.d.ts`

```ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

### git提交问题

#### `remote: Repository not found.`

解决：在 gitbash 中输入

```

 git remote set-url origin git@github.com:[账号]/[仓库名].git
```

