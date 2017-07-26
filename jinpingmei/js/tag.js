/**
 * 热门标签
 * Created by LiYun on 2016/8/12.
*/
function Tag(parent) {
    var self = this;
    $.get("json/tags.json", function (res) {
        self.init(parent, eval(res));
    });

}
Tag.prototype = {
    constructor: Tag,
    //初始化
    init: function (parent, datas) {
        if (!parent) $.error("请提供热门标签的父容器");
        //热门标签的页面容器
        var $tagsContainer = $("<div class='tags-container'>" +
            "<div class='tag-title'>热门标签</div>" +
            "<div class='tag-data'></div>" +
            "</div>");
        //渲染数据
        $.each(datas, function (i, data) {
            $tagsContainer.find(".tag-data").append("<div class='tag'><a href='" + data.link + "'>" + data.title + "</a></div>");
        });
        //设置容器
        this.container = $tagsContainer.appendTo(parent);
        //绑定事件
        this.bindEvents();

    },
    //绑定事件
    bindEvents: function () {
        this.container.on("mouseenter", ".tag", function () {
            $(this).css("border", "1px solid #F8BD2D");
        }).on("mouseleave", ".tag", function () {
            $(this).css("border", "1px solid #DADADA");
        });
    }
};