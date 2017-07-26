/**
 * 热门文章
 * Created by LiYun on 2016/8/15.
 */
function HotArticle(parent) {
    var self=this;
    //"home/index/getUserInfo?userId=888"--->res
    $.get("json/hotArticle.json",function(res){
        var datas=eval(res);//对象数组
        self.init(parent,"热门文章",datas);
    });

}
HotArticle.prototype = {
    constructor: HotArticle,
    //页面初始化
    /**
     *
     * @param parent 字符串、dom元素、dom数组、jquery对象——> 文章的父元素
     * @param title 大标题
     * @param datas 详细的数据
     */
    init: function (parent,title, datas) {
        if(!parent) $.error("请提供热门文章的父容器");

        parent=$(parent);//将父容器转换为jquery类型的对象
        //设置热门文章的容器
        var $hotArticle = $("<div class='hotArticle-container'>" +
            "<div class='hotArticle-title'></div>" +
            "<div class='hotArticle-data'></div>" +
            "</div>");
        //插入标题
        $hotArticle.find(".hotArticle-title").append("<h3>"+title+"</h3>");
        //插入数据
        var dataContainer="<ul>";
        $.each(datas,function(){
            var data=this;//每一个对象 { title:"",link:"" }
            dataContainer+="<li><a target='_blank' href='"+data.link+"'>"+data.title+"</a></li>"
        });

        // for (var i = 0; i < datas.length; i++) {
        //     var data = datas[i];
        //     dataContainer+="<li><a target='_blank' href='"+data.link+"'>"+data.title+"</a></li>"
        // }
        dataContainer+="</ul>";
        //将数据的html模板插入到指定区域
        $hotArticle.find(".hotArticle-data").append(dataContainer);
        $hotArticle.appendTo(parent);
    }
};