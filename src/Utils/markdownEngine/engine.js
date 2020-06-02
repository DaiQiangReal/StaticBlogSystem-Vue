

let test="/*任意\n数量*/45455"
function getBlogMessage(content){
    let reg=/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g
    console.log(reg.exec(content))
}
getBlogMessage(test)
class engine{
    constructor(content) {
        this.content=content;
    }


}


// export default engine;