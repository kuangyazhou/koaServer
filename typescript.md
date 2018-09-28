typescript是由微软开发的一个javascript超集，本质是向javascript这门弱类型动态语言添加了静态类型和面向对象。作者是安德斯-海尔斯伯格，C#之父。
从发布至今，typescript一直倍受关注，star数直线上升，并且被越来越多的个人和组织认可，首先是默认使用ts的angular系列框架，vue在2.2开始支持ts，2.5版本以后全面支持，包括vux,vue-router，在vue-cli3.0脚手架当中，ts被加入到默认选项当中。react后续也开始支持ts，包括增加jsx式的模板引擎tsx。后续更多的开源库也开始支持，包括element-ui、iView、AntD

好处
- 提高代码质量，降低bug率，隐式类型转换带来大量不可预知的类型错误
- 静态类型检测，减少编译阶段引起的错误
- 模块化，es6已支持
- 让代码更加清晰易读
- 语法糖 ()=>，接口，枚举，泛型，方法重载
         
对比babel 
- babel只解决浏览器支持问题
 

 ### 1. 类型检测

    ```
    function sayHello(person: string) {
        return 'Hello, ' + person;
    }
    let user = 'Tom';
    console.log(sayHello(user));


    ```
    使用:string指定变量的类型，限制为string,当传入[1,2,3]时，会编译报错
    
    检测数组类型

    ```
    let fib:number[]=[1,2,3];
    fib.push('test')时会报错
    泛型数组
    let fib:Array<number>=[1,2,3,4]
    ```
    
    可使用any，或在定义变量时未指定变量类型，也会被识别为any；
    
###  2. 类型推论

    ```
    let myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
    ```
    初次赋值时会推断类型
    ```
    function add(a:number,b:number){
    return a+b}
    ```
    此时函数的返回类型会自动推断为number
   

###  3. 接口
    对类的一部分进行行为抽象，或者对其形状进行描述
    ```
    interface Person{
        name:string;
        age:number;
    }
    
    const tom:Person={
        name:'Tom',
        age:25
    }
    ```
    定义了一个接口Person对tom进行约束，增加或者缺少属性均不行
    可选属性使用?
    只读属性，使用readonly修饰
    
    接口约束函数
    ```
    interface Isearch{
        (source:string,subString):boolean;
    }
    let search:Isearch;
    search=function(source:string,subString:string){
    return source.search(subString)!=-1
    } 
    ```
    抽象类

###  4. 函数
    可选参数
    参数默认值
    剩余参数
    es6已全部覆盖
   

###  5. 枚举
    Enum  用于将取值限定在一定的范围内
    ```
    enum Days {Sum,Mon,Tue,Wed,Thu,Fri,Sat}
    ```
    
 

###  6. 类
    继承、存取器 
    静态方法 使用static修饰，不需要实例化，通过类直接使用
    
    增加了public private protected
    public，公有的，任何地方都可以访问
    private，私有的，不能在声明类的外部访问
    protected，受保护的，可以在子类中访问
    
   

### 7. 泛型
    
    在定义函数、接口或类的时候，不预先指定具体的类型，使用的时候  
    再指定类型
    ```
    function createArray(length: number, value: any):                 Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
    ```
    
    ```
    function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
    ```
    自动推断value的类型