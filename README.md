# Next.js学习笔记
**创建Layout组件的三种方法**

1. ```javascript
   const Layout = props => (
     <div style={layoutStyle}>
       <Header />
       {props.children}
     </div>
   );
   
   const Index = () => (
     <Layout>
       <p>Hello Next.js</p>
     </Layout>
   );
   ```

2. ```javascript
   const withLayout = Page => {
     return () => (
       <div style={layoutStyle}>
         <Header />
         <Page />
       </div>
     );
   };
   
   const Page = () => <p>Hello Next.js</p>;
   
   export default withLayout(Page);
   ```

3. ```javascript
   const Layout = props => (
     <div style={layoutStyle}>
       <Header />
       {props.content}
     </div>
   );
   
   const indexPageContent = <p>Hello Next.js</p>;
   
   export default function Index() {
     return <Layout content={indexPageContent} />;
   }
   ```

   

### 路由

next框架封装了router和redux，可以直接使用

```js
import { useRouter } from 'next/router';
import Link from 'next/link';
<Link href="/p/[id]" as={`/p/${props.id}`}>
  <a>{props.id}</a>
</Link>
```

Link组件href属性渲染文件的路径，as属性表示地址栏显示的URL。

**动态路由**

`pages/p/[id].js`，[]内是参数，在`[id].js`文件中通过`router.query.id`读取



### 请求数据

`getInitialProps`中请求数据，成功后可在`props`中使用

```javascript
Index.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};
```

注：请求过程在服务端完成，所以浏览器不会有控制台输出和网络请求。当使用`Link`组件时，跳转在客户端完成，控制台输出和网络请求发生在浏览器中。



### 样式

**Next.js推荐Css in Js**

注意作用域，父组件样式不影响子组件

```javascript
<style jsx global>
<style jsx>{`
    h1,
    a {
      font-family: 'Arial';
    }

    ul {
      padding: 0;
    }

    li {
      list-style: none;
      margin: 5px 0;
    }

    a {
      text-decoration: none;
      color: blue;
    }

    a:hover {
      opacity: 0.6;
    }
`}</style>
```

