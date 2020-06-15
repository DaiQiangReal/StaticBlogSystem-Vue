/*
title: 自定义栈结构，并提供常见栈方法和时间复杂度为O(1)的查找min的方法
keyword: 栈， Java, 自定义栈, 时间复杂度
date:2018-08-28
*/

## 介绍
当系统提供的数据结构不能满足实际开发需要的时候，我们通常会自己定义新的结构。下面自定义一个新的栈结构，并提供常见栈方法和时间复杂度为 O(1) 的查找栈内元素最小值的方法。

## 实现代码
```java

import java.util.ArrayList;
import java.util.Stack;

public class Solution {
    ArrayList<Integer> data=new ArrayList<Integer>();//通过ArratList 模拟栈存放数据
    Stack<Integer> calmin=new Stack<Integer>();//这里调用JavaSDK内的栈结构，用于储存最小值

    public void push(int node) {
        data.add(node);//添加元素方法
        if(calmin.empty()){//如果用于模拟栈的ArrayList为空
            calmin.push(node);//将新添加的值放入ArrayList中，并压入存放最小值的栈
            return;
        }
        if(node<=calmin.peek())//如果新的要求压栈的值比存放最小值的栈顶元素还要小
            calmin.push(node);//则压栈的同时将此元素压入存放最小值的栈
    }
    
    public void pop() {//出栈方法
        if(data.get(data.size()-1)==calmin.peek())//如果出栈的元素刚好是储存最小值的栈的栈顶元素，那么两个栈都出栈
            calmin.pop();
        data.remove(data.size()-1);
    }
    
    public int top() {//获取栈顶元素
        return data.get(data.size()-1);
    }
    
    public int min() {
        return calmin.peek();//最小值即为储存最小值的栈的栈顶元素
    }
}

```