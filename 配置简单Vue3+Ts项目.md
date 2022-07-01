

### 技术栈：vue3+ts+vite+unocss

### 创建项目

```
npm init vue@3
```

根据需求选择即可选择即可

```
cd world-time
git init
yarn 
```

### 配置Vite

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
      imports: ['vue'],
    }),
  ],
})
```

- 配置unocss

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

- 配置iconify， 在[iconnes]( https://icones.js.org/)上面找到你需要的icon集合,

```
// @iconify-json/[the-collection-you-want]  
//ex: @iconify-json/carbon
yarn add -D @iconify-json/carbon
yarn add @unocss/reset
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

- 配置Eslint

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

